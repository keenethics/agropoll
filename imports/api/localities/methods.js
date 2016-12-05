import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';
import { Localities } from './localities.js';

Meteor.methods({
  'localities.addPlace'(place){
    var fullAddress = place.formatted_address;

    if (place.address_components.length === 4 &&
      place.address_components[1].long_name.indexOf('міськрада') === -1 &&
      place.address_components[1].long_name.indexOf('місто') === -1){
        let positionOfComa = fullAddress.indexOf(',');
      fullAddress = [
        fullAddress.slice(0, positionOfComa),
        ", ",
        place.address_components[1].long_name,
        fullAddress.slice(positionOfComa)
      ].join('');
    }

    var locality = {
      type: place.address_components[0].types[0],
      name: place.name,
      placeId: place.place_id,
      fullAddress
    }

    Localities.insert(locality);
    console.log('----');
    console.log(locality);

  }
})
