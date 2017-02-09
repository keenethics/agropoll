import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import sendgrid from 'sendgrid';

const helper = sendgrid.mail;
const sg = sendgrid(Meteor.settings.private.SENDGRID_API_KEY);

Meteor.methods({
  emailLogin: (email, body = 'hello') => {
    check(email, String);
    check(body, String);


    // this.unblock(); // ????

    const from = new helper.Email('support@agromonitor-test.now.sh');
    const to = new helper.Email(email);
    const subject = 'Login credentials';
    const content = new helper.Content('text/plain', `${Meteor.absoluteUrl()}login/${body}`);
    const mail = new helper.Mail(from, subject, to, content);

    console.log('~~!>', `${Meteor.absoluteUrl()}login/${body}`, helper, sg, Meteor.settings.private.SENDGRID_API_KEY);

    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sg.API(request, (error, response) => {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });

    // const postURL = `${Meteor.settings.private.MAILGUN_API_URL}/${Meteor.settings.private.MAILGUN_DOMAIN}/messages`;
    // const options = {
    //   auth: `api:${Meteor.settings.private.MAILGUN_API_KEY}`,
    //   params: {
    //     from: 'Agromonitor &lt;support@agromonitor-test.now.sh',
    //     to: [email],
    //     subject: 'Login credentials',
    //     text: `${Meteor.absoluteUrl()}login/${body}`,
    //   },
    // };
    // const onError = (err, res) => {
    //   if (err) {
    //     console.error(err);
    //   }
    // };
    //
    // Meteor.http.post(postURL, options, onError);
  },
});
