// Definition of the records collection

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Records = new Mongo.Collection('records');

// Defining a schema for collection
Records.schema = new SimpleSchema({
  _id: { type: String, optional: true },
  location: { type: Object, optional: true },
  'location.place_id': { type: String, optional: true },
  'location.administrative_area_level_1': { type: String, optional: true },
  'location.administrative_area_level_2': { type: String, optional: true },
  'location.administrative_area_level_3': { type: String, optional: true },
  userId: { type: String, optional: true },
  year: { type: String, optional: true },
  reproduction: { type: String, optional: true },
  cropYield: { type: Number, optional: true },
  cropId: { type: Number, optional: true },
  square: { type: Number, optional: true },
  status: { type: String, optional: true },
  sort: { type: String, optional: true },
  updatedAt: { type: Number, optional: true, decimal: true },
  farmlandArea: { type: Number, optional: true, decimal: true },
  // usersCount: { type: Number, optional: true },
  type: { type: String, optional: true },
});
Records.attachSchema(Records.schema);

/*
const updateTotalSquare = ({ userId, year }) => {
  const findQuery = {
    userId,
    year,
  };
  const recordCursor = Records.find(findQuery);
  let fullArea = 0;
  recordCursor.forEach((val) => {
    fullArea += Number(val.square);
  });
  const replacement = {};
  replacement.$set = {};
  replacement.$set.totalSquare = Meteor.users.findOne(userId).totalSquare || {};
  replacement.$set.totalSquare[year] = fullArea;
  console.log('replacement', replacement);

  const options = {
    upsert: true,
  };
  Meteor.users.update(userId, replacement, options);
};

Records.after.update((userId, { year }) => {
  updateTotalSquare({ userId, year });
});

Records.after.remove((userId, { year }) => {
  updateTotalSquare({ userId, year });
});
*/
