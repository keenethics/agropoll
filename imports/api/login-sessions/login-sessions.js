import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const LoginSessions = new Mongo.Collection('loginSessions');

// Defining a schema for collection
LoginSessions.schema = new SimpleSchema({
  _id: { type: String, optional: true },
  email: { type: String, optional: true },
  sent: { type: String, optional: true }
});
LoginSessions.attachSchema(LoginSessions.schema);
