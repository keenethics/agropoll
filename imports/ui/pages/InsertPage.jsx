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
    },

    this.selectPlace = this.selectPlace.bind(this);
    this.addCropElem = this.addCropElem.bind(this);
    this.saveCropData = this.saveCropData.bind(this);
    this.removeCropRow = this.removeCropRow.bind(this);
    this.renderTableRows = this.renderTableRows.bind(this);
    this.renderCropsRows = this.renderCropsRows.bind(this);
    this.getDataFromTableById = this.getDataFromTableById.bind(this);
    this.renderInsertedCropsRows = this.renderInsertedCropsRows.bind(this);
  }

  removeCropRow(id){
    Meteor.call('record.removeOne', id);
  }

  addCropElem(cropId) {
    const placeId = this.state.placeId;//localStorage.getItem('placeId');
    const placeType = this.state.placeType;//localStorage.getItem('placeType');
    console.log(placeId + "   " + placeType);
    if(placeId && placeType === 'locality'){
      Meteor.call('record.insert',{
        marketingYear: 2016,
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

  getDataFromTableById(id){
    const data = {};
    const ref = 'crop' + id;

    data.cropCapacity = this.refs['cropCapacity' + id].value;
    data.reproduction = this.refs['reproduction' + id].value;
    data.square = this.refs['square' + id].value;
    data.status = this.refs['status' + id].value;
    data.sort = this.refs['sort' + id].value;
    return data;
  }

  saveCropData(){
    const placeId = this.state.placeId;//localStorage.getItem('placeId');
    const placeType = this.state.placeType;//localStorage.getItem('placeType');
    if(placeId && placeType === 'locality'){
      const cropsIds = Records.find({userId: this.props.user._id}, {_id: 1})
      cropsIds.forEach( (crop) => {
        const cropId = crop._id;
        const data = this.getDataFromTableById(cropId);
        Meteor.call('record.update', {_id:cropId}, data)
      })
    }
    else
      alert('no place selected')
  }

  renderInsertedCropsRows(crop) {
    const placeId = this.state.placeId;//localStorage.getItem('placeId');
    const userId = this.props.user._id;
    const cropData = Records.find({cropId:crop.id, placeId, userId});
    return cropData.map( (crop) => {
      return (
        <tr id={crop._id} key={crop._id} ref={'crop' + crop._id} className="cropData">
          <td>_</td>
          <td>
            <input type="text" ref={"sort"+crop._id} defaultValue={crop.sort} placeholder="сорт"/>
            <input type="text" ref={"reproduction"+crop._id} defaultValue={crop.reproduction} placeholder="репродукція"/>
          </td>
          <td><input type="number" ref={"square"+crop._id} defaultValue={crop.square}/></td>
          <td><input type="number" ref={"cropCapacity"+crop._id} defaultValue={crop.cropCapacity}/></td>
          <td><input type="text"  ref={"status"+crop._id} defaultValue={crop.status}/></td>
          <td onClick={() => this.removeCropRow(crop._id)}>Remove</td>
        </tr>
      )
    })
  }

  renderCropsRows(crops) {
    return crops.map((crop) => {
      const rows = this.renderInsertedCropsRows(crop);
      rows.unshift (
        <tr id={crop.id} key={crop.id}>
          <td><span onClick={() => this.addCropElem(crop.id)}>add</span></td>
          <td>{crop.name}</td>
          <td></td>
          <td></td>
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
    console.log(place.place_id,);
    console.log(place.types[0]);
    this.setState( {
      placeId: place.place_id,
      placeType: place.types[0],
    }, () => {
      console.log(this.state);
    });

  }

  render() {
    if (Meteor.user())
    return (
      <div>
        <h2>Insert Page</h2>
        <SearchBar selectPlace={this.selectPlace}/>
          <button onClick={this.saveCropData}>Save</button>
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
  const recordsHandler = Meteor.subscribe('records.all');

  return {
    user,
    crops: Crops.find({}).fetch(),
    groups: Groups.find({}).fetch(),
    records: Records.find({}).fetch(),
  };
}, InsertPage)
