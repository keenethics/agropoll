  import { Meteor } from 'meteor/meteor';

import { Localities } from '../localities.js';

Meteor.publish('localities.palceId', function (place_id) {
  return Localities.find(place_id);
});

Meteor.publish('localities.all', () => Localities.find());

Meteor.publish('localities', function ({ administrative_area_level_1, administrative_area_level_2 }) {
  return Localities.find({
    $or: [
      {
        type: 'administrative_area_level_1'
      },
      {
        type: 'administrative_area_level_2',
        parentId: administrative_area_level_1
      },
      {
        type: 'locality',
        parentId: administrative_area_level_2
      }
    ]
  });
});
