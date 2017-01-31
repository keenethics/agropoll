import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Localities } from '../localities.js';

Meteor.publish('localities.all', () => Localities.find());

Meteor.publish('localities', ({ administrative_area_level_1, administrative_area_level_2 }) => {
  check(administrative_area_level_1, Match.OneOf(String, null));
  check(administrative_area_level_2, Match.OneOf(String, null));

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
