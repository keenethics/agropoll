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

  Groups.remove({});
  const groups = Assets.getText('groups.csv').split('\n').filter((item) => item).map((item) => item.split(','));
  groups.forEach((group) => Groups.insert({
    id: Number(group[0]),
    'name-ua': group[1],
    'name-en': group[2],
  }));

  Crops.remove({});
  const crops = Assets.getText('crops.csv').split('\n').filter((item) => item).map((item) => item.split(','));
  crops.forEach((crop) => {
    const cropObj = {
      id: Number(crop[0]),
      'name-ua': crop[2],
      'name-en': crop[3],
      groupId: Number(crop[1]),
      avgCropYield: Number(crop[4]),
    };

    cropObj.squares = {};
    regions.forEach((regionId, i) => {
      cropObj.squares[regionId] = Number(crop[5 + i]);
    });

    Crops.insert(cropObj);
  });

  Clusters.remove({});
  const clusters = [
    { name: 'others', conditions: '{ "$or": [ { "profile.type": "other" }, { "profile.farmlandArea": 0 } ] }', totalArea: 0 }, // Technical condition to nulify Others && empty fields

    { name: 'enterprises (Polissia)', conditions: '{ "profile.type": "enterprise", "profile.farmlandArea": { "$gt": 0 }, "profile.mainRegion": { "$in": [ "ChIJBYI5hgM0JEcRQED2iIQGAQE", "ChIJC9KIyxTxK0cRoED2iIQGAQE", "ChIJDQKKqwsTOUcRLtC2-ZaZ5Fk", "ChIJHTiwNGzBMEcRn1rIHA4suJc", "ChIJb5xjPmndOkcRYj26h4iMDWM", "ChIJERyljUNML0cRIED2iIQGAQE", "ChIJT7SGL2DAKkERMEH2iIQGAQE" ] } }', totalArea: 2575377 },
    { name: 'enterprises (Forest steppe)', conditions: '{ "profile.type": "enterprise", "profile.farmlandArea": { "$gt": 0 }, "profile.mainRegion": { "$in": [ "ChIJiy6tDP5UzUARsED2iIQGAQE", "ChIJ94pF_F3O1EARB10ge68K4KY", "ChIJ5cdqFjh110ARcEH2iIQGAQE", "ChIJYaRz_CACKUER0KUajIxyN1A", "ChIJZdKe1ltLMEcRUED2iIQGAQE", "ChIJAfZeLutYJ0ERoEH2iIQGAQE", "ChIJtbpfwCz5LUcRkED2iIQGAQE", "ChIJg26lOnZL0UARiu-AtokbRyg", "ChIJH2F-TOwINEcR3I8UhwBnFyw" ] } }', totalArea: 8109430 },
    { name: 'enterprises (Steppe)', conditions: '{ "profile.type": "enterprise", "profile.farmlandArea": { "$gt": 0 }, "profile.mainRegion": { "$in": [ "ChIJoevoYl_c20ARlxgBvjfDzlk", "ChIJe9U9ohib30ARJEyiBAomT7o", "ChIJ0U8jLBVn3EARjGp5k7-Oh-E", "ChIJ_Y7vgK9C0EARlBkNFDXFp9g", "ChIJ8zUQQaAY4EARuDtkU2fs3IQ", "ChIJydRVsbqaxUARLq1R8Q3RgpM", "ChIJaRSOmoExxkARxdd-tWjwax8", "ChIJh1TvTkORw0ARQEH2iIQGAQE" ] } }', totalArea: 8021611 },

    { name: 'households (Polissia)', conditions: '{ "profile.type": "household", "profile.farmlandArea": { "$gt": 0 }, "profile.mainRegion": { "$in": [ "ChIJBYI5hgM0JEcRQED2iIQGAQE", "ChIJC9KIyxTxK0cRoED2iIQGAQE", "ChIJDQKKqwsTOUcRLtC2-ZaZ5Fk", "ChIJHTiwNGzBMEcRn1rIHA4suJc", "ChIJb5xjPmndOkcRYj26h4iMDWM", "ChIJERyljUNML0cRIED2iIQGAQE", "ChIJT7SGL2DAKkERMEH2iIQGAQE" ] } }', totalArea: 3972.1e3 },
    { name: 'households (Forest steppe)', conditions: '{ "profile.type": "household", "profile.farmlandArea": { "$gt": 0 }, "profile.mainRegion": { "$in": [ "ChIJiy6tDP5UzUARsED2iIQGAQE", "ChIJ94pF_F3O1EARB10ge68K4KY", "ChIJ5cdqFjh110ARcEH2iIQGAQE", "ChIJYaRz_CACKUER0KUajIxyN1A", "ChIJZdKe1ltLMEcRUED2iIQGAQE", "ChIJAfZeLutYJ0ERoEH2iIQGAQE", "ChIJtbpfwCz5LUcRkED2iIQGAQE", "ChIJg26lOnZL0UARiu-AtokbRyg", "ChIJH2F-TOwINEcR3I8UhwBnFyw" ] } }', totalArea: 4739.1e3 },
    { name: 'households (Steppe)', conditions: '{ "profile.type": "household", "profile.farmlandArea": { "$gt": 0 }, "profile.mainRegion": { "$in": [ "ChIJoevoYl_c20ARlxgBvjfDzlk", "ChIJe9U9ohib30ARJEyiBAomT7o", "ChIJ0U8jLBVn3EARjGp5k7-Oh-E", "ChIJ_Y7vgK9C0EARlBkNFDXFp9g", "ChIJ8zUQQaAY4EARuDtkU2fs3IQ", "ChIJydRVsbqaxUARLq1R8Q3RgpM", "ChIJaRSOmoExxkARxdd-tWjwax8", "ChIJh1TvTkORw0ARQEH2iIQGAQE" ] } }', totalArea: 6321e3 },
  ];
  clusters.forEach((cluster) => Clusters.insert({
    name: cluster.name,
    conditions: cluster.conditions,
    farmersCount: cluster.farmersCount,
    totalArea: cluster.totalArea,
  }));
});
