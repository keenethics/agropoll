// Fill the DB with example data on startup
/* global Assets */

import { Meteor } from 'meteor/meteor';
import { Crops, Groups } from '/imports/api/crops/crops.js';
import { Clusters } from '/imports/api/clusters/clusters.js';

Meteor.startup(() => {
  console.log('App run at', Meteor.absoluteUrl());

  Groups.remove({});
  const groups = Assets.getText('groups.csv').split('\n').filter((item) => item).map((item) => item.split(','));
  console.log('groups =', groups);
  groups.forEach((group) => Groups.insert({
    id: Number(group[0]),
    name: group[1],
  }));

  Crops.remove({});
  const crops = Assets.getText('crops.csv').split('\n').filter((item) => item).map((item) => item.split(','));
  console.log('crops =', crops);
  crops.forEach((crop) => Crops.insert({
    id: Number(crop[0]),
    name: crop[2],
    groupId: Number(crop[1]),
    baseSquare: Number(crop[3]),
    avgCropYield: Number(crop[4]),
  }));

  Clusters.remove({});
  const clusters = [
    { conditions: '{ "type": "other" }', farmersCount: 0 }, // Technical condition to nulify Others
    { conditions: '{ "type": "company", "farmlandArea": { "$gt": 0, "$lte": 100 } }', farmersCount: 1000 },
    { conditions: '{ "type": "company", "farmlandArea": { "$gt": 100 } }', farmersCount: 10 },
    { conditions: '{ "type": "household", "farmlandArea": { "$gt": 0 } }', totalArea: 10000 },
  ];
  clusters.forEach((cluster) => Clusters.insert({
    conditions: cluster.conditions,
    farmersCount: cluster.farmersCount,
    totalArea: cluster.totalArea,
  }));
});
