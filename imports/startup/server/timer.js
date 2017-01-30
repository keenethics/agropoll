// Routine operations

import { Meteor } from 'meteor/meteor';
import { Clusters } from '/imports/api/clusters/clusters.js';
import { Records } from '/imports/api/records/records.js';
import { PseudoRecords } from '/imports/api/pseudoRecords/pseudoRecords.js';

Meteor.startup(() => {
  Meteor.setInterval(() => {
    console.log();
    console.log('---', (Date.now() / 1000).toFixed(0), '---');

    Records.find().fetch().forEach((record) => {
      const farmlandArea = Records.find({
        userId: record.userId,
        year: record.year,
      }).fetch().reduce((sum, item) => sum + Number(item.square), 0);

      const type = Meteor.users.findOne({ _id: record.userId }).profile.type;
      console.log('-->', type);

      Records.update(record._id, { $set: { farmlandArea/*, usersCount */, type } });
    });

    PseudoRecords.remove({});

    Clusters.find().fetch().forEach((cluster) => {
      console.log('records:', Records.find(JSON.parse(cluster.conditions)).fetch().length, '| conditions =', cluster.conditions);

      Records.find(JSON.parse(cluster.conditions)).fetch().forEach((record) => {

        const usersCount = Meteor.wrapAsync((callback) =>
          Records.rawCollection().distinct('userId', {
            year: record.year,
            // For the same cluster!!!!!!!!!!!!!
            ...JSON.parse(cluster.conditions)
          }, callback)
        )().length;

        const totalSquare = Records.find({
          year: record.year,
          ...JSON.parse(cluster.conditions)
        }).fetch().reduce((sum, item) => sum + item.square, 0);

        const pseudoRecord = {
          // _id: record._id,
          location: record.location,
          year: record.year,
          cropYield: record.cropYield,
          cropId: record.cropId,
          square: cluster.farmersCount && record.square * cluster.farmersCount / usersCount ||
            cluster.totalArea && record.square * cluster.totalArea / totalSquare || 0,
          status: record.status,
          // sort: record.sort,
          // reproduction: record.reproduction,
          cluster: cluster._id,
        };
        if (record.sort) pseudoRecord.sort = record.sort;
        if (record.reproduction) pseudoRecord.reproduction = record.reproduction;

        PseudoRecords.insert(pseudoRecord);

        if (cluster.farmersCount) console.log(`  [${record.year}]`, '<farmersCount>', record.square, 'x (', cluster.farmersCount, '/', usersCount, ') =>', pseudoRecord.square);
        if (cluster.totalArea) console.log(`  [${record.year}]`, '<totalArea>', record.square, 'x (', cluster.totalArea, '/', totalSquare, ') =>', pseudoRecord.square);
      });
    });
  }, 10000);
});
