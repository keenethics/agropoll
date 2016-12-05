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
  'LoginProcedure': (email) => {
    var user = Meteor.users.findOne({
      'emails.address': email
    });

    var now = new Date().valueOf();
    var hash = ""+now;
    var session = LoginSessions.findOne({
      email
    });

    if(!session) {
      LoginSessions.insert({
        hash,
        email,
        sent: now
      });
    } else {
      LoginSessions.update({email}, {"$set": {hash, sent:now} } );
    }
    if (!user) {
      user = Accounts.createUser({email})
    }

    return Meteor.wrapAsync( (email, hash, startTime, callback) => {
      console.log(`------------ \nNew Message\n to: ${email}\n body: ${hash} `)
      saveLoginToken(user._id, callback);
      return Meteor.call('emailLogin', email, hash);
    })(email, hash, now)
  },
  'Login': (hash) => {
    var session = LoginSessions.findOne({
      hash
    })
    if(!session){
      return new Meteor.Error(404, 'No session');
    }

    var user = Meteor.users.findOne({
      'emails.address': session.email
    });
    if(!user){
      return new Meteor.Error(404, 'No session');
    }

    return Meteor.wrapAsync( (email, callback) => {
      return saveLoginToken(user._id, callback);
    })(session.email)
  }
});
