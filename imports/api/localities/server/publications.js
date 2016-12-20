import { Meteor } from 'meteor/meteor';

import { Localities } from '../localities.js';

Meteor.publish('localities.palceId', function (place_id) {
  return Localities.find(place_id);
});

Meteor.publish('localities.all', function () {
  return Localities.find();
});
