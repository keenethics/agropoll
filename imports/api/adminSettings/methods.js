// Methods related to records

import { Meteor } from 'meteor/meteor';
import { AdminSettings } from './adminSettings.js';

Meteor.methods({
  'updateSettings'() {

  },
  'getCurrentYear'() {
    return AdminSettings.findOne().year;
  }
});
