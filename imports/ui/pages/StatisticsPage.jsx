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
    return (
      <div>
        <h3>Statistics Page</h3>

        <SearchBar />


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
