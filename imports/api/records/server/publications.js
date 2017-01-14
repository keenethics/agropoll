// All records-related publications

import { Meteor } from 'meteor/meteor';
import { Records } from '../records.js';

Meteor.publish('records.filter', function(filters) {
  console.log(filters);
  return Records.find({}, { fields: { 'location.place_id': 0 } });
  // Ми повинні віддавати без локаліті (як мінімум без place_id)
});

Meteor.publish('records.user', (userId) => { // User from cient!!!!!!!!!!!!!!!
  return Records.find({ userId });
});
