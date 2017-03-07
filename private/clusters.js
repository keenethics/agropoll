const clusters = [
  { conditions: '{ "profile.type": "other" }', totalArea: 0 }, // Technical condition to nulify Others
  { conditions: '{ "profile.type": "enterprise", "profile.farmlandArea": { "$gt": 0, "$lte": 100 } }', totalArea: 4000 },
  { conditions: '{ "profile.type": "enterprise", "profile.farmlandArea": { "$gt": 100 } }', totalArea: 2000 },
  { conditions: '{ "profile.type": "household", "profile.farmlandArea": { "$gt": 0 } }', totalArea: 3000 },
];
