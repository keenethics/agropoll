// Definition of the records collection

import { Mongo } from 'meteor/mongo';

export const Records = new Mongo.Collection('records');
export const LoginSessions = new Mongo.Collection('LoginSessions');
