// Methods related to records

import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';
import { Localities } from '/imports/api/localities/localities.js'
import { Records } from './records.js';

const getParentLocations = (locationObj, parentId) => {
  const parentLocation = Localities.findOne({ placeId: parentId });
  switch (parentLocation.type) {
    case 'administrative_area_level_1':
      locationObj.administrative_area_level_1 = parentLocation.placeId;
    break;
    case 'administrative_area_level_2':
      locationObj.administrative_area_level_2 = parentLocation.placeId;
    break;
    case 'administrative_area_level_3':
      locationObj.administrative_area_level_3 = parentLocation.placeId;
    break;
  }

  if (parentLocation.parentId)
    locationObj = getParentLocations(locationObj, parentLocation.parentId);

  return locationObj;
}

Meteor.methods({
  'record.insert'({ marketingYear, placeId, cropId, sort, reproduction, square, cropCapacity, status }) {
    // check(url, String);
    // check(title, String);
    const location = Localities.findOne({ placeId: placeId });
    let locationObj = {
      placeId: location.placeId,
      administrative_area_level_1: null,
      administrative_area_level_2: null,
      administrative_area_level_3: null,
    };

    if (location.parentId){
      locationObj = getParentLocations(locationObj, location.parentId);
    }

    console.log(locationObj);

    return Records.insert({
      userId: this.userId,
      marketingYear,
      reproduction,
      cropCapacity,
      location: locationObj,
      cropId,
      square,
      status,
      sort,

      updatedAt: Date.now(),
    });
  },
  'record.removeOne'(_id) {
    return Records.remove({_id})
  },
  'record.update' (criteria, { sort, reproduction, square, cropCapacity, status }) {
    return Records.update(criteria, {$set: {
      reproduction,
      cropCapacity,
      square,
      status,
      sort,

      updatedAt: Date.now(),
    }} );
  }
});
