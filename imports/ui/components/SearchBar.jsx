import React from 'react'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autocomplete: {},
    }
    this.setFullAddress = this.setFullAddress.bind(this);
    this.submitPlace = this.submitPlace.bind(this);
    this.initGoogleAutocomplete = this.initGoogleAutocomplete.bind(this);
  }

  componentDidMount() {
    this.inputCountry =  this.refs.inputCountry;
    //localStorage.getItem("placeId")
    //localStorage.getItem("placeType")
    // const fullAddress = localStorage.getItem("fullAddress");
    // this.setState({ fullAddress })
    const autocomplete =
      this.initGoogleAutocomplete(
        this.inputCountry,
        {
          types: ['(regions)'],
          componentRestrictions: {country: "ua"}
        }
      );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      console.log(place);
      this.setState({ selectedPlace: place })
      localStorage.setItem("placeId", place.place_id)
      localStorage.setItem("placeType", place.types[0])
    });

    this.setState({ autocomplete })
  }

  initGoogleAutocomplete(input, options) {
    return new google.maps.places.Autocomplete(input, options);
  }

  submitPlace() {
    if (this.state.selectedPlace) {
      Meteor.call('localities.addPlace', this.state.selectedPlace);
      const fullAddress = this.setFullAddress();
      this.props.selectPlace({ place: this.state.selectedPlace, fullAddress });
      console.log(this.state);
    }
  }

  setFullAddress() {
    const place = this.state.selectedPlace;
    var fullAddress = place.formatted_address.substr(0, place.formatted_address.lastIndexOf(','));

    if (place.address_components.length === 4 &&
      !place.address_components[1].long_name.includes('міськрада') &&
      !place.address_components[1].long_name.includes('місто')) {
        const positionOfComa = fullAddress.indexOf(',');
        fullAddress = [
          fullAddress.slice(0, positionOfComa),
          ", ",
          place.address_components[1].long_name,
          fullAddress.slice(positionOfComa)
        ].join('');
    }
    //localStorage.setItem('fullAddress', fullAddress);
    //this.setState({ fullAddress });
    return fullAddress;
  }

  render() {
    return (
      <div className="SearchBar-wrapper">
        <h3>Country:</h3>
        <input className="input input-country"
          ref="inputCountry"
          type="text"
          placeholder="Country..." />
        <button onClick={ this.submitPlace }>Select</button>
      </div>
    )
  }
}

export default createContainer(({ params }) => {
  const user = Meteor.user();

  return {
    user,
  }
}, SearchBar)
