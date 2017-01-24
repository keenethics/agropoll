// Methods related to pseudoRecords

// import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';
// import { Localities } from '/imports/api/localities/localities.js'
// import { PseudoRecords } from './pseudoRecords.js';
//
// const getParentLocations = (locationObj, parentId) => {
//   const parentLocation = Localities.findOne({ place_id: parentId });
//   switch (parentLocation.type) {
//     case 'administrative_area_level_1':
//       locationObj.administrative_area_level_1 = parentLocation.place_id;
//       break;
//     case 'administrative_area_level_2':
//       locationObj.administrative_area_level_2 = parentLocation.place_id;
//       break;
//     case 'administrative_area_level_3':
//       locationObj.administrative_area_level_3 = parentLocation.place_id;
//       break;
//     default:
//       break;
//   }
//
//   if (parentLocation.parentId)
//     locationObj = getParentLocations(locationObj, parentLocation.parentId);
// };
//
// Meteor.methods({
//   'record.insert'({ year, place_id, cropId, sort, reproduction, square, cropYield, status }) {
//     check(year, String);
//     check(place_id, String);
//     check(cropId, Number);
//     check(sort, String);
//     check(reproduction, String);
//     check(square, Number);
//     check(cropYield, Number);
//     check(status, String);
//
//     const user = Meteor.users.findOne({ _id: Meteor.userId() });
//     const location = Localities.findOne({ place_id: place_id });
//     const locationObj = {
//       place_id: location.place_id,
//       administrative_area_level_1: null,
//       administrative_area_level_2: null,
//       administrative_area_level_3: null,
//     };
//
//     if (location.parentId) {
//       getParentLocations(locationObj, location.parentId);
//     }
//
//     Meteor.users.update({ _id: user._id }, { $addToSet: { 'profile.locations': place_id } });
//
//     return PseudoRecords.insert({
//       // userEmail: user.emails[0].address,
//       location: locationObj,
//       userId: user._id,
//       year,
//       reproduction,
//       cropYield,
//       cropId,
//       square,
//       status,
//       sort,
//
//       updatedAt: Date.now(),
//     });
//   },
//   'record.removeOne'(_id) {
//     check(_id, String);
//
//     const user = Meteor.users.findOne({ _id: Meteor.userId() });
//     const record = PseudoRecords.findOne({ _id });
//     const place_id = record.location.place_id;
//     const usersRecords = PseudoRecords.find({ 'location.place_id': place_id, userId: user._id}).fetch();
//
//     if (usersRecords.length < 2){
//       Meteor.users.update({ _id: Meteor.userId() },
//       { $pull: { 'profile.locations': { $in: [place_id] } } })
//     }
//     return PseudoRecords.remove({_id})
//   },
//   'record.update' (criteria, { sort, reproduction, square, cropYield, status }) {
//     // check()
//     return PseudoRecords.update(criteria, { $set: {
//       reproduction,
//       cropYield,
//       square,
//       status,
//       sort,
//
//       updatedAt: Date.now(),
//     } });
//   },
//   'record.updateMulti' (dataObj) {
//     for (id in dataObj) {
//       PseudoRecords.update({ _id: id }, { $set: {
//         sort: dataObj[id].sort,
//         reproduction: dataObj[id].reproduction,
//         square: dataObj[id].square,
//         cropYield: dataObj[id].cropYield,
//         updatedAt: Date.now(),
//       }});
//     }
//   },
//
//   // --- method for update status---
//   'record.updateStatus': ({ recordId, newStatus }) => {
//     check(recordId, String);
//     check(newStatus, String);
//
//     const updateData = {};
//     updateData.$set = { status: newStatus };
//     PseudoRecords.update(recordId, updateData);
//   },
// });
