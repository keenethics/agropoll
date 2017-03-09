// All adminSettings-related publications

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { AdminSettings } from '../adminSettings.js';

Meteor.publish('adminSettings', () => AdminSettings.find({}));
