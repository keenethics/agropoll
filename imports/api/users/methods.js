import { Meteor } from 'meteor/meteor';
import { LoginSessions } from '/imports/api/login-sessions/login-sessions.js'

var generateLoginToken = () => {
  var stampedToken = Accounts._generateStampedLoginToken();
  return [
    stampedToken,
    Accounts._hashStampedToken(stampedToken)
  ];
};

var saveLoginToken = (userId, callback) => {
  return Meteor.wrapAsync( (userId, tokens, callback) => {
    Meteor.users.update(userId, { $pull:{ 'services.resume.loginTokens': {} } } );
    Meteor.users.update(userId, {
      $push: {
        'services.resume.loginTokens': tokens[1]
      }
    }, (err) => {
      if (err) {
        callback(new Meteor.Error(500, 'Couldnt save login token into user profile'));
      } else {
        callback(null, [200, tokens[0].token]);
      }
    });
  })(userId, generateLoginToken(), callback);
}

Meteor.methods({
  'user.emailChange'( newEmail ) {
    if(!Meteor.userId())
      return new Meteor.Error ('No user');

    const userId = Meteor.userId();

    Meteor.users.update({_id:userId}, {$set: { 'emails.0.address': newEmail } });
    return true;
  },
  'user.nameChange'(newName) {
    if(!Meteor.userId())
      return new Meteor.Error ('No user');

    const userId = Meteor.userId();
    Meteor.users.update({_id:userId}, {$set: { 'profile': { name: newName } } });
    return true;
  },
  'LoginProcedure': (email) => {
    var user = Meteor.users.findOne({
      'emails.address': email
    });

    if (!user) {
      user = Accounts.createUser({email})
    }

    const now = new Date() + "";
    LoginSessions.remove({ email });

    const hash = LoginSessions.insert({
      email,
      sent: now
    });

    return Meteor.wrapAsync( (email, hash, startTime, callback) => {
      console.log(`------------ \nNew Message\n to: ${email}\n body: ${hash} `)
      return Meteor.call('emailLogin', email, hash, callback);
    })(email, hash, now)
  },
  'Login': (hash) => {
    const session = LoginSessions.findOne({ _id: hash })
    const user = Meteor.users.findOne({
      'emails.address': session.email
    });

    if(!session || !user){
      return new Meteor.Error(404, 'No session');
    }

    return Meteor.wrapAsync( (userId, hash, callback) => {
      LoginSessions.remove({_id: hash});
      return saveLoginToken(userId, callback);
    })(user._id, hash)
  }
})
