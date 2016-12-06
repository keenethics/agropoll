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
    var autocomplete =
      this.initGoogleAutocomplete(
        this.inputCountry,
        {
          types: ['(regions)'],
          componentRestrictions: {country: "ua"}
        }
      )

    autocomplete.addListener('place_changed', () => {
      console.log(autocomplete.getPlace());
      this.setState({selectedPlace: autocomplete.getPlace()})
    });

    this.setState({ autocomplete })
  }

  initGoogleAutocomplete(input, options) {
    return new google.maps.places.Autocomplete(input, options);
  }

  submitPlace() {
    Meteor.call('localities.addPlace', this.state.selectedPlace);
    this.setFullAddress();
    console.log(this.state);
  }

  setFullAddress() {
    const place  = this.state.selectedPlace;
    var fullAddress = place.formatted_address.substr(0, place.formatted_address.lastIndexOf(','));

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
    this.setState({fullAddress})
  }

  render() {
    return (
      <div className="SearchBar-wrapper">
        <h3>Country:</h3>
        <input className="input input-country"
          ref="inputCountry"
          type="text"
          placeholder="Country..."/>
        <button onClick={this.submitPlace}>Select</button>
        <span>{this.state.fullAddress}</span>
      </div>
    )
  }
}

export default createContainer (( {params} ) => {
  const user = Meteor.user();

  return {
    user
  }
}, SearchBar)
