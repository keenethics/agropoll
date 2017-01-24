// Definition of the PseudoRecords collection

import { Mongo } from 'meteor/mongo';
// import { Meteor } from 'meteor/meteor';

export const PseudoRecords = new Mongo.Collection('pseudoRecords');

// const updateTotalSquare = ({ userId, year }) => {
//   const findQuery = {
//     userId,
//     year,
//   };
//   const recordCursor = PseudoRecords.find(findQuery);
//   let fullArea = 0;
//   recordCursor.forEach((val) => {
//     fullArea += Number(val.square);
//   });
//   const replacement = {};
//   replacement.$set = {};
//   replacement.$set.totalSquare = Meteor.users.findOne(userId).totalSquare || {};
//   replacement.$set.totalSquare[year] = fullArea;
//
//   const options = {
//     upsert: true,
//   };
//   Meteor.users.update(userId, replacement, options);
// };
//
// PseudoRecords.after.update((userId, { year }) => {
//   updateTotalSquare({ userId, year });
// });
//
// PseudoRecords.after.remove((userId, { year }) => {
//   updateTotalSquare({ userId, year });
// });
