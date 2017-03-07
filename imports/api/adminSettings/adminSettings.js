// Definition of the adminSettings collection

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const AdminSettings = new Mongo.Collection('adminSettings');

// Defining a schema for collection
AdminSettings.schema = new SimpleSchema({
  year: { type: String },
  baseYear: { type: String },
});
AdminSettings.attachSchema(AdminSettings.schema);
