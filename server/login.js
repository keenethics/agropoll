Accounts.validateLoginAttempt( (attempt) => {
  var allowed = [
    'login',
    'verifyEmail'
  ];

  if(_.contains(allowed, attempt.methodName) && attempt.type == 'resume'){
    return true;
  }
  return false;
});

var generateLoginToken = () => {
  var stampedToken = Accounts._generateStampedLoginToken();
  return [
    stampedToken,
    Accounts._hasStampedToken(stampedToken)
  ];
};

var saveLoginToken = (userId) => {
  return Meteor.wrapAsync( (userId, tokens, callback) => {
    Meteor.users.update(userId, {
      $push: {
        'services.resume.loginTokens': tokens[1]
      }
    }, (err) => {
      if (err) {
        callback(new Meteor.Error(500, 'Couldnt save login token into user profile'));
      } else {
        callback && callback(null, [200, tokens[0].token]);
      }
    });
  })(userId, generateLoginToken());
}
