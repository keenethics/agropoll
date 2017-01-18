// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Clusters } from '/imports/api/clusters/clusters.js';
import { Records } from '/imports/api/records/records.js';
import { PseudoRecords } from '/imports/api/pseudoRecords/pseudoRecords.js';

Meteor.startup(() => {
  // if the Crops collection is empty
  Meteor.setInterval(() => {
    console.log('---', Date.now(), '---');

    // const clusters = [
    //   { conditions: '{ "$and": { "square": { "$lt": 100 } } }', farmersCount: 1000, usersCount: 0 },
    //   { conditions: '{ "$and": { "square": { "$gte": 100 } } }', farmersCount: 10, usersCount: 0 },
    // ];

    // clusters.forEach((cluster) => Clusters.insert({
    //   conditions: cluster.conditions,
    //   farmersCount: cluster.farmersCount,
    //   usersCount: cluster.usersCount,
    // }));

    // Records.find().fetch().map((record) => {
    //
    //   const totalSquare = Meteor.users.findOne(record.userId).totalSquare[record.marketingYear];
    //   console.log(record.marketingYear,'>>>',totalSquare);
    //
    //   return { ...record, ...{ farmlandArea: totalSquare } };
    // });

    Records.find().fetch().forEach((record) => {
      const farmlandArea = Records.find({
        marketingYear: record.marketingYear
      }).fetch().reduce((sum, item) => sum + item.square, 0);

      console.log(record.marketingYear,'farmlandArea--->', farmlandArea);

    });

    // Clusters.find().fetch().forEach((cluster) => {
    //   console.log('query:::', cluster.conditions);
    //
    //   const records = Records.find(JSON.parse(cluster.conditions)).fetch()
    //
    //
    //   console.log('records --', records);
    // });



    // const records = Records.find().fetch().map((item) => {
    //
    // });




  }, 10000);
});
