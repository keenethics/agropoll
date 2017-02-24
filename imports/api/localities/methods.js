import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { check } from 'meteor/check';
import { Localities } from './localities.js';

const apiKey = Meteor.settings.private.GOOGLE_MAPS_API_KEY;

Meteor.methods({
  'localities.addPlace'(place) {
    check(place, Object);
    check(place.name, String);
    check(place.formatted_address, String);
    check(place.place_id, String);
    for (let value of place.address_components) {
      check(value.long_name, String);
    }
    check(place.types[0], String);

    // console.log('place =', place);
    addPlace(place);
  },
});

function getPlace(addr) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
  const key = `key=${apiKey}`;
  const language = 'language=uk&';
  const address = `address=${addr.replace(/ /g, '+')}&`;
  const type = 'components=country:UA&';
  const fullUrl = encodeURI(baseUrl + address + type + language + key);

  const response = Meteor.wrapAsync((fullUrl, callback) => {
    console.log('Google maps request');
    return HTTP.call('GET', fullUrl, callback);
  })(fullUrl);

  console.log('END of request');
  const content = JSON.parse(response.content);
  return content.results[0];
}

function addPlace(place) {
  const parents = place.address_components.filter((item, i) =>
    item.types[0] !== 'administrative_area_level_3' && i
  ).map((item) => item.long_name);
  console.log('parents =', parents);

  if (place.address_components[0].types[0] === 'country') return { place_id: 'none' };

  if (Localities.findOne({ place_id: place.place_id })) return place;

  // Workaround for Google maps API issue with some Ukrainian regions (like Ivano-Frankivsk region)
  const searchAddress = parents.map((item) =>
    (item.includes('область') ? `${item} область` : item)
  ).join('+');

  const locality = {
    place_id: place.place_id,
    name: place.address_components[0].long_name,
    type: place.address_components[0].types[0],
    parentId: addPlace(getPlace(searchAddress)).place_id,
    fullAddress: place.formatted_address,
  };

  console.log('RESULT / locality:', locality);

  Localities.insert(locality);

  return place;
}
