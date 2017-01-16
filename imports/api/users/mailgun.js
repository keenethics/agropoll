import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  emailLogin: (email, body = 'hello') => {
    check(email, String);
    check(body, String);
    
    //this.unblock();

    var postURL = process.env.MAILGUN_API_URL + '/' + process.env.MAILGUN_DOMAIN + '/messages';
    var options = {
      auth: "api:" + process.env.MAILGUN_API_KEY,
      params: {
        "from":"Agromonitor &lt;support@mg.agromonitor.com",
        "to":[email],
        "subject": 'Login credentials',
        "text": "http://localhost:3000/login/" + body,
      }
    }
    var onError = (err, res) => {
      if (err)
      console.error(err);
    }

    Meteor.http.post(postURL, options, onError);
  }
})
