/*
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

Meteor.methods({
  emailLogin(email, body = 'hello', language = 'ua') {
    check(email, String);
    check(body, String);

    this.unblock();

    Email.send({
      to: email,
      from: 'agropoll.in.ua@gmail.com',
      subject: {
        ua: 'Вхід на сайт "Agropoll"',
        en: 'Sign in "Agropoll"',
      }[language || 'ua'],
      text: {
        ua: `Ваше посилання для входу: ${Meteor.absoluteUrl()}login/${body}\n\nЯкщо Ви не реєструвалися на сайті ${Meteor.absoluteUrl()}, повідомте нас за цією адресою або просто проігноруйте цього листа.`,
        en: `Your link for sign up/in: ${Meteor.absoluteUrl()}login/${body}\n\nIf don't intend to reach site ${Meteor.absoluteUrl()}, send us email or just ignore this letter.`,
      }[language || 'ua'],
    });
  },
});
*/

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import sendgrid from 'sendgrid';

const helper = sendgrid.mail;
const sg = sendgrid(Meteor.settings.private.SENDGRID_API_KEY);

Meteor.methods({
  emailLogin: (email, body = 'hello', language = 'ua') => {
    check(email, String);
    check(body, String);
    // check(language, String);

    const from = new helper.Email('agropoll.in.ua@gmail.com');
    const to = new helper.Email(email);
    const subject = {
      ua: 'Вхід на сайт "Agropoll"',
      en: 'Sign in "Agropoll"',
    }[language || 'ua'];
    const content = new helper.Content('text/plain', {
      ua: `Ваше посилання для входу: ${Meteor.absoluteUrl()}login/${body}\n\nЯкщо Ви не реєструвалися на сайті ${Meteor.absoluteUrl()}, повідомте нас за цією адресою або просто проігноруйте цього листа.`,
      en: `Your link for sign up/in: ${Meteor.absoluteUrl()}login/${body}\n\nIf don't intend to reach site ${Meteor.absoluteUrl()}, send us email or just ignore this letter.`,
    }[language || 'ua']);
    const mail = new helper.Mail(from, subject, to, content);

    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sg.API(request, (error, response) => {
      if (error) {
        console.log('Error response received:', error);
      }

      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });
  },
});
