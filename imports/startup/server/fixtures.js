// Fill the DB with example data on startup
/* global Assets */

import { Meteor } from 'meteor/meteor';
import { Crops, Groups } from '/imports/api/crops/crops.js';
import { Clusters } from '/imports/api/clusters/clusters.js';
import { AdminSettings } from '/imports/api/adminSettings/adminSettings.js';

Meteor.startup(() => {
  const adminSettings = JSON.parse(Assets.getText('adminSettings.json'));
  console.log('ADMIN SETTINGS =', adminSettings);

  AdminSettings.remove({});
  AdminSettings.insert({
    year: adminSettings.year,
    baseYear: adminSettings.baseYear,
  });

  const regions = Assets.getText('regions.csv').split('\n').filter((item) => item).map((item) => item.split(',')[1]);
  // console.log('regions', regions);

  Groups.remove({});
  const groups = Assets.getText('groups.csv').split('\n').filter((item) => item).map((item) => item.split(','));
  // console.log('groups =', groups);
  groups.forEach((group) => Groups.insert({
    id: Number(group[0]),
    name: group[1],
  }));

  Crops.remove({});
  const crops = Assets.getText('crops.csv').split('\n').filter((item) => item).map((item) => item.split(','));
  // console.log('crops =', crops);
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
  // const clusters = JSON.parse(Assets.getText('clusters.js'));
  const clusters = [
    { name: 'other', conditions: '{ "$or": [ { "profile.type": "other" }, { "profile.farmlandArea": 0 } ] }', totalArea: 0 }, // Technical condition to nulify Others && empty fields
    { name: 'small enterprises', conditions: '{ "profile.type": "enterprise", "profile.farmlandArea": { "$gt": 0, "$lte": 100 } }', totalArea: 40000 },
    { name: 'large enterprises', conditions: '{ "profile.type": "enterprise", "profile.farmlandArea": { "$gt": 100 } }', totalArea: 20000 },
    { name: 'households', conditions: '{ "profile.type": "household", "profile.farmlandArea": { "$gt": 0 } }', totalArea: 10000 },
  ];
  clusters.forEach((cluster) => Clusters.insert({
    name: cluster.name,
    conditions: cluster.conditions,
    farmersCount: cluster.farmersCount,
    totalArea: cluster.totalArea,
  }));
});
