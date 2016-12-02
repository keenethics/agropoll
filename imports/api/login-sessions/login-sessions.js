import { Mongo } from 'meteor/mongo';

export const LoginSessions = new Mongo.Collection('loginSessions');
