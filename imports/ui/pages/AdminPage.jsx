import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// import { Crops, Groups } from '/imports/api/crops/crops.js';
// import { Records } from '/imports/api/records/records.js';
// import { Users } from '/imports/api/users/users.js';

// import StatisticsTableRow from '/imports/ui/components/StatisticsPage/StatisticsTableRow.jsx';
// import StatisticsTableHeader from '/imports/ui/components/StatisticsPage/StatisticsTableHeader.jsx';
// import LocationFilter from '/imports/ui/components/StatisticsPage/LocationFilter.jsx';
// import StatusFilter from '/imports/ui/components/StatisticsPage/StatusFilter.jsx';
// import YearSelector from '/imports/ui/components/YearSelector.jsx';

// import { connect } from 'react-redux';

class AdminPage extends React.Component {

  render() {
    console.log(this.props.users);

    return (
      <div>

      </div>
    );
  }
}

const container = createContainer((props) => {
  const user = Meteor.user();
  Meteor.subscribe('users.all');
  // Meteor.subscribe('crops.all');
  // Meteor.subscribe('groups.all');
  // const recordsHandler = Meteor.subscribe('records.all', { ...props.statisticsTable, ...props.all });
  // console.info('Records ready:', recordsHandler.ready());
  // const records = recordsHandler.ready() ? Records.find({}).fetch() : [];
  return {
    user,
    users: Meteor.users.find({}).fetch(),
    // crops: Crops.find({}, { sort: { id: 1 } }).fetch(),
    // groups: Groups.find({}, { sort: { id: 1 } }).fetch(),
    // records,
  };
}, AdminPage);

export default container;

// const mapStateToProps = (state) => ({ statisticsTable: state.statisticsTable, all: state.all });
//
// export default connect(mapStateToProps)(container);
