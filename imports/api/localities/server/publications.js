import { Meteor } from 'meteor/meteor';

import { Localities } from '../localities.js';

Meteor.publish('localities.palceId', function (placeId) {
  return Crops.find(placeId);
});
