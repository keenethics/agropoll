import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Crops, Groups } from '/imports/api/crops/crops.js';
import { Records } from '/imports/api/records/records.js';
import StatisticsTableRow from '/imports/ui/components/StatisticsTableRow.jsx';
import StatisticsTableHeader from '/imports/ui/components/StatisticsTableHeader.jsx';
import LocationFilter from '/imports/ui/components/LocationFilter.jsx';

class StatisticsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRows(group) {
    return this.props.crops.filter(crop => crop.groupId === group.id).map(crop => (
      <StatisticsTableRow crop={crop} key={crop.id} records={this.props.records} />
    ));
  }

  render() {
    return (
      <div>
        <h3>Statistics Page</h3>

        <LocationFilter />

        <div>
          <StatisticsTableHeader />
          {this.props.groups.map(group => (
            <div key={group.id}>
              <div className="row">
                <div className="head">{group.name}</div>
              </div>
              {this.renderRows(group)}
            </div>
          ))}
        </div>

      </div>
    );
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
    records: Records.find({}).fetch()
  }
}, StatisticsPage);
