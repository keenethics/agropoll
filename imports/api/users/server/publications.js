// All users-related publications

import { Meteor } from 'meteor/meteor';
// import { check, Match } from 'meteor/check';

// import {  } from '../records.js';

Meteor.publish('users.all', function () {

  // const locationFilter = filters.place_id || filters.administrative_area_level_2 ||
  // filters.administrative_area_level_1;
  //
  // const query = {
  //   year: filters.year,
  //   status: { $in: Object.keys(statuses).filter((item) => statuses[item]) },
  // };

  // if (locationFilter !== 'none') {
  //   query.$or = [
  //     { 'location.administrative_area_level_1': locationFilter },
  //     { 'location.administrative_area_level_2': locationFilter },
  //     { 'location.place_id': locationFilter },
  //   ];
  // }
  //
  // console.log('query =', query);

  // Віддавати без локаліті (як мінімум без place_id)
  console.log('all users =',Meteor.users.find({}).fetch());
  return Meteor.users.find({});
});
//
// Meteor.publish('records.user', function () {
//   if (!this.userId) {
//     throw new Meteor.Error('not-authorized');
//   }
//
//   return Records.find({ userId: this.userId }, {
//     fields: {
//       // userId: 0,
//       // squareNorm: 0,
//       // farmlandArea: 0,
//     },
//   });
// });
