import React from 'react'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autocomplete: {},
    }

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
    console.log(this.state.selectedPlace);
    Meteor.call('localities.addPlace', this.state.selectedPlace);
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
      </div>
    )
  }
}
