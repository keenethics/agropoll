// All records-related publications

import { Meteor } from 'meteor/meteor';
import { Records } from '../records.js';

Meteor.publish('records.all', function () {
  return Records.find();
});

Meteor.publish('records.user',(userId) => {
  return Records.find({ userId });
});
