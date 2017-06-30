// Definition of the clusters collection

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Clusters = new Mongo.Collection('clusters');


// Defining schemas for collections
Clusters.schema = new SimpleSchema({
  name: { type: String, unique: true },
  conditions: { type: String },
  totalArea: { type: Number, decimal: true },
  usersCount: { type: Number, optional: true },
  totalSquare: { type: Number, optional: true, decimal: true },
});
Clusters.attachSchema(Clusters.schema);
