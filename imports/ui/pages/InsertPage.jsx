import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '/imports/ui/actions/InsertPageActions.js';

import { Records } from '/imports/api/records/records.js';
import { Localities } from '/imports/api/localities/localities.js';
import { Crops, Groups } from '/imports/api/crops/crops.js';

import SearchBar from '/imports/ui/components/SearchBar.jsx';
import LocationPin from '/imports/ui/components/LocationPin.jsx';
import TableHeader from '/imports/ui/components/table/TableHeader.jsx';
import TableInsert from '/imports/ui/components/table/TableInsert.jsx';

class InsertPage extends React.Component {
  constructor(props) {
    super(props);

    this.goToPin = this.goToPin.bind(this);
    this.renderPins = this.renderPins.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.saveCropData = this.saveCropData.bind(this);
  }

  saveCropData() {
    this.props.actions.saveData();
  }

  goToPin(locationId) {
    const fullAddress = this.props.localities.find((locality) => { return locality.placeId === locationId }).fullAddress;
    this.setState({ placeId: locationId, fullAddress, hideCrops:true, })
    this.props.actions.goToPin(locationId, fullAddress, true)
  }

  renderPins() {
    const placeIds = this.props.user.profile && this.props.user.profile.locations || [];
    return placeIds && placeIds.map((placeId) => {
      if (this.props.localities.length){
      const fullAddress = this.props.localities.find((locality) => locality.placeId === placeId).fullAddress;
      return <div key={placeId} onClick={() => this.goToPin(placeId)}><LocationPin fullAddress={fullAddress} /></div>}
    });
  }

  selectYear(e){
    const year = e.target.value;
    localStorage.setItem('marketingYear', year);
    this.props.actions.selectYear(year);
  }

  render() {
    if (Meteor.user()) {
      const placeId = this.props.insertPage.placeId;
      const place = Localities.findOne({ placeId });
      const marketingYear = this.props.insertPage.marketingYear;
      if (!placeId || !place || place.type !== 'locality' || !marketingYear) {
        return (
          <div>
            <h3>Select place and year</h3>
            <SearchBar selectPlace={this.selectPlace}/> <span>{this.props.insertPage.fullAddress}</span>
            <button onClick={this.saveCropData}>Save</button>
            <select defaultValue={this.props.insertPage.marketingYear || ""} onChange={this.selectYear}>
              <option disabled value="">Select year</option>
              <option>2016</option>
              <option>2017</option>
            </select>
          </div>
        )
      }

      return (
        <div>
          <h2>Insert Page</h2>
          <SearchBar selectPlace={this.selectPlace}/> <span>{this.props.insertPage.fullAddress}</span>
          <button onClick={this.saveCropData}>Save</button>
          <select defaultValue={this.props.insertPage.marketingYear || ""} onChange={this.selectYear}>
            <option disabled value="">Select year</option>
            <option>2016</option>
            <option>2017</option>
          </select>
          {this.renderPins()}
          <TableInsert />

        </div>
      )
    }
    else return (
      <h3>Please auth to insert</h3>
    )
  }
}

const mapStateToProps = (state) => {
  return { insertPage: state.insertPage }
};

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
};

const InsertPageContainer = createContainer (({ params }) => {
  const user = Meteor.user();
  const cropsHandler = Meteor.subscribe('crops.all');
  const groupsHandler = Meteor.subscribe('groups.all');
  const recordsHandler = Meteor.subscribe('records.user', Meteor.userId());
  const localitiesHandler = Meteor.subscribe('localities.all');

  return {
    user,
    crops: Crops.find({}).fetch(),
    groups: Groups.find({}).fetch(),
    records: Records.find({}).fetch(),
    localities: Localities.find({}).fetch(),
  };
}, InsertPage);

export default connect(mapStateToProps, mapDispatchToProps)(InsertPageContainer);
