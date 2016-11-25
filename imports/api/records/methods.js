// Methods related to records

import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';
import { Records } from './records.js';

Meteor.methods({
  'records.insert'(title, url) {
    // check(url, String);
    // check(title, String);

    return Records.insert({
      url,
      title,
      createdAt: new Date(),
    });
  },
});
