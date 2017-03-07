// Routine operations
/* global Assets */

import { Meteor } from 'meteor/meteor';
import { Clusters } from '/imports/api/clusters/clusters.js';
import { Records } from '/imports/api/records/records.js';

Meteor.startup(() => {
  Meteor.setInterval(() => {
    const year = JSON.parse(Assets.getText('adminSettings.json')).year; // AdminSettings.findOne().year;
    console.log();
    console.log('---', `YEAR = ${year} & DATE =`, (Date.now() / 1000).toFixed(0), '---');

    // Updating each User to relate him to certain Cluster
    Meteor.users.find().fetch().forEach((user) => {
      const records = Records.find({
        userId: user._id,
        year,
      }).fetch();

      const farmlandArea = records.reduce((sum, record) => sum + Number(record.square), 0);
      // console.log(': farmlandArea =', farmlandArea);

      // Finding total squares for each mentioned in the 'records' region
      const squaresByRegion = [];
      for (const record of records) {
        const current = squaresByRegion.find((item) =>
          item.region === record.location.administrative_area_level_1
        );
        if (current) {
          // The 'current' is related to the 'squaresByRegion' object,
          // so the squares will be applied to it
          current.square += record.square;
        } else {
          // Create the new region-related element
          squaresByRegion.push({
            region: record.location.administrative_area_level_1,
            square: record.square
          });
        }
      }
      console.log(': user =', user.emails[0].address, ': farmlandArea =', farmlandArea, ': squaresByRegion =', squaresByRegion.sort((a, b) => -a.square + b.square));
      // console.log(': squaresByRegion =', squaresByRegion.sort((a, b) => -a.square + b.square));
      const mainRegionSquare = squaresByRegion.sort((a, b) => -a.square + b.square)[0] || { region: null };
      Meteor.users.update(user._id, { $set: {
        'profile.farmlandArea': farmlandArea,
        'profile.mainRegion': mainRegionSquare.region,
      } });


    });


    /*
    // Updating each Record to relate it to a Cluster
    Records.find().fetch().forEach((record) => {
      const farmlandArea = Records.find({
        userId: record.userId,
        year: record.year,
      }).fetch().reduce((sum, item) => sum + Number(item.square), 0);

      const type = Meteor.users.findOne({ _id: record.userId }).profile.type;

      Records.update(record._id, { $set: { farmlandArea, type } });
      // Sake of untracked clasters can be updated with squareNorm to 0
      if (farmlandArea === 0) {
        Records.update(record._id, { $set: { squareNorm: 0 } });
      }
    });
    */



    // Passing over all Clusters
    Clusters.find().fetch().forEach((cluster) => {
      const users = Meteor.users.find(JSON.parse(cluster.conditions)).fetch();
      // users
    });




    // OLD-->
    Clusters.find().fetch().forEach((cluster) => {
      console.log('records:', Records.find(JSON.parse(cluster.conditions)).fetch().length, '| conditions =', cluster.conditions);

      // Passing over each Record to find the appropriate Normalized Sqare
      Records.find(JSON.parse(cluster.conditions)).fetch().forEach((record) => {
        const usersCount = Meteor.wrapAsync((callback) =>
          Records.rawCollection().distinct('userId', {
            // For the same year ...
            year: record.year,
            // ... & for the same cluster!!
            ...JSON.parse(cluster.conditions)
          }, callback)
        )().length;

        const totalSquare = Records.find({
          year: record.year,
          ...JSON.parse(cluster.conditions)
        }).fetch().reduce((sum, item) => sum + item.square, 0);

        const squareNorm = cluster.totalArea && totalSquare &&
          record.square * cluster.totalArea / totalSquare ||
          0;

        Records.update(record._id, { $set: {
          squareNorm,
          squaresRatio: totalSquare / cluster.totalArea,
          usersCount
        } });

        // Clusters.update(cluster._id, { $set: {
        //   squaresRatio: { [record.year]: totalSquare / cluster.totalArea },
        //   usersCount: { [record.year]: usersCount },
        // } });

        console.log(`  [${record.year}] [${usersCount} user(s)] ( ${cluster.totalArea}/${totalSquare} га ) x ${record.square} => ${squareNorm}`);
      });
    });
  }, 60000);
});
