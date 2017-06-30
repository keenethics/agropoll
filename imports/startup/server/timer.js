// Routine operations
/* global Assets */

import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import { Clusters } from '/imports/api/clusters/clusters.js';
import { Records } from '/imports/api/records/records.js';

Meteor.startup(() => {
  Meteor.setInterval(() => {
    const year = JSON.parse(Assets.getText('adminSettings.json')).year;
    console.log();
    console.log('⋘', ` YEAR = ${year} & DATE =`, (Date.now() / 1000).toFixed(0), '⋙');

    // Updating each User to relate him to certain Cluster FOR THE CURRENT YEAR
    // We don't consider whether user is banned or not yet
    Meteor.users.find().fetch().forEach((user) => {
      const records = Records.find({
        userId: user._id,
        year,
      }).fetch();

      const farmlandArea = records.reduce((sum, record) => sum + +record.square, 0);

      // Finding of where the most significant part of user fields located is
      // 1. Finding total squares for each mentioned in the 'records' region
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
            square: record.square,
          });
        }
      }
      // 2. Finding main region
      const mainRegionSquare = squaresByRegion.sort((a, b) => -a.square + b.square)[0] || { region: null };
      // 3. Updating user's profile
      Meteor.users.update(user._id, { $set: {
        'profile.farmlandArea': farmlandArea,
        'profile.mainRegion': mainRegionSquare.region,
      } });
    });


    // Passing over all Clusters
    Clusters.find().fetch().forEach((cluster) => {
      // All users, related to the cluster over condition except of banned users
      const users = Meteor.users.find({
        ...JSON.parse(cluster.conditions),
        // Filtering out banned users
        roles: { $ne: 'banned' },
      }).fetch();

      // Total square, inputted in the cluster
      const totalSquare = users.reduce((sum, user) =>
        sum + user.profile.farmlandArea,
        0
      );

      // Updating claster parameters this year
      Clusters.update(cluster._id, { $set: {
        usersCount: users.length,
        totalSquare,
      } });

      // Updating Users with cluster
      Meteor.users.update(JSON.parse(cluster.conditions), { $set: {
        'profile.cluster': cluster.name,
      } }, { multi: true });
      console.log('cluster⟶', cluster.name);

      // Updating normalized square in all recods related to the cluster this year
      Meteor.users.find(JSON.parse(cluster.conditions)).fetch().forEach((user) => {
        console.log('├─user⟶', user.profile.name, '☆', user.roles);
        Records.find({
          userId: user._id,
          year, // ??
        }).fetch().forEach((record) => {
          const squareNorm = !Roles.userIsInRole(user._id, 'banned') && totalSquare &&
            record.square * cluster.totalArea / totalSquare || 0;
          console.log('├───squareNorm⟶', record.square, '×', cluster.totalArea, '/', totalSquare, '=', squareNorm);
          Records.update(record._id, { $set: {
            squareNorm,
          } });
        });
      });
    });
  }, 60000);
});
