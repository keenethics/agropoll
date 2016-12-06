import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Crops, Groups } from '/imports/api/crops/crops.js'

import TableHeader from './TableHeader.jsx';

class TableInsert extends React.Component{
  constructor(props){
    super(props);

    this.expandRows = this.expandRows.bind(this);
    this.renderTableRows = this.renderTableRows.bind(this);
  }

  renderTableRows() {
    return this.props.groups.map( (group) => {
      const crops = Crops.find({group:group.id}).fetch();
      const rows = crops.map( (crop) => {
        return (
          <tr key={crop._id} className={"group" + group.id +" collapse"}>
            <td><span>add</span></td>
            <td>{crop.name}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )
      })
      rows.unshift(<tr key={group._id}>
        <td></td>
        <td onClick={() => this.expandRows(group.id)}>{group.name}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>)
      return rows;
    })
  }

  expandRows(classId) {
    const elemsToExpand = document.getElementsByClassName('group' + classId);
    if (elemsToExpand[0].className.includes('collapse')){
      elemsToExpand.forEach( (elem) => {
        elem.className = elem.className.substr(lem.className.lastIndexOf(' '));
      })
    }
  }

  render() {
    return(
      <table>
        <TableHeader />
        <tbody>
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
