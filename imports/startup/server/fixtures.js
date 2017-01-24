// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Crops, Groups } from '/imports/api/crops/crops.js';
import { Clusters } from '/imports/api/clusters/clusters.js';

Meteor.startup(() => {
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
    avgCropYield: Number(crop[3]),
  }));

  Clusters.remove({});
  const clusters = [
    { conditions: '{ "farmlandArea": { "$lt": 100 } }', farmersCount: 1000 },
    { conditions: '{ "farmlandArea": { "$gte": 100 } }', farmersCount: 10 },
  ];
  clusters.forEach((cluster) => Clusters.insert({
    conditions: cluster.conditions,
    farmersCount: cluster.farmersCount,
    // usersCount: cluster.usersCount,
  }));
});
