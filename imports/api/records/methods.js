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

}

Meteor.methods({
  'record.insert'({ marketingYear, placeId, cropId, sort, reproduction, square, cropCapacity, status }) {
    // check(url, String);
    // check(title, String);
    const location = Localities.findOne({ placeId: placeId });
    const locationObj = {
      placeId: location.placeId,
      administrative_area_level_1: null,
      administrative_area_level_2: null,
      administrative_area_level_3: null,
    };

    if (location.parentId){
      getParentLocations(locationObj, location.parentId);
    }

    Meteor.users.update({ _id: Meteor.userId() }, { $addToSet: { 'profile.locations': placeId } });

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
    const user = Meteor.users.findOne({ _id: Meteor.userId() });
    const record = Records.findOne({ _id });
    const placeId = record.location.placeId;
    const usersRecords = Records.find({ 'location.placeId': placeId, userId: user._id}).fetch();
    if (usersRecords.length < 2){
      Meteor.users.update({ _id: Meteor.userId() },
      { $pull: { 'profile.locations': { $in: [placeId] } } })
    }
    return Records.remove({_id})
  },
  'record.update' (criteria, { sort, reproduction, square, cropCapacity, status }) {
    return Records.update(criteria, { $set: {
      reproduction,
      cropCapacity,
      square,
      status,
      sort,

      updatedAt: Date.now(),
    }} );
  },
  'record.updateMulti' (dataObj) {
    for (id in dataObj) {
      Records.update({ _id: id }, { $set: {
        sort: dataObj[id].sort,
        reproduction: dataObj[id].reproduction,
        square: dataObj[id].square,
        cropCapacity: dataObj[id].cropCapacity,
        status: dataObj[id].status,

        updatedAt: Date.now(),
      }})
    }
  },
});
