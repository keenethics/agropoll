// Fill the DB with example data on startup
/* global Assets */

import { Meteor } from 'meteor/meteor';
import { Crops, Groups } from '/imports/api/crops/crops.js';
import { Clusters } from '/imports/api/clusters/clusters.js';

Meteor.startup(() => {
  console.log('App run at', Meteor.absoluteUrl());

  const regions = Assets.getText('regions.csv').split('\n').filter((item) => item).map((item) => item.split(',')[1]);
  console.log('regions', regions);

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
  crops.forEach((crop) => {
    const cropObj = {
      id: Number(crop[0]),
      name: crop[2],
      groupId: Number(crop[1]),
      avgCropYield: Number(crop[3]),
    };

    cropObj.squares = {};
    regions.forEach((regionId, i) => {
      cropObj.squares[regionId] = Number(crop[4 + i]);
    });

    Crops.insert(cropObj);
  });

  Clusters.remove({});
  const clusters = [
    { conditions: '{ "type": "other" }', totalArea: 0 }, // Technical condition to nulify Others
    { conditions: '{ "type": "enterprise", "farmlandArea": { "$gt": 0, "$lte": 100 } }', totalArea: 4000 },
    { conditions: '{ "type": "enterprise", "farmlandArea": { "$gt": 100 } }', totalArea: 2000 },
    { conditions: '{ "type": "household", "farmlandArea": { "$gt": 0 } }', totalArea: 3000 },
  ];
  clusters.forEach((cluster) => Clusters.insert({
    conditions: cluster.conditions,
    farmersCount: cluster.farmersCount,
    totalArea: cluster.totalArea,
  }));
});
