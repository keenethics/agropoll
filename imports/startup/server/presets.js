// Environment presets

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  console.log('ABSOLUTE URL =', Meteor.absoluteUrl());

  // process.env.MAIL_URL = process.env.MAIL_URL || Meteor.settings.private.MAIL_URL;
  // console.log('MAIL URL =', process.env.MAIL_URL);
  // process.env.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || Meteor.settings.private.SENDGRID_API_KEY;
  // console.log('SENDGRID_API_KEY =', process.env.SENDGRID_API_KEY);
});
