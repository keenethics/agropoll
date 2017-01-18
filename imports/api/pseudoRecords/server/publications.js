// All pseudoRecords-related publications

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { PseudoRecords } from '../pseudoRecords.js';

Meteor.publish('pseudoRecords.filter', function (filters) {
  check(filters, {
    planned: Boolean,
    planted: Boolean,
    harvested: Boolean,
    place_id: Match.OneOf(String, null),
    administrative_area_level_1: Match.OneOf(String, null),
    administrative_area_level_2: Match.OneOf(String, null),
    marketingYear: String,
  });

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

  return PseudoRecords.find(query, {
    fields: {
      'location.place_id': 0,
      userId: 0,
    }
  });
  // Ми повинні віддавати без локаліті (як мінімум без place_id)
});

Meteor.publish('pseudoRecords.user', function () {
  if (!this.userId) {
    throw new Meteor.Error('not-authorized');
  }
  return PseudoRecords.find({ userId: this.userId }, { userId: 0 });
});
