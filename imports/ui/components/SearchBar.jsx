import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import  Select from 'react-select';

import 'react-select/dist/react-select.css';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autocomplete: {},
      places:[],
      selectedPlace:{},
      data: [],
    }

    this.submitPlace = this.submitPlace.bind(this);
    this.selectPlace = this.selectPlace.bind(this);
    this.getGoogleData = this.getGoogleData.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.initGoogleAutocomplete = this.initGoogleAutocomplete.bind(this);
  }

  componentDidMount() {
    this.inputCountry =  this.refs.inputCountry;
    var autocomplete =
      this.initGoogleAutocomplete(
        this.inputCountry,
        {
          types: ['(cities)'],
          componentRestrictions: {country: "ua"}
        }
      )

    autocomplete.addListener('place_changed', () => {
      console.log(autocomplete.getPlace());
      this.setState({selectedPlace: autocomplete.getPlace()})
    });

    this.geocoder = new google.maps.Geocoder;
    this.setState({ autocomplete })
    this.renderOptions();
  }

  initGoogleAutocomplete(input, options) {
    return new google.maps.places.Autocomplete(input, options);
  }

  submitPlace() {
    Meteor.call('localities.addPlace', this.state.selectPlace);
  }

  getGoogleData() {
    var input = this.refs.selectPlace.getInputValue();
    var service = new google.maps.places.AutocompleteService();

    if (input)
      service.getPlacePredictions(
      { input,
        types:['(regions)'],
        componentRestrictions: {country: "ua"}
      },
      (predictions, status) => {
        var count = [];

        if(predictions)
          predictions.forEach( (prediction) => {
            count.push(prediction)
          })

        this.setState({places: count});
        console.log ( this.state.places)
      });
  }

  selectPlace(country, e) {
    this.setState({value:country.description})
    this.setState({selectedPlace:country})

    this.geocoder.geocode({placeId:country.place_id}, (res) => {
      console.log("geocode");
      console.log(res);
    })
  }

  renderOptions() {
    return this.state.places.map( (item) => {
      return <option key={item.id} >{item.description}</option>
    })
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
        <h2>Select a country</h2>
        <Select
          name="form-field-name"
          ref="selectPlace"
          value={this.state.value}
          valueKey="description"
          labelKey="description"
          options={this.state.places}
          onChange={this.selectPlace}
          onInputChange={this.getGoogleData}
        />
      </div>
    )
  }
}
