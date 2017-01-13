import React from 'react';
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
      seekingLocation: false,
    };

    this.submitPlace = this.submitPlace.bind(this);
    this.getFullAddress = this.getFullAddress.bind(this);
    this.initGoogleAutocomplete = this.initGoogleAutocomplete.bind(this);
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    this.change();
    this.inputCountry = this.refs.inputCountry;
    const autocomplete = this.initGoogleAutocomplete(this.inputCountry, {
      types: ['(regions)'],
      componentRestrictions: { country: 'ua' }
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      this.setState({ selectedPlace: place });
    });

  //  this.setState({ autocomplete });
  }

  getFullAddress() {
    const place = this.state.selectedPlace;
    let fullAddress = place.formatted_address.substr(0, (place.formatted_address.lastIndexOf(',') === -1 ? place.formatted_address.length : place.formatted_address.lastIndexOf(',')));

    if (place.address_components.length === 4 &&
      !place.address_components[1].long_name.includes('міськрада') &&
      !place.address_components[1].long_name.includes('місто')
    ) {
      const positionOfComa = fullAddress.indexOf(',');
      fullAddress = [
        fullAddress.slice(0, positionOfComa),
        ', ',
        place.address_components[1].long_name,
        fullAddress.slice(positionOfComa)
      ].join('');
    }
    return fullAddress;
  }

  submitPlace(e) {
    if (!this.refs.inputCountry.value) {
      return;
    }
    if (e.charCode !== 13) {
      return;
    }
    this.props.actions.startSpinner();
    if (this.state.selectedPlace) {
      Meteor.call('localities.addPlace', this.state.selectedPlace, (err, res) => {
        if (!err) {
          this.props.actions.hideSpinner();
        } else {
           console.log(err.reason);
        }
      });
      const fullAddress = this.getFullAddress();

      localStorage.setItem('place_id', this.state.selectedPlace.place_id);
      localStorage.setItem('placeType', this.state.selectedPlace.types[0]);
      localStorage.setItem('fullAddress', fullAddress);

      this.props.actions.selectPlace(this.state.selectedPlace, fullAddress);
    }
  }

  initGoogleAutocomplete(input, options) {
    return new google.maps.places.Autocomplete(input, options);
  }

  change() {}
  render() {
    return (
      <div className="searchBar-wrapper">
        <input
          className="input-country"
          ref="inputCountry"
          type="text"
          placeholder="Country..."
          onKeyPress={this.submitPlace}
          onChange={this.change}
        />
        <div className="search-icon-div cursor-pointer">
          <i className="search-icon" onClick={this.submitPlace}> &nbsp; </i>
        </div>
        {/* <button ref="selectButton" className="select-button" onClick={this.submitPlace}>
          Select
        </button> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

const mapStateToProps = (state) => ({ insertPage: state.insertPage });

const containter = createContainer(({ params }) => {
  const user = Meteor.user();

  return {
    user,
  };
}, SearchBar);

export default connect(mapStateToProps, mapDispatchToProps)(containter);
