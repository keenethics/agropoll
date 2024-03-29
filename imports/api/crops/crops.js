// Definition of the records collection

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Crops = new Mongo.Collection('crops');
export const Groups = new Mongo.Collection('groups');

// Defining schemas for collections
Crops.schema = new SimpleSchema({
  id: { type: Number, optional: true },
  'name-ua': { type: String, optional: true },
  'name-en': { type: String, optional: true },
  groupId: { type: Number, optional: true },
  baseSquare: { type: Number, optional: true, decimal: true },
  avgCropYield: { type: Number, optional: true, decimal: true },
  squares: { type: Object, blackbox: true },
});
Crops.attachSchema(Crops.schema);

Groups.schema = new SimpleSchema({
  id: { type: Number, optional: true },
  'name-ua': { type: String, optional: true },
  'name-en': { type: String, optional: true },
});
Groups.attachSchema(Groups.schema);
