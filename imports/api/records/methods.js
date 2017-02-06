// Methods related to records

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Localities } from '/imports/api/localities/localities.js';
import { Records } from './records.js';

const getParentLocations = (locationObj, parentId) => {
  const parentLocation = Localities.findOne({ place_id: parentId });
  const newLocationObj = Object.assign({}, locationObj);

  switch (parentLocation.type) {
    case 'administrative_area_level_1':
      newLocationObj.administrative_area_level_1 = parentLocation.place_id;
      break;
    case 'administrative_area_level_2':
      newLocationObj.administrative_area_level_2 = parentLocation.place_id;
      break;
    case 'administrative_area_level_3':
      newLocationObj.administrative_area_level_3 = parentLocation.place_id;
      break;
    default:
      break;
  }

  if (parentLocation.parentId) {
    return getParentLocations(newLocationObj, parentLocation.parentId);
  }

  return newLocationObj;
};

Meteor.methods({
  'record.insert'({ year, place_id, cropId, sort, reproduction, square, cropYield, status }) {
    check(year, String);
    check(place_id, String);
    check(cropId, Number);
    check(sort, String);
    check(reproduction, String);
    check(square, Number);
    check(cropYield, Number);
    check(status, String);

    const user = Meteor.users.findOne({ _id: Meteor.userId() });
    const location = Localities.findOne({ place_id: place_id });
    let locationObj = {
      place_id: location.place_id,
      administrative_area_level_1: null,
      administrative_area_level_2: null,
      administrative_area_level_3: null,
    };

    if (location.parentId) {
      locationObj = getParentLocations(locationObj, location.parentId);
    }

    Meteor.users.update({ _id: user._id }, { $addToSet: { 'profile.locations': place_id } });

    return Records.insert({
      location: locationObj,
      userId: user._id,
      year,
      reproduction,
      cropYield,
      cropId,
      square,
      squareNorm: 0,
      status,
      sort,

      updatedAt: Number(Date.now()),
    });
  },
  'record.removeOne'(_id) {
    check(_id, String);

    const user = Meteor.users.findOne({ _id: Meteor.userId() });
    const record = Records.findOne({ _id });
    const place_id = record.location.place_id;
    const usersRecords = Records.find({ 'location.place_id': place_id, userId: user._id }).fetch();

    if (usersRecords.length < 2) {
      Meteor.users.update(
        { _id: Meteor.userId() },
        { $pull: { 'profile.locations': { $in: [place_id] } } }
      );
    }
    return Records.remove({ _id });
  },
  'record.update'(criteria, { sort, reproduction, square, cropYield, status }) {
    // What is 'criteria'?
    // check()
    return Records.update(criteria, { $set: {
      reproduction,
      cropYield,
      square,
      status,
      sort,

      updatedAt: Number(Date.now()),
    } });
  },
  'record.updateMulti'(dataObj) {
    // dataObj is an object which looks like
    // {
    // recordId: record body
    // }
    Object.keys(dataObj).forEach((id) => {
      Records.update({ _id: id }, { $set: {
        sort: dataObj[id].sort,
        reproduction: dataObj[id].reproduction,
        square: dataObj[id].square,
        cropYield: dataObj[id].cropYield,

        updatedAt: Number(Date.now()),
      } });
    });
  },

  'record.updateStatus': ({ recordId, newStatus }) => {
    check(recordId, String);
    check(newStatus, String);

    const updateData = {};
    updateData.$set = { status: newStatus };
    Records.update(recordId, updateData);
  },
});
