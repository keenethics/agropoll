import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
// import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '/imports/ui/actions/InsertPageActions.js';

import { Records } from '/imports/api/records/records.js';
import { Localities } from '/imports/api/localities/localities.js';
import { Crops, Groups } from '/imports/api/crops/crops.js';

import SearchBar from '/imports/ui/components/InsertPage/SearchBar.jsx';
import LocationPin from '/imports/ui/components/InsertPage/LocationPin.jsx';
import TableInsert from '/imports/ui/components/InsertTable/TableInsert.jsx';
import YearSelector from '/imports/ui/components/YearSelector.jsx';

class InsertPage extends React.Component {
  constructor(props) {
    super(props);

    this.goToPin = this.goToPin.bind(this);
    this.renderPins = this.renderPins.bind(this);
    this.saveCropData = this.saveCropData.bind(this);
  }

  saveCropData() {
    this.props.actions.saveData();
  }

  goToPin(locationId) {
    const fullAddress = this.props.localities.find(
      (locality) => locality.place_id === locationId
    ).fullAddress;

    localStorage.setItem('place_id', locationId);
    localStorage.setItem('placeType', Localities.findOne({ place_id: locationId }).type);
    localStorage.setItem('fullAddress', fullAddress);

    this.props.actions.goToPin(locationId, fullAddress, true);
  }

  renderPins() {
    const places_id = this.props.user.profile && this.props.user.profile.locations || [];
    return places_id && places_id.map((place_id) => {
      if (this.props.localities.length) {
        const fullAddress = this.props.localities.find(
          (locality) => locality.place_id === place_id
        ) && this.props.localities.find(
          (locality) => locality.place_id === place_id
        ).fullAddress;
        return (
          <span key={place_id} className={this.props.insertPage.place_id === place_id ? 'locationPin  selected' : 'locationPin '} onClick={() => this.goToPin(place_id)}>
            <LocationPin fullAddress={fullAddress} />
          </span>
        );
      }
    });
  }

  render() {
    console.log(this.props.records);

    if (Meteor.user()) {
      const place_id = this.props.insertPage.place_id;
      const place = Localities.findOne({ place_id });
      const marketingYear = this.props.all.marketingYear;
      if (!place_id || !place || place.type !== 'locality' || !marketingYear) {
        return (
          <div className="control-bar-container">
            <div className="control-bar">
              <div className="search-param">
                <SearchBar selectPlace={this.selectPlace} />
              </div>
              <div className="search-param">
                <YearSelector />
                <button className="save-btn" onClick={this.saveCropData}>Save</button>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div>
          <div className="filter-bar">
            <div className="statistic-one">
              <YearSelector />
            </div>
            <div className="statistic-two">
              <div className="pin-locations">
                {this.renderPins()}
                <button className="save-btn" onClick={this.saveCropData}>Save</button>
              </div>
            </div>
            <div className="statistic-three">
              <SearchBar selectPlace={this.selectPlace} />
            </div>
          </div>
          <div className="control-bar-container">
            <TableInsert />
          </div>
        </div>
      );
    } else {
      return (
        <h3>Please auth to insert</h3>
      );
    }
  }
}

const mapStateToProps = (state) => ({ insertPage: state.insertPage, all: state.all });

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

const container = createContainer(({ params }) => {
  const user = Meteor.user();
  Meteor.subscribe('crops.all');
  Meteor.subscribe('groups.all');
  Meteor.subscribe('records.user');
  Meteor.subscribe('localities.all');

  return {
    user,
    crops: Crops.find({}).fetch(),
    groups: Groups.find({}).fetch(),
    records: Records.find({}).fetch(),
    localities: Localities.find({}).fetch(),
  };
}, InsertPage);

export default connect(mapStateToProps, mapDispatchToProps)(container);
