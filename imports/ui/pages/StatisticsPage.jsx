import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Crops, Groups } from '/imports/api/crops/crops.js';
import { Records } from '/imports/api/records/records.js';
import SearchBar from '/imports/ui/components/SearchBar.jsx';

class StatisticsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('-->',this.props);

    return (
      <div>
        <h3>Statistics Page</h3>

        <SearchBar />

        <table>
          <thead>
            <tr>
              <th></th>
              <th>Культура</th>
              <th>Площа</th>
              <th>Урожайність</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.groups.map(group => (
              <tr key={group.id}>
                <td></td>
                <td colSpan="3">{group.name}</td>
                <td></td>
              </tr>

            ))}
            {/*this.props.crops.filter(crop => crop.groupId === group.id).map(crop => (
              <tr key={crop.id}>
                <td></td>
                <td>{crop.name}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))*/}
          </tbody>
        </table>


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
}, StatisticsPage);
