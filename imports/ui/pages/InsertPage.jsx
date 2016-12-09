import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Crops, Groups } from '/imports/api/crops/crops.js';
import { Records } from '/imports/api/records/records.js';

import SearchBar from '/imports/ui/components/SearchBar.jsx';
import TableHeader from '/imports/ui/components/TableHeader.jsx';

class InsertPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeId: null,
      placeType: null,
      marketingYear: null,
    };

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

  removeCropRow(id) {
    Meteor.call('record.removeOne', id);
  }

  componentWillMount() {
    const placeId = localStorage.getItem('placeId');
    const placeType = localStorage.getItem('placeType');
    const marketingYear = localStorage.getItem('marketingYear');
    this.setState({
      placeId,
      placeType,
      marketingYear,
    });
  }

  getSquareValue(cropId) {
    return this.props.records.filter((record) => record.cropId === cropId).reduce((a, b) => {
        return a + +b.square
      }, 0)
  }

  getAvgCapacityValue(cropId, square) {
    const capacity = this.props.records.filter((record) => record.cropId === cropId).reduce((a, b) => {
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

  saveCropData() {
    const placeId = this.state.placeId;
    const placeType = this.state.placeType;
    if (placeId && placeType === 'locality') {
      const cropsIds = Records.find({ userId: this.props.user._id }, { _id: 1 })
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
      return (
        <tr id={cropData._id} key={cropData._id} ref={'crop' + cropData._id} className="cropData">
          <td>_</td>
          <td>
            <input type="text" ref={"sort"+cropData._id} defaultValue={cropData.sort} placeholder="сорт"/>
            <input type="text" ref={"reproduction"+cropData._id} defaultValue={cropData.reproduction} placeholder="репродукція"/>
          </td>
          <td><input type="number" ref={"square"+cropData._id} defaultValue={cropData.square}/></td>
          <td><input type="number" ref={"cropCapacity"+cropData._id} defaultValue={cropData.cropCapacity}/></td>
          <td><input type="text"  ref={"status"+cropData._id} defaultValue={cropData.status}/></td>
          <td onClick={() => this.removeCropRow(cropData._id)}>Remove</td>
        </tr>
      )
    })
  }

  renderCropsRows(crops) {
    const placeId = this.state.placeId;
    const marketingYear = this.state.marketingYear;
    const placeType = this.state.placeType;
    const canAdd = placeId && placeType === 'locality' && marketingYear;
    return crops.map((crop) => {
      rows = this.renderInsertedCropsRows(crop);
      const squareValue = this.getSquareValue(crop.id);
      const avgCapacity = this.getAvgCapacityValue(crop.id, squareValue);
      rows.unshift(
        <tr id={crop.id} key={crop.id}>
          <td>{canAdd && <span onClick={() => this.addCropElem(crop.id)}>add</span> || ""}</td>
          <td>{crop.name}</td>
          <td>{rows.length && squareValue || ""}</td>
          <td>{rows.length && avgCapacity || ""}</td>
          <td></td>
          <td></td>
        </tr>
      )
      return rows;
    })
  }

  renderTableRows() {
    return this.props.groups.map((group) => {
      const crops = Crops.find({ groupId: group.id }).fetch();
      const rows = this.renderCropsRows(crops);
      rows.unshift(<tr key={group.id} >
        <td></td>
        <td>{group.name}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>)
      return rows;
    })
  }

  selectPlace(place) {
    console.log(place);
    console.log(place.place_id);
    console.log(place.types[0]);
    localStorage.setItem('placeId', place.place_id);
    localStorage.setItem('placeType', place.types[0]);
    this.setState({
      placeId: place.place_id,
      placeType: place.types[0],
    });

  }

  selectYear(e){
    localStorage.setItem('marketingYear', e.target.value);
    this.setState({ marketingYear: e.target.value });
  }

  render() {
    if (Meteor.user())
    return (
      <div>
        <h2>Insert Page</h2>
        <SearchBar selectPlace={this.selectPlace}/>
          <button onClick={this.saveCropData}>Save</button>
          <select defaultValue={this.state.marketingYear || ""} onChange={this.selectYear}>
            <option disabled value="">Select year</option>
            <option>2016</option>
            <option>2017</option>
          </select>
          <table ref="insertTable">
            <TableHeader />
            <tbody ref="insertTableBody">
              {this.renderTableRows()}
            </tbody>
          </table>
      </div>
    )
    else return(
      <h3>Please auth to insert</h3>
    )
  }
}

export default createContainer (({ params }) => {
  const user = Meteor.user();
  const cropsHandler = Meteor.subscribe('crops.all');
  const groupsHandler = Meteor.subscribe('groups.all');
  const recordsHandler = Meteor.subscribe('records.user', Meteor.userId());

  return {
    user,
    crops: Crops.find({}).fetch(),
    groups: Groups.find({}).fetch(),
    records: Records.find({}).fetch(),
  };
}, InsertPage)
