import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// import { Crops, Groups } from '/imports/api/crops/crops.js';
import { Records } from '/imports/api/records/records.js';


// import StatisticsTableRow from '/imports/ui/components/StatisticsPage/StatisticsTableRow.jsx';
// import StatisticsTableHeader from '/imports/ui/components/StatisticsPage/StatisticsTableHeader.jsx';
import LocationFilter from '/imports/ui/components/StatisticsPage/LocationFilter.jsx';
import StatusFilter from '/imports/ui/components/StatisticsPage/StatusFilter.jsx';
import YearSelector from '/imports/ui/components/YearSelector.jsx';

import Griddle from 'griddle-react';

import { connect } from 'react-redux';

class AdminPage extends React.Component {
  griddleData() {
    console.log(Records.findOne());

    return this.props.users.length && this.props.users.map((user) => ({
      User: user.emails[0].address,
      'Total square': this.props.records.filter((item) => item.userId === user._id).reduce((prev, next) => prev + +next.square, 0),
      Locations: user.profile.locations,
      Type: user.profile.type,
      Cluster: '',
      Role: '',
    })) || [{
      User: '',
      'Total square': '',
      Locations: '',
      Type: '',
      Cluster: '',
      Role: '',
    }];
  }

  render() {
    return (
      <div>
        <div className="filter-bar">
          <div className="statistic-one">
            <YearSelector />
          </div>
          <div className="statistic-two">
            <StatusFilter />
          </div>
          <div className="statistic-three">
            <LocationFilter />
          </div>
        </div>

        <div className="statistic-content">
          <Griddle data={this.griddleData()} />
        </div>

      </div>
    );
  }
}

const container = createContainer((props) => {
  const user = Meteor.user();
  const usersHandler = Meteor.subscribe('users.all');
  // Meteor.subscribe('crops.all');
  // Meteor.subscribe('groups.all');
  const recordsHandler = Meteor.subscribe('records.filter.admin', { ...props.statisticsTable, ...props.all });
  // console.info('Records ready:', recordsHandler.ready());
  // const records = recordsHandler.ready() ? Records.find({}).fetch() : [];
  const users = usersHandler.ready() ? Meteor.users.find({}).fetch() : [];
  return {
    user,
    users,
    // crops: Crops.find({}, { sort: { id: 1 } }).fetch(),
    // groups: Groups.find({}, { sort: { id: 1 } }).fetch(),
    records: Records.find({}).fetch(),
  };
}, AdminPage);

// export default container;

const mapStateToProps = (state) => ({ statisticsTable: state.statisticsTable, all: state.all });
export default connect(mapStateToProps)(container);
