import React from 'react';
import { createContainer } from 'meteor/react-meteor-data'

import { Crops, Groups } from '/imports/api/crops/crops.js'
import { Records } from '/imports/api/records/records.js'

import SearchBar from '/imports/ui/components/SearchBar.jsx';
import TableHeader from '/imports/ui/components/TableHeader.jsx';

class InsertPage extends React.Component {
  constructor(props){
    super(props);

    this.addCropElem = this.addCropElem.bind(this);
    this.saveCropData = this.saveCropData.bind(this);
    this.removeCropRow = this.removeCropRow.bind(this);
    this.renderTableRows = this.renderTableRows.bind(this);
    this.renderCropsRows = this.renderCropsRows.bind(this);
    this.getDataFromTableRow = this.getDataFromTableRow.bind(this);
    this.renderInsertedCropsRows = this.renderInsertedCropsRows.bind(this);
  }

  removeCropRow(id){
    Meteor.call('record.removeOne', id);
  }

  addCropElem(cropId) {
    Meteor.call('record.insert', 2016, null, cropId, "", "", 0, 0, 'planned');
  }

  getDataFromTableRow(tr){
    const data = {}
    data.sort = tr.children[1].children[0].value;
    data.reproduction = tr.children[1].children[1].value;
    data.square = tr.children[2].children[0].value;
    data.cropCapacity = tr.children[3].children[0].value;
    data.status = tr.children[4].children[0].value;
    return data;
  }

  saveCropData(){
    const cropElems = document.getElementsByClassName('cropData');

    Array.prototype.forEach.call(cropElems, (elem) => {
      const data = this.getDataFromTableRow(elem)
      Meteor.call('record.update', {_id: elem.id}, data)
    })
    console.log(cropElems);
    this.getDataFromTableRow(cropElems[0]);
  }

  renderInsertedCropsRows(crop) {
    const cropData = Records.find({cropId:crop.id});
    return cropData.map( (crop) => {
      return (
        <tr id={crop._id} key={crop._id} className="cropData">
          <td>_</td>
          <td>
            <input type="text" defaultValue={crop.sort} placeholder="сорт"/>
            <input type="text" defaultValue={crop.reproduction} placeholder="репродукція"/>
          </td>
          <td><input type="number" defaultValue={crop.square}/></td>
          <td><input type="number" defaultValue={crop.cropCapacity}/></td>
          <td><input type="text" defaultValue={crop.status}/></td>
          <td onClick={() => this.removeCropRow(crop._id)}>Remove</td>
        </tr>
      )
    })
  }

  renderCropsRows(crops) {
    return crops.map( (crop) => {
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
    return this.props.groups.map( (group) => {
      const crops = Crops.find({group:group.id}).fetch();
      const rows = this.renderCropsRows(crops);
      rows.unshift(<tr key={group.id}>
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

  render() {
    return (
      <div>
        <h2>Insert Page</h2>
        <SearchBar />
        <form onSubmit={(e) => {e.preventDefault(); e.persist(); console.log(e.target.elements)}}>
          <button onClick={this.saveCropData}>Save</button>
          <input type="submit" />
          <table ref="insertTable">
            <TableHeader />
            <tbody ref="insertTableBody">
              {this.renderTableRows()}
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

export default createContainer (( {params} ) => {
  const user = Meteor.user();
  const cropsHandler = Meteor.subscribe('crops.all');
  const groupsHandler = Meteor.subscribe('groups.all');
  const recordsHandler = Meteor.subscribe('records.all');

  return {
    user,
    crops: Crops.find({}).fetch(),
    groups: Groups.find({}).fetch(),
    records: Records.find({}).fetch()
  }
}, InsertPage)
