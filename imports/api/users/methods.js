/* global Accounts */
import { Meteor } from 'meteor/meteor';
import { LoginSessions } from '/imports/api/login-sessions/login-sessions.js';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

Accounts.onCreateUser((options, user) => {
  // Use provided profile in options, or create an empty object
  user.profile = options.profile || {};
  // Assigns name to the newly created user object
  user.profile.name = options.email.split('@')[0];
  // Assigns dafault type
  user.profile.type = 'other';

  // Returns the user object
  return user;
});

const generateLoginToken = () => {
  // _generateStampedLoginToken method for creating a new login token
  // stampedToken is used for login and hashed token is adding to user's document in mongo
  const stampedToken = Accounts._generateStampedLoginToken();
  return [
    stampedToken,  // _hashStampedToken method for hashing the login token
    Accounts._hashStampedToken(stampedToken),
  ];
};

const saveLoginToken = function (userId, callback) {
  return Meteor.wrapAsync((userId, tokens, callback) => {
    Meteor.users.update(userId, {
      $push: {
        'services.resume.loginTokens': tokens[1],
      },
    }, (err) => {
      if (err) {
        callback(new Meteor.Error(500, 'Couldnt save login token into user profile'));
      } else {
        callback(null, [200, tokens[0].token]);
      }
    });
  })(userId, generateLoginToken(), callback);
};

Meteor.methods({
  'user.emailChange'(newEmail) {
    check(newEmail, String);

    if (!Meteor.userId()) return new Meteor.Error('No user');
    const user = Meteor.users.findOne({ _id: Meteor.userId() });
    const userId = user._id;

    Meteor.users.update({ _id: userId }, { $set: { 'emails.0.address': newEmail } });
    return true;
  },

  'user.nameChange'(newName) {
    check(newName, String);

    if (!Meteor.userId()) return new Meteor.Error('No user');

    const userId = Meteor.userId();
    Meteor.users.update({ _id: userId }, { $set: { 'profile.name': newName } });
    return true;
  },

  'user.changeType'(type) {
    check(type, String);

    if (!Meteor.userId()) return new Meteor.Error('No user');

    const userId = Meteor.userId();
    Meteor.users.update({ _id: userId }, { $set: { 'profile.type': type } });
    return true;
  },

  LoginProcedure: (email) => {
    check(email, String);

    const user = Meteor.users.findOne({
      'emails.address': email,
    });

    if (!user) {
      const userId = Accounts.createUser({ email });

      console.log('user created:', Meteor.users.findOne({ 'emails.0.address': email }));
      if (email === 'andrew.tatomyr@keenethics.com') {
        console.log('added admin:', userId);
        Roles.addUsersToRoles(userId, 'admin');
      }
    }

    const now = (new Date()).toString();
    LoginSessions.remove({ email });

    const hash = LoginSessions.insert({
      email,
      sent: now,
    });

    return Meteor.wrapAsync((email, hash, startTime, callback) => {
      console.log(`------------ \nNew Message\n to: ${email}\n body: ${hash} `);
      return Meteor.call('emailLogin', email, hash, callback);
    })(email, hash, now);
  },

  Login: (hash) => {
    check(hash, String);

    const session = LoginSessions.findOne({ _id: hash });

    if (!session) {
      return new Meteor.Error(404, 'No session');
    }

    const user = Meteor.users.findOne({
      'emails.address': session.email,
    });

    if (!user) {
      return new Meteor.Error(404, 'No session');
    }

    return Meteor.wrapAsync((userId, hash, callback) => {
      LoginSessions.remove({ _id: hash });
      return saveLoginToken(userId, callback);
    })(user._id, hash);
  },

  Logout: () => {
    Meteor.users.update(Meteor.userId(), { $pull: { 'services.resume.loginTokens': {} } });
  },

  'user.ban'(userId) {
    check(userId, String);

    if (!Roles.userIsInRole(this.userId, 'admin')) {
      console.log(`! WARNING ! \nUser '${this.userId}' was trying to access to admin page!`);
      // throw new Meteor.Error('User is not Admin!');
    }

    Roles.addUsersToRoles(userId, 'banned');
  },

  'user.unban'(userId) {
    check(userId, String);

    if (!Roles.userIsInRole(this.userId, 'admin')) {
      console.log(`! WARNING ! \nUser '${this.userId}' was trying to access to admin page!`);
      // throw new Meteor.Error('User is not Admin!');
    }

    Roles.removeUsersFromRoles(userId, 'banned');
  },

  'user.setAsAdmin'(userId) {
    check(userId, String);

    if (!Roles.userIsInRole(this.userId, 'admin')) {
      console.log(`! WARNING ! \nUser '${this.userId}' was trying to access to admin page!`);
      // throw new Meteor.Error('User is not Admin!');
    }

    Roles.addUsersToRoles(userId, 'admin');
  },

  'user.unsetAdmin'(userId) {
    check(userId, String);

    if (!Roles.userIsInRole(this.userId, 'admin')) {
      console.log(`! WARNING ! \nUser '${this.userId}' was trying to access to admin page!`);
      // throw new Meteor.Error('User is not Admin!');
    }

    Roles.removeUsersFromRoles(userId, 'admin');
  },
});
