import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'
// import { check } from 'meteor/check';
import { Localities } from './localities.js';

Meteor.methods({
  'localities.addPlace'(place){
    // removing ', Україна'
    var fullAddress = place.formatted_address.substr(0, place.formatted_address.lastIndexOf(','));
    var locality = Localities.findOne({
      place_id: place.place_id
    })

    if (place.address_components.length === 4 &&
      !place.address_components[1].long_name.includes('міськрада') &&
      !place.address_components[1].long_name.includes('місто')){
        let positionOfComa = fullAddress.indexOf(',');
        fullAddress = [
          fullAddress.slice(0, positionOfComa),
          ", ",
          place.address_components[1].long_name,
          fullAddress.slice(positionOfComa)
        ].join('');
    }

    if(!locality){
      const addressComponents = place.address_components;
      const type = place.types[0];
      /* Remove place and country from addressComponents */
      addressComponents.shift();
      addressComponents.pop();

      locality = {
        type,
        name: place.name,
        place_id: place.place_id,
        fullAddress
      }

      if (addressComponents.length > 0){
        var parentId = getParent(addressComponents, 0)
        locality.parentId = parentId;
      }

      Localities.insert(locality);
    }
  }
})

function getPlace(address){
  const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
  const key = 'key=AIzaSyA_T9PkPMXTRoTBhlX5awCWurylQ2B-QaE';
  const language = 'language=uk&';
  var address = 'address=' + address.replace(/ /g , '+') + '&';
  const type = 'components=country:UA&';
  const fullUrl = encodeURI(baseUrl + address + type + language + key);
  var response;
  var content;

  response = Meteor.wrapAsync( (fullUrl, callback) => {
    console.log('Google maps request');
    return HTTP.call('GET', fullUrl, callback)
  })(fullUrl)

  console.log('END of request');
  content = JSON.parse(response.content);
  return content.results[0];
}

function getParent(addressComponents, i) {
  const name = addressComponents[i].long_name;
  var place_id;
  var parentId;
  var locality;

  if (!name.includes('міськрада') && !name.includes('місто')) {
    const parentPlace = getPlace(name);
    const dbParentPlace = Localities.findOne({ place_id: parentPlace.place_id })

    if (!dbParentPlace){
      const fullAddress = parentPlace.formatted_address.substr(0, parentPlace.formatted_address.lastIndexOf(','));

      locality = {
        type: parentPlace.types[0],
        name: parentPlace.address_components[0].long_name,
        place_id: parentPlace.place_id,
        parentId: null,
        fullAddress,
      }

      place_id = locality.place_id;

      if(addressComponents.length - 1 > i){
        parentId = getParent(addressComponents, ++i);
        locality.parentId = parentId;
      }
      Localities.insert(locality);
    } else {
      place_id = dbParentPlace.place_id;
    }
  } else if(addressComponents.length - 1 > i) {
    place_id = getParent(addressComponents, ++i)
  }
  return place_id;
}
