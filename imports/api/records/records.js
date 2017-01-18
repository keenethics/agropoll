// Definition of the records collection

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Records = new Mongo.Collection('records');

const updateTotalSquare = ({ userId, marketingYear }) => {
  const findQuery = {
    userId,
    marketingYear,
  };
  const recordCursor = Records.find(findQuery);
  let fullArea = 0;
  recordCursor.forEach((val) => {
    fullArea += Number(val.square);
  });
  const replacement = {};
  replacement.$set = {};
  replacement.$set.totalSquare = Meteor.users.findOne(userId).totalSquare || {};
  replacement.$set.totalSquare[marketingYear] = fullArea;
  console.log('replacement', replacement);

  const options = {
    upsert: true,
  };
  Meteor.users.update(userId, replacement, options);
};

Records.after.update((userId, { marketingYear }) => {
  updateTotalSquare({ userId, marketingYear });
});

Records.after.remove((userId, { marketingYear }) => {
  updateTotalSquare({ userId, marketingYear });
});
