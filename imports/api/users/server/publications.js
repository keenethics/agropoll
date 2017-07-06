// All users-related publications
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('users.all', function () {
  if (!Roles.userIsInRole(this.userId, 'admin')) {
    console.log(`! WARNING ! \nUser '${this.userId}' was trying to access to admin page!`);
    throw new Meteor.Error('User is not Admin!');
  }

  return Meteor.users.find({});
});
