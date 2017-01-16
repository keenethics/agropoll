// All records-related publications

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Records } from '../records.js';

Meteor.publish('records.filter', function (filters) {
  check(filters.planned, String);
  check(filters.planted, String);
  check(filters.harvested, String);
  check(filters.place_id, String);
  check(filters.administrative_area_level_1, Match.OneOf(String, null));
  check(filters.administrative_area_level_2, Match.OneOf(String, null));
  check(filters.marketingYear, String);

  console.log(filters);
  const statuses = {
    planned: filters.planned,
    planted: filters.planted,
    harvested: filters.harvested,
  };

  const locationFilter = filters.place_id || filters.administrative_area_level_2 || filters.administrative_area_level_1;
  console.log(statuses, Object.keys(statuses).filter((item) => statuses[item]), locationFilter);

  return locationFilter ? Records.find({
    marketingYear: filters.marketingYear,
    $or: [
      { 'location.administrative_area_level_1': locationFilter },
      { 'location.administrative_area_level_2': locationFilter },
      { 'location.place_id': locationFilter },
    ],
    status: { $in: Object.keys(statuses).filter((item) => statuses[item]) },
  }, {
    fields: {
      'location.place_id': 0,
      userId: 0,
    }
  }) : Records.find({
    marketingYear: filters.marketingYear,
    status: { $in: Object.keys(statuses).filter((item) => statuses[item]) },
  }, {
    fields: {
      'location.place_id': 0,
      userId: 0,
    }
  });
  // Ми повинні віддавати без локаліті (як мінімум без place_id)
});

Meteor.publish('records.user', function () {
  if (!this.userId) {
    throw new Meteor.Error('not-authorized');
  }
  return Records.find({ userId: this.userId }, { userId: 0 });
});
