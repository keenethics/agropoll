// All records-related publications

import { Meteor } from 'meteor/meteor';
import { Records } from '../records.js';

Meteor.publish('records.filter', function (filters) {
  console.log(filters);
  const statuses = {
    planned: filters.planned,
    planted: filters.planted,
    harvested: filters.harvested,
  };
  console.log(statuses, Object.keys(statuses).filter((item) => statuses[item]));

  return Records.find({
    marketingYear: filters.marketingYear,

    status: { $in: Object.keys(statuses).filter((item) => statuses[item]) },
  }, { fields: { 'location.place_id': 0 } });
  // Ми повинні віддавати без локаліті (як мінімум без place_id)
});

Meteor.publish('records.user', function () {
  if (!this.userId) {
    throw new Meteor.Error('not-authorized');
  }
  return Records.find({ userId: this.userId });
});
