// Methods related to records

import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';
import { Records } from './records.js';

Meteor.methods({
  'record.insert'(marketingYear, location, cropId, sort, reproduction, square, cropCapacity, status) {
    // check(url, String);
    // check(title, String);

    return Records.insert({
      farmerId: this.userId,
      marketingYear,
      location,
      cropId,
      sort,
      reproduction,
      square,
      cropCapacity,
      status,

      updatedAt: Date.now(),
    });
  },
  'record.removeOne'(_id) {
    return Records.remove({_id})
  }
});
