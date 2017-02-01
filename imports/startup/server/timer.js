// Routine operations

import { Meteor } from 'meteor/meteor';
import { Clusters } from '/imports/api/clusters/clusters.js';
import { Records } from '/imports/api/records/records.js';

Meteor.startup(() => {
  Meteor.setInterval(() => {
    console.log();
    console.log('---', (Date.now() / 1000).toFixed(0), '---');

    // Updating each Record to relate it to a Cluster
    Records.find().fetch().forEach((record) => {
      const farmlandArea = Records.find({
        userId: record.userId,
        year: record.year,
      }).fetch().reduce((sum, item) => sum + Number(item.square), 0);

      const type = Meteor.users.findOne({ _id: record.userId }).profile.type;

      Records.update(record._id, { $set: { farmlandArea, type } });
    });

    // Passing over all Clusters
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

        const squareNorm = cluster.farmersCount &&
          record.square * cluster.farmersCount / usersCount ||
          cluster.totalArea &&
          record.square * cluster.totalArea / totalSquare ||
          0;

        Records.update(record._id, { $set: { squareNorm } });

        console.log(`  [${record.year}] ( ${cluster.farmersCount} / ${usersCount} шт || ${cluster.totalArea} / ${totalSquare} га ) x ${record.square} => ${squareNorm}`);
      });
    });
  }, 10000);
});
