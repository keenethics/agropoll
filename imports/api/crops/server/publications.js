// All records-related publications

import { Meteor } from 'meteor/meteor';
import { Crops, Groups } from '../crops.js';

Meteor.publish('crops.all', function () {
  return Crops.find();
});

Meteor.publish('groups.all', function () {
  return Groups.find();
});
