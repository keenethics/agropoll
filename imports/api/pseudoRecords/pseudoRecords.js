// Definition of the PseudoRecords collection

import { Mongo } from 'meteor/mongo';
// import { Meteor } from 'meteor/meteor';

export const PseudoRecords = new Mongo.Collection('pseudoRecords');

// const updateTotalSquare = ({ userId, marketingYear }) => {
//   const findQuery = {
//     userId,
//     marketingYear,
//   };
//   const recordCursor = PseudoRecords.find(findQuery);
//   let fullArea = 0;
//   recordCursor.forEach((val) => {
//     fullArea += Number(val.square);
//   });
//   const replacement = {};
//   replacement.$set = {};
//   replacement.$set.totalSquare = Meteor.users.findOne(userId).totalSquare || {};
//   replacement.$set.totalSquare[marketingYear] = fullArea;
//
//   const options = {
//     upsert: true,
//   };
//   Meteor.users.update(userId, replacement, options);
// };
//
// PseudoRecords.after.update((userId, { marketingYear }) => {
//   updateTotalSquare({ userId, marketingYear });
// });
//
// PseudoRecords.after.remove((userId, { marketingYear }) => {
//   updateTotalSquare({ userId, marketingYear });
// });
