Meteor.methods({
  'LoginProcedure': (email) => { //username, pswDigest, code,, hash
    var user = Meteor.users.findOne({
      'email.address': email
    });

      var now = new Date();
      var hash = +now;

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
        user = Accounts.createUser({email}, (err) => {
          if (err)
            return new Meteor.Error(404, "Something wrong");
        })

      }

      return Meteor.wrapAsync( (email, hash, startTime, callback) => {
        console.log(`------------ \nNew Message\n to: ${user}\n body: ${hash} `)
        return saveLoginToken(user._id);
      })(email, hash, now)
    },
    'Login': (hash) => {
      var session = LoginSessions.findOne({
        hash
      })

      if(!session){
        throw new Mongo.Error(404, 'No session');
      }

      var user = Meteor.users.findOne({
        'email.address': email
      });

      if(!user){
        throw new Mongo.Error(404, 'No session');
      }
      return saveLoginToken(user._id);
    }
});
