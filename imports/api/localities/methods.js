import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';
import { Places } from './places.js';

Meteor.methods({
  'localities.addPlace'(place){
    console.log(place);

  }
})
