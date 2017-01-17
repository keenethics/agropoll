// All records-related publications

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Records } from '../records.js';

Meteor.publish('records.filter', function (filters) {
  check(filters.planned, Boolean);
  check(filters.planted, Boolean);
  check(filters.harvested, Boolean);
  check(filters.place_id, Match.OneOf(String, null));
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

  const query = {
    marketingYear: filters.marketingYear,
    status: { $in: Object.keys(statuses).filter((item) => statuses[item]) },
  };

  if (locationFilter) {
    query.$or = [
      { 'location.administrative_area_level_1': locationFilter },
      { 'location.administrative_area_level_2': locationFilter },
      { 'location.place_id': locationFilter },
    ];
  }

  console.log('query', query);

  return Records.find(query, {
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
