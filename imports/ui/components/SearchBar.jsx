import React from 'react'
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { bindActionCreators } from 'redux';

import * as actions from '/imports/ui/actions/InsertPageActions.js';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autocomplete: {},
    }
    this.submitPlace = this.submitPlace.bind(this);
    this.getFullAddress = this.getFullAddress.bind(this);
    this.initGoogleAutocomplete = this.initGoogleAutocomplete.bind(this);
  }

  componentDidMount() {
    this.inputCountry =  this.refs.inputCountry;
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
    });

    this.setState({ autocomplete })
  }

  initGoogleAutocomplete(input, options) {
    return new google.maps.places.Autocomplete(input, options);
  }

  submitPlace() {
    if (this.state.selectedPlace) {
      Meteor.call('localities.addPlace', this.state.selectedPlace);
      const fullAddress = this.getFullAddress();
      localStorage.setItem('placeId', this.state.selectedPlace.place_id);
      localStorage.setItem('placeType', this.state.selectedPlace.types[0]);
      localStorage.setItem('fullAddress', fullAddress);
      this.props.actions.selectPlace(this.state.selectedPlace, fullAddress);
    }
  }

  getFullAddress() {
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
    return fullAddress;
  }

  render() {
    return (
      <div className="searchBar-wrapper">
        <h3>Place:</h3>
        <input className="input-country"
          ref="inputCountry"
          type="text"
          placeholder="Country..." />
        <button onClick={ this.submitPlace }>Select</button>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
   return {actions: bindActionCreators(actions, dispatch)};
}

const mapStateToProps = (state) => {
  return { insertPage: state.insertPage }
};

const SearchBarConstainer = createContainer(({ params }) => {
  const user = Meteor.user();

  return {
    user,
  }
}, SearchBar)

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarConstainer);
