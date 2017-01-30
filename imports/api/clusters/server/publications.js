// All clusters-related publications

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Clusters } from '../clusters.js';

/*
Meteor.publish('clusters.filter', function (filters) {
  check(filters, {
    planned: Boolean,
    planted: Boolean,
    harvested: Boolean,
    place_id: Match.OneOf(String, null),
    administrative_area_level_1: Match.OneOf(String, null),
    administrative_area_level_2: Match.OneOf(String, null),
    year: String,
  });

  const statuses = {
    planned: filters.planned,
    planted: filters.planted,
    harvested: filters.harvested,
  };

  const locationFilter = filters.place_id || filters.administrative_area_level_2 || filters.administrative_area_level_1;

  const query = {
    year: filters.year,
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

  return Clusters.find(query, {
    fields: {
      'location.place_id': 0,
      userId: 0,
    }
  });
  // Ми повинні віддавати без локаліті (як мінімум без place_id)
});

Meteor.publish('clusters.user', function () {
  if (!this.userId) {
    throw new Meteor.Error('not-authorized');
  }
  return Clusters.find({ userId: this.userId }, { userId: 0 });
});
*/
