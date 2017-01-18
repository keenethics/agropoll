// Routine operations

import { Meteor } from 'meteor/meteor';
import { Clusters } from '/imports/api/clusters/clusters.js';
import { Records } from '/imports/api/records/records.js';
import { PseudoRecords } from '/imports/api/pseudoRecords/pseudoRecords.js';

Meteor.startup(() => {
  Meteor.setInterval(() => {
    console.log('---', Date.now(), '---');

    Records.find().fetch().forEach((record) => {
      const farmlandArea = Records.find({
        userId: record.userId,
        marketingYear: record.marketingYear,
      }).fetch().reduce((sum, item) => sum + Number(item.square), 0);

      const usersCount = Meteor.wrapAsync((callback) =>
        Records.rawCollection().distinct('userId', { marketingYear: record.marketingYear }, callback)
      )().length;

      Records.update(record._id, { $set: { farmlandArea, usersCount } });
    });

    PseudoRecords.remove({});
    Clusters.find().fetch().forEach((cluster) => {
      console.log('query:::', cluster.conditions,
        Records.find(JSON.parse(cluster.conditions)).fetch().length
      );

      Records.find(JSON.parse(cluster.conditions)).fetch().forEach((record) => {
        const pseudoRecord = {
          // _id: record._id,
          location: record.location,
          marketingYear: record.marketingYear,
          cropCapacity: record.cropCapacity,
          cropId: record.cropId,
          square: record.square * cluster.farmersCount / record.usersCount,
          status: record.status,
          // sort: record.sort,
          // reproduction: record.reproduction,
          cluster: cluster._id,
        };
        if (record.sort) pseudoRecord.sort = record.sort;
        if (record.reproduction) pseudoRecord.reproduction = record.reproduction;

        PseudoRecords.insert(pseudoRecord);

        console.log(`[${record.marketingYear}]`, record.square, '* (', cluster.farmersCount, '/', record.usersCount, ') =>', pseudoRecord.square);
      });
    });
  }, 10000);
});
