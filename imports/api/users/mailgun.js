/* global process */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  emailLogin: (email, body = 'hello') => {
    check(email, String);
    check(body, String);


    // this.unblock(); // ????
    const postURL = `${Meteor.settings.private.MAILGUN_API_URL}/${Meteor.settings.private.MAILGUN_DOMAIN}/messages`;
    const options = {
      auth: `api:${Meteor.settings.private.MAILGUN_API_KEY}`,
      params: {
        from: 'Agromonitor &lt;support@mg.agromonitor.com',
        to: [email],
        subject: 'Login credentials',
        text: `http://localhost:3000/login/${body}`,
      },
    };
    const onError = (err, res) => {
      if (err) {
        console.error(err);
      }
    };

    Meteor.http.post(postURL, options, onError);
  },
});
