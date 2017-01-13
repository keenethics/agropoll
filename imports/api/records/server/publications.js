// All records-related publications

import { Meteor } from 'meteor/meteor';
import { Records } from '../records.js';

Meteor.publish('records.all', function () {
  return Records.find();
});

Meteor.publish('records.user',() => {
  const user = Meteor.users.findOne({ _id: this.userId });
  if(!user)
    throw new Meteor.Error('not-authorized');
  return Records.find({ userId: user._id });
});
