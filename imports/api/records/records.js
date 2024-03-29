// Definition of the records collection

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Records = new Mongo.Collection('records');

// Defining a schema for collection
Records.schema = new SimpleSchema({
  location: { type: Object, optional: true },
  'location.place_id': { type: String, optional: true },
  'location.administrative_area_level_1': { type: String, optional: true },
  'location.administrative_area_level_2': { type: String, optional: true },
  'location.administrative_area_level_3': { type: String, optional: true },
  userId: { type: String },
  year: { type: String },
  cropId: { type: Number },
  sort: { type: String, optional: true },
  reproduction: { type: String, optional: true },
  square: { type: Number, decimal: true },
  squareNorm: { type: Number, optional: true, decimal: true },
  cropYield: { type: Number, optional: true, decimal: true },
  status: { type: String, optional: true },
  updatedAt: { type: Number, optional: true, decimal: true },
  // farmlandArea: { type: Number, optional: true, decimal: true },
  // type: { type: String, optional: true },

  // usersCount: { type: Number, optional: true },
  // squaresRatio: { type: Number, optional: true, decimal: true },
  // banned: { type: Boolean, optional: true },
});
Records.attachSchema(Records.schema);
