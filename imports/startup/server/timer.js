// Routine operations

import { Meteor } from 'meteor/meteor';
import { Clusters } from '/imports/api/clusters/clusters.js';
import { Records } from '/imports/api/records/records.js';
import { PseudoRecords } from '/imports/api/pseudoRecords/pseudoRecords.js';

Meteor.startup(() => {
  Meteor.setInterval(() => {
    console.log();
    console.log('---', Date.now(), '---');

    Records.find().fetch().forEach((record) => {
      const farmlandArea = Records.find({
        userId: record.userId,
        year: record.year,
      }).fetch().reduce((sum, item) => sum + Number(item.square), 0);

      // const usersCount = Meteor.wrapAsync((callback) =>
      //   Records.rawCollection().distinct('userId', {
      //     year: record.year,
      //     // for the same cluster!!!!!!!!!!!!!
      //   }, callback)
      // )().length;

      Records.update(record._id, { $set: { farmlandArea/*, usersCount */ } });
    });

    PseudoRecords.remove({});

    Clusters.find().fetch().forEach((cluster) => {
      console.log('records:', Records.find(JSON.parse(cluster.conditions)).fetch().length, '| conditions =', cluster.conditions);



      Records.find(JSON.parse(cluster.conditions)).fetch().forEach((record) => {

        // -->
        // console.log('{...} -->');
        // console.log({
        //   year: record.year,
        //   // For the same cluster!!!!!!!!!!!!!
        //   ...JSON.parse(cluster.conditions)
        // });
        const usersCount = Meteor.wrapAsync((callback) =>
          Records.rawCollection().distinct('userId', {
            year: record.year,
            // For the same cluster!!!!!!!!!!!!!
            ...JSON.parse(cluster.conditions)
          }, callback)
        )().length;
        // <--

        const pseudoRecord = {
          // _id: record._id,
          location: record.location,
          year: record.year,
          cropYield: record.cropYield,
          cropId: record.cropId,
          square: record.square * cluster.farmersCount / /*record.*/usersCount,
          status: record.status,
          // sort: record.sort,
          // reproduction: record.reproduction,
          cluster: cluster._id,
        };
        if (record.sort) pseudoRecord.sort = record.sort;
        if (record.reproduction) pseudoRecord.reproduction = record.reproduction;

        PseudoRecords.insert(pseudoRecord);

        console.log(`  [${record.year}]`, record.square, '* (', cluster.farmersCount, '/', /*record.*/usersCount, ') =>', pseudoRecord.square);
      });
    });
  }, 10000);
});
