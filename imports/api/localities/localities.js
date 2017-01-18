import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Localities = new Mongo.Collection('localities');

// Defining a schema for collection
Localities.schema = new SimpleSchema({
  _id: { type: String, optional: true },
  type: { type: String, optional: true },
  name: { type: String, optional: true },
  place_id: { type: String, optional: true },
  parentId: { type: String, optional: true },
  fullAddress: { type: String, optional: true },
});
Localities.attachSchema(Localities.schema);
