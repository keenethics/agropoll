// import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';
//
// Meteor.methods({
//   emailLogin: (email, body = 'hello') => {
//     check(email, String);
//     check(body, String);
//
//
//     // this.unblock(); // ????
//     const postURL = `${Meteor.settings.private.MAILGUN_API_URL}/${Meteor.settings.private.MAILGUN_DOMAIN}/messages`;
//     const options = {
//       auth: `api:${Meteor.settings.private.MAILGUN_API_KEY}`,
//       params: {
//         from: 'Agromonitor &lt;support@agromonitor-test.now.sh',
//         to: [email],
//         subject: 'Login credentials',
//         text: `${Meteor.absoluteUrl()}login/${body}`,
//       },
//     };
//     const onError = (err, res) => {
//       if (err) {
//         console.error(err);
//       }
//     };
//
//     Meteor.http.post(postURL, options, onError);
//   },
// });
