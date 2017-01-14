// All records-related publications

import { Meteor } from 'meteor/meteor';
import { Records } from '../records.js';

Meteor.publish('records.filter', function (filters) {
  console.log(filters);
  return Records.find({}, { fields: { 'location.place_id': 0 } });
  // Ми повинні віддавати без локаліті (як мінімум без place_id)
});

Meteor.publish('records.user', function () {
  if (!this.userId) {
    throw new Meteor.Error('not-authorized');
  }
  return Records.find({ userId: this.userId });
});
