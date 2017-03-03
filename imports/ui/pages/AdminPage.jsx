import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// import { Crops, Groups } from '/imports/api/crops/crops.js';
import { Records } from '/imports/api/records/records.js';
import { Localities } from '/imports/api/localities/localities.js';
import { Clusters } from '/imports/api/clusters/clusters.js';


// import StatisticsTableRow from '/imports/ui/components/StatisticsPage/StatisticsTableRow.jsx';
// import StatisticsTableHeader from '/imports/ui/components/StatisticsPage/StatisticsTableHeader.jsx';
import LocationFilter from '/imports/ui/components/StatisticsPage/LocationFilter.jsx';
import StatusFilter from '/imports/ui/components/StatisticsPage/StatusFilter.jsx';
import YearSelector from '/imports/ui/components/YearSelector.jsx';

import Griddle from 'griddle-react';

import { connect } from 'react-redux';

class AdminPage extends React.Component {
  griddleData() {
    return this.props.users.length && this.props.users.map((user) => ({
      User: user.emails[0].address,
      'Total square': this.props.records.filter((item) =>
        item.userId === user._id
      ).reduce((prev, next) => prev + +next.square, 0),
      Locations: user.profile.locations && this.props.localities &&
        user.profile.locations.map((place_id) => (
          <div key={place_id}>
            {(this.props.localities.find((item) =>
              item.place_id === place_id
            ) || []).fullAddress}
          </div>
        )),
      Type: user.profile.type,
      Cluster: '',
      Role: user.roles && user.roles.join('; '),
    })).filter((item) => item['Total square'] > 0);
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
          <Griddle
            results={this.griddleData()}
          />
        </div>

      </div>
    );
  }
}

const container = createContainer((props) => {
  const usersHandler = Meteor.subscribe('users.all');
  const recordsHandler = Meteor.subscribe('records.filter.admin', { ...props.statisticsTable, ...props.all });
  const users = usersHandler.ready() ? Meteor.users.find({}).fetch() : [];
  Meteor.subscribe('localities.all');
  Meteor.subscribe('clusters');

  return {
    users,
    records: Records.find({}).fetch(),
    localities: Localities.find({}).fetch(),
    clusters: Clusters.find({}).fetch(),
  };
}, AdminPage);

const mapStateToProps = (state) => ({ statisticsTable: state.statisticsTable, all: state.all });
export default connect(mapStateToProps)(container);
