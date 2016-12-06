import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Crops, Groups } from '/imports/api/crops/crops.js'

import TableHeader from './TableHeader.jsx';

class TableInsert extends React.Component{
  constructor(props){
    super(props);

    this.addCropElem = this.addCropElem.bind(this);
    this.removeCropElem = this.removeCropElem.bind(this);
    this.renderTableRows = this.renderTableRows.bind(this);
  }

  componentDidMount(){
    const tableBody = this.refs.insertTableBody;
    tableBody.addEventListener('click', this.removeCropElem, false )
  }

  removeCropElem(e){
    if(e.target.className.includes('cropElemRemove')){
      const tableRow = e.target.parentElement;
      const tableBody = this.refs.insertTableBody;
      tableBody.removeChild(tableRow);
    }

  }

  addCropElem(cropName, cropId) {
    const cropParentElem = document.getElementById(cropId);
    const tableBody = this.refs.insertTableBody;
    const cropElem = document.createElement('tr');
    cropElem.className = 'cropElem';
    cropElem.innerHTML = `<td>_</td>
    <td><input type="text" placeholder="сорт"/><input type="text" placeholder="репродукція"/></td>
    <td><input type="number" value="0"/></td>
    <td><input type="number" value="0"/></td>
    <td><input type="number" value="0"/></td>
    <td class="cropElemRemove">Remove</td>`;
    tableBody.insertBefore(cropElem, cropParentElem.nextSibling);
  }

  renderTableRows() {
    return this.props.groups.map( (group) => {
      const crops = Crops.find({group:group.id}).fetch();
      const rows = crops.map( (crop) => {
        return (
          <tr id={crop.id} key={crop.id}>
            <td><span onClick={() => this.addCropElem(crop.name, crop.id)}>add</span></td>
            <td>{crop.name}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )
      })
      rows.unshift(<tr key={group.id}>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>)
      return rows;
    })
  }

  render() {
    return(
      <table ref="insertTable">
        <TableHeader />
        <tbody ref="insertTableBody">
          {this.renderTableRows()}
        </tbody>
      </table>
    )
  }
}

export default createContainer( ({params}) => {
  const user = Meteor.user();
  const cropsHandler = Meteor.subscribe('crops.all');
  const groupsHandler = Meteor.subscribe('groups.all');

  return {
    user,
    crops: Crops.find({}).fetch(),
    groups: Groups.find({}).fetch()
  }
}, TableInsert)
