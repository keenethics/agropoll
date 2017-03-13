// Definition of the clusters collection

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Clusters = new Mongo.Collection('clusters');


// Defining schemas for collections
Clusters.schema = new SimpleSchema({
  name: { type: String, unique: true },
  conditions: { type: String },
  // farmersCount: { type: Number, optional: true },
  totalArea: { type: Number, decimal: true },
  usersCount: { type: Number, optional: true }, // { type: Number, optional: true },
  // squaresRatio: { type: Object, optional: true, blackbox: true }, // { type: Number, optional: true, decimal: true },
  totalSquare: { type: Number, optional: true, decimal: true },
});
Clusters.attachSchema(Clusters.schema);
