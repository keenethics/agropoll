// import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';
// import { Email } from 'meteor/email';
//
// process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
// console.log(process.env.MAIL_URL);
//
// Meteor.methods({
//   emailLogin(email, body = 'hello') {
//     check(email, String);
//     check(body, String);
//
//     this.unblock();
//
//     Email.send({
//       to: email,
//       from: 'support@agromonitor-test.now.sh',
//       subject: 'Вхід у Агромонітор',
//       text: `${Meteor.absoluteUrl()}login/${body}`,
//     });
//   },
// });
