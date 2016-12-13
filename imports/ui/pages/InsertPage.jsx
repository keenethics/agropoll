import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory, Link } from 'react-router'

import { Records } from '/imports/api/records/records.js';
import { Localities } from '/imports/api/localities/localities.js';
import { Crops, Groups } from '/imports/api/crops/crops.js';

import SearchBar from '/imports/ui/components/SearchBar.jsx';
import LocationPin from '/imports/ui/components/LocationPin.jsx';
import TableHeader from '/imports/ui/components/TableHeader.jsx';

class InsertPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeId: localStorage.getItem('placeId'),
      placeType: localStorage.getItem('placeType'),
      marketingYear: localStorage.getItem('marketingYear'),
      fullAddress: localStorage.getItem('fullAddress'),
    };
    this.hasUserThisCrop = this.hasUserThisCrop.bind(this);
    this.collapseCrops = this.collapseCrops.bind(this);
    this.goToPin = this.goToPin.bind(this);
    this.renderPins = this.renderPins.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.selectPlace = this.selectPlace.bind(this);
    this.addCropElem = this.addCropElem.bind(this);
    this.saveCropData = this.saveCropData.bind(this);
    this.removeCropRow = this.removeCropRow.bind(this);
    this.getSquareValue = this.getSquareValue.bind(this);
    this.renderTableRows = this.renderTableRows.bind(this);
    this.renderCropsRows = this.renderCropsRows.bind(this);
    this.getDataFromTableById = this.getDataFromTableById.bind(this);
    this.renderInsertedCropsRows = this.renderInsertedCropsRows.bind(this);
  }

  goToPin(locationId) {
    const fullAddress = this.props.localities.find((locality) => { return locality.placeId === locationId }).fullAddress;
    this.setState({ placeId: locationId, fullAddress })
  }

  hasUserThisCrop(crop) {
    return this.props.records.find((elem) => {
      return (elem.cropId === crop.id && elem.location.placeId === this.state.placeId)
    })
  }

  collapseCrops(e){
    const elementsToHide = e.target.parentElement.parentElement.children;
    const arrElementsToHide = Array.prototype.slice.call(elementsToHide);
    arrElementsToHide.shift()
    arrElementsToHide.forEach((elem) => {
      elem.className = elem.className.replace(' hidden', "");
    })
  }

  removeCropRow(id) {
    Meteor.call('record.removeOne', id);
  }

  getSquareValue(cropId) {
    const placeId = this.state.placeId;
    const userId = this.props.user._id;
    const marketingYear = this.state.marketingYear;
    return this.props.records.filter((record) => {
      return (record.cropId === cropId && record.location.placeId === placeId &&
        record.userId === userId && record.marketingYear === marketingYear)
    }).reduce((a, b) => {
        return a + +b.square
      }, 0)
  }

  getAvgCapacityValue(cropId, square) {
    const placeId = this.state.placeId;
    const userId = this.props.user._id;
    const marketingYear = this.state.marketingYear;
    const capacity = this.props.records.filter((record) => {
      return (record.cropId === cropId && record.location.placeId === placeId &&
        record.userId === userId && record.marketingYear === marketingYear)
    }).reduce((a, b) => {
        return a + (+b.square * +b.cropCapacity)
      }, 0);
    return capacity / square;
  }

  addCropElem(cropId) {
    const placeId = this.state.placeId;
    const placeType = this.state.placeType;
    const marketingYear = this.state.marketingYear;

    if (placeId && placeType === 'locality' && marketingYear) {
      Meteor.call('record.insert', {
        marketingYear,
        reproduction: "",
        cropCapacity: 0,
        placeId,
        cropId,
        square: 0,
        status: 'planned',
        sort: "",
      });
    }
    else
      alert('no place selected')
  }

  getDataFromTableById(id) {
    const data = {};
    const ref = 'crop' + id;
    data.cropCapacity = this.refs['cropCapacity' + id].value;
    data.reproduction = this.refs['reproduction' + id].value;
    data.square = this.refs['square' + id].value;
    data.status = this.refs['status' + id].value;
    data.sort = this.refs['sort' + id].value;
    return data;
  }

  renderPins() {
    const placeIds = this.props.user.profile && this.props.user.profile.locations || [];
    return placeIds && placeIds.map((placeId) => {
      if (this.props.localities.length){
      const fullAddress = this.props.localities.find((locality) => locality.placeId === placeId).fullAddress;
      return <div key={placeId} onClick={() => this.goToPin(placeId)}><LocationPin fullAddress={fullAddress} /></div>}
    });
  }

  saveCropData() {
    const placeId = this.state.placeId;
    const userId = this.props.user._id;
    const placeType = this.state.placeType;
    const marketingYear = this.state.marketingYear;
    if (placeId && placeType === 'locality') {
      const cropsIds = Records.find({
        'location.placeId': placeId,
        userId,
        marketingYear,
      }, { _id: 1 })
      cropsIds.forEach((crop) => {
        const cropId = crop._id;
        const data = this.getDataFromTableById(cropId);
        Meteor.call('record.update', { _id:cropId }, data)
      })
    }
    else
      alert('no place selected')
  }

  renderInsertedCropsRows(crop) {
    const placeId = this.state.placeId;
    const userId = this.props.user._id;
    const marketingYear = this.state.marketingYear;
    const cropsData = Records.find({
      cropId: crop.id,
      'location.placeId': placeId,
      userId,
      marketingYear,
    });
    return cropsData.map((cropData) => {
      return(
        <div className={"trow"} key={cropData._id}>
          <div className="tcoll0 "></div>
          <div className="tcoll1 tcell">
            <input className="input" type="text" ref={"sort"+cropData._id} defaultValue={cropData.sort} placeholder="сорт"/>
            <input className="input" type="text" ref={"reproduction"+cropData._id} defaultValue={cropData.reproduction} placeholder="репродукція"/>
          </div>
          <div className="tcoll2 tcell">
            <input className="input" type="number" ref={"square"+cropData._id} defaultValue={cropData.square}/>
          </div>
          <div className="tcoll3 tcell">
            <input className="input" type="number" ref={"cropCapacity"+cropData._id} defaultValue={cropData.cropCapacity}/>
          </div>
          <div className="tcoll4 tcell">
            <input className="input" type="text"  ref={"status"+cropData._id} defaultValue={cropData.status}/></div>
          <div className="tcoll5 " onClick={() => this.removeCropRow(cropData._id)}>Remove</div>
        </div>
      )
    })
  }

  renderCropsRows(crops) {
    const placeId = this.state.placeId;
    const marketingYear = this.state.marketingYear;
    const placeType = this.state.placeType;
    const canAdd = placeId && placeType === 'locality' && marketingYear;
    return crops.map((crop) => {
      const squareValue = this.getSquareValue(crop.id);
      const avgCapacity = this.getAvgCapacityValue(crop.id, squareValue);
      const hiddenClass = this.hasUserThisCrop(crop) ? "" : " hidden";
      return (
        <div key={crop.id} className={hiddenClass}>
          <div className="trow">
            <div className="tcoll0">
              { canAdd && <span onClick={() => this.addCropElem(crop.id)}>add</span> || "" }
            </div>
            <div className="tcoll1 tcell">{ crop.name }</div>
            <div className="tcoll2 tcell">{ squareValue || "" }</div>
            <div className="tcoll3 tcell">{ avgCapacity && avgCapacity.toFixed(4) || "" }</div>
            <div className="tcoll4 tcell"></div>
            <div className="tcoll5"></div>
          </div>
          { this.renderInsertedCropsRows(crop) }
        </div>
      )
    })
  }

  renderTableRows() {
    return this.props.groups.map((group) => {
      const crops = Crops.find({ groupId: group.id }).fetch();
      return (
        <div key={group.id}>
          <div className="trow">
            <div className="tcoll0" onClick={this.collapseCrops} >++++</div>
            {group.name}
          </div>
          { this.renderCropsRows(crops) }
        </div>
      )
    })
  }

  selectPlace({ place, fullAddress }) {
    console.log(place);
    console.log(place.place_id);
    console.log(place.types[0]);
    localStorage.setItem('placeId', place.place_id);
    localStorage.setItem('placeType', place.types[0]);
    localStorage.setItem('fullAddress', fullAddress);
    browserHistory.push(`/insert/${place.place_id}`)
    this.setState({
      placeId: place.place_id,
      placeType: place.types[0],
      fullAddress,
    });

  }

  selectYear(e){
    localStorage.setItem('marketingYear', e.target.value);
    this.setState({ marketingYear: e.target.value });
  }

  render() {
    if (Meteor.user()) {
    //   const placeId = this.props.routeParams.placeId;
    //   const place = Localities.findOne({ placeId });
    //   if (placeId && (!place || place.type !== 'locality')) {
    //     return (
    //       <h3>Nothing found</h3>
    //     )
    //   }
      // if (placeId)
      //   this.setState({
      //     fullAddress: place.fullAddress,
      //     placeType: place.type,
      //     placeId,
      //   });
      return (
        <div>
          <h2>Insert Page</h2>
          <SearchBar selectPlace={this.selectPlace}/> <span>{this.state.fullAddress}</span>
            <button onClick={this.saveCropData}>Save</button>
            <select defaultValue={this.state.marketingYear || ""} onChange={this.selectYear}>
              <option disabled value="">Select year</option>
              <option>2016</option>
              <option>2017</option>
            </select>
            {this.renderPins()}
            <div className="table">
              <TableHeader />
              {this.renderTableRows()}
            </div>

        </div>
      )
    }
    else return (
      <h3>Please auth to insert</h3>
    )
  }
}

export default createContainer (({ params }) => {
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
