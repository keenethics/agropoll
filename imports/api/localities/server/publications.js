import { Meteor } from 'meteor/meteor';

import { Localities } from '../localities.js';

Meteor.publish('localities.palceId', function (placeId) {
  return Localities.find(placeId);
});

Meteor.publish('localities.all', function () {
  return Localities.find();
});
