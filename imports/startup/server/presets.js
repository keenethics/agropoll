// Environment presets

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  console.log('ABSOLUTE URL =', Meteor.absoluteUrl());
});
