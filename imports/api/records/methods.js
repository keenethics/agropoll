// Methods related to records

import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';
import { Records } from './records.js';

Meteor.methods({
  'record.insert'(marketingYear, location, crop, sort, reproduction, area, cropCapacity, status) {
    // check(url, String);
    // check(title, String);



    return Records.insert({
      farmerId: this.userId,
      marketingYear,
      location,
      crop,
      sort,
      reproduction,
      area,
      cropCapacity,
      status,

      updatedAt: Date.now(),
    });
  },
});
