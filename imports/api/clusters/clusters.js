// Definition of the clusters collection

import { Mongo } from 'meteor/mongo';
// import { Meteor } from 'meteor/meteor';

export const Clusters = new Mongo.Collection('clusters');

// const updateTotalSquare = ({ userId, marketingYear }) => {
//   const findQuery = {
//     userId,
//     marketingYear,
//   };
//   const recordCursor = Records.find(findQuery);
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
// Records.after.update((userId, { marketingYear }) => {
//   updateTotalSquare({ userId, marketingYear });
// });
//
// Records.after.remove((userId, { marketingYear }) => {
//   updateTotalSquare({ userId, marketingYear });
// });
