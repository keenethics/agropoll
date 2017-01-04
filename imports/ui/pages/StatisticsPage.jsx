import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
// import { browserHistory } from 'react-router';
import { Crops, Groups } from '/imports/api/crops/crops.js';
import { Records } from '/imports/api/records/records.js';

import StatisticsTableRow from '/imports/ui/components/StatisticsPage/StatisticsTableRow.jsx';
import StatisticsTableHeader from '/imports/ui/components/StatisticsPage/StatisticsTableHeader.jsx';
import LocationFilter from '/imports/ui/components/StatisticsPage/LocationFilter.jsx';
import StatusFilter from '/imports/ui/components/StatisticsPage/StatusFilter.jsx';

import { connect } from 'react-redux';

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
    // console.log(this.props.statisticsTable);
    return (
      <div>
        <h3>Statistics Page</h3>

        <LocationFilter />
        <StatusFilter />

        <div className="table-container">
          <StatisticsTableHeader />
          {this.props.groups.map(group => (
            <div key={group.id} className="group">
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

const container = createContainer(({ params }) => {
  const user = Meteor.user();
  Meteor.subscribe('crops.all');
  Meteor.subscribe('groups.all');
  Meteor.subscribe('records.all');

  return {
    user,
    crops: Crops.find({}).fetch(),
    groups: Groups.find({}).fetch(),
    records: Records.find({}).fetch(),
  };
}, StatisticsPage);

const mapStateToProps = (state) => ({ statisticsTable: state.statisticsTable });

export default connect(mapStateToProps)(container);
