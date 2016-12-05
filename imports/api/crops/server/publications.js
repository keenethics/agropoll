// All records-related publications

import { Meteor } from 'meteor/meteor';
import { Crops } from '../crops.js';

Meteor.publish('crops.all', function () {
  return Crops.find();
});
