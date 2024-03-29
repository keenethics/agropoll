// All records-related publications

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import { Records } from '../records.js';


Meteor.publish('records.filter', function (filters) {
  check(filters, {
    planned: Boolean,
    planted: Boolean,
    harvested: Boolean,
    place_id: Match.OneOf(String, null),
    administrative_area_level_1: Match.OneOf(String, null),
    administrative_area_level_2: Match.OneOf(String, null),
    year: String,
  });

  // const statuses = {
  //   planned: filters.planned,
  //   planted: filters.planted,
  //   harvested: filters.harvested,
  // };

  const locationFilter = filters.place_id || filters.administrative_area_level_2 ||
  filters.administrative_area_level_1;

  const query = {
    year: filters.year,
    // status: { $in: Object.keys(statuses).filter((item) => statuses[item]) },
    // Only not banned records
    // banned: { $ne: true },
  };

  if (locationFilter !== 'none') {
    query.$or = [
      { 'location.administrative_area_level_1': locationFilter },
      { 'location.administrative_area_level_2': locationFilter },
      { 'location.place_id': locationFilter },
    ];
  }

  console.log('query =', query);

  // Віддавати без локаліті (як мінімум без place_id)
  return Records.find(query, {
    fields: {
      'location.place_id': 0,
      'location.administrative_area_level_2': 0,
      'location.administrative_area_level_3': 0,
      userId: 0,
      square: 0,
      // type: 0,
      // farmlandArea: 0,
      updatedAt: 0,
    },
  });
});

Meteor.publish('records.user', function () {
  if (!this.userId) {
    throw new Meteor.Error('not-authorized');
  }

  return Records.find({ userId: this.userId });
});

// Only for Admin
Meteor.publish('records.filter.admin', function (filters) {
  check(filters, {
    planned: Boolean,
    planted: Boolean,
    harvested: Boolean,
    place_id: Match.OneOf(String, null),
    administrative_area_level_1: Match.OneOf(String, null),
    administrative_area_level_2: Match.OneOf(String, null),
    year: String,
  });

  if (!Roles.userIsInRole(this.userId, 'admin')) {
    console.log(`! WARNING ! \nUser '${this.userId}' was trying to access to admin page!`);
    // throw new Meteor.Error('User is not Admin!');
  }

  const statuses = {
    planned: filters.planned,
    planted: filters.planted,
    harvested: filters.harvested,
  };

  const locationFilter = filters.place_id || filters.administrative_area_level_2 ||
  filters.administrative_area_level_1;

  const query = {
    year: filters.year,
    status: { $in: Object.keys(statuses).filter((item) => statuses[item]) },
  };

  if (locationFilter !== 'none') {
    query.$or = [
      { 'location.administrative_area_level_1': locationFilter },
      { 'location.administrative_area_level_2': locationFilter },
      { 'location.place_id': locationFilter },
    ];
  }

  console.log('admin query =', query);

  return Records.find(query);
});
