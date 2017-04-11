import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

// process.env.MAIL_URL = process.env.MAIL_URL || Meteor.settings.private.MAIL_URL;
// console.log(process.env.MAIL_URL);

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
