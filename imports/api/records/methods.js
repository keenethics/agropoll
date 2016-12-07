// Methods related to records

import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';
import { Records } from './records.js';

Meteor.methods({
  'record.insert'(marketingYear, palceId, cropId, sort, reproduction, square, cropCapacity, status) {
    // check(url, String);
    // check(title, String);

    return Records.insert({
      userId: this.userId,
      marketingYear,
      palceId,
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
  },
  'record.update' (criteria, data) {
    return Records.update(criteria, {$set: data} );
  }
});
