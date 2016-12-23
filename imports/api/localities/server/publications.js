  import { Meteor } from 'meteor/meteor';

import { Localities } from '../localities.js';

Meteor.publish('localities.palceId', function (placeId) {
  return Localities.find(placeId);
});

Meteor.publish('localities', function ({ admLevel1, admLevel2 }) {
  return Localities.find({
    $or: [
      {
        type: 'administrative_area_level_1'
      },
      {
        parentId: {
          $in: [ admLevel1, admLevel2 ]
        }
      }
    ]
  });
});
