// Methods related to records

import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';
import { Records } from './records.js';

Meteor.methods({
  'record.insert'({ marketingYear, placeId, cropId, sort, reproduction, square, cropCapacity, status }) {
    // check(url, String);
    // check(title, String);

    return Records.insert({
      userId: this.userId,
      marketingYear,
      reproduction,
      cropCapacity,
      placeId,
      cropId,
      square,
      status,
      sort,

      updatedAt: Date.now(),
    });
  },
  'record.removeOne'(_id) {
    return Records.remove({_id})
  },
  'record.update' (criteria, { sort, reproduction, square, cropCapacity, status }) {
    return Records.update(criteria, {$set: {
      reproduction,
      cropCapacity,
      square,
      status,
      sort,

      updatedAt: Date.now(),
    }} );
  }
});
