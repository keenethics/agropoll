import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';

import { Records } from '/imports/api/records/records.js';
import { Localities } from '/imports/api/localities/localities.js';
import { Clusters } from '/imports/api/clusters/clusters.js';
import { Crops } from '/imports/api/crops/crops.js';


import LocationFilter from '/imports/ui/components/StatisticsPage/LocationFilter.jsx';
import StatusFilter from '/imports/ui/components/StatisticsPage/StatusFilter.jsx';
import YearSelector from '/imports/ui/components/YearSelector.jsx';

import Griddle from 'griddle-react';

import { connect } from 'react-redux';

class AdminPage extends React.Component {
  activityData() {
    return this.props.users.length && this.props.users.map((user) => ({
      User: user.emails[0].address.split('@').join(' @'),
      Crops: this.props.records.filter((item) =>
        item.userId === user._id
      ).map((item) => (
        <div key={item._id}>
          {(Crops.findOne({ id: item.cropId }) || {}).name}: {item.square} ‹{item.squareNorm.toFixed(0)}›
        </div>
      )),
      'Total square': this.props.records.filter((item) =>
        item.userId === user._id
      ).reduce((prev, next) => prev + +next.square, 0),
      '‹Normalized square›': '‹' + this.props.records.filter((item) =>
        item.userId === user._id
      ).reduce((prev, next) => prev + +next.squareNorm, 0).toFixed(0) + '›',

      Locations: user.profile.locations && this.props.localities &&
        user.profile.locations.map((place_id) => (
          <div key={place_id}>
            {(this.props.localities.find((item) =>
              item.place_id === place_id
            ) || {}).fullAddress}
          </div>
        )),
      Type: user.profile.type,
      Cluster: user.profile.cluster,
      Role: user.roles && user.roles.join('; '),
      'Ban/unban': [
        <button
          key="ban"
          onClick={() => Meteor.call(`user.${Roles.userIsInRole(user._id, 'banned') ? 'unban' : 'ban'}`, user._id)}
        >
          {Roles.userIsInRole(user._id, 'banned') ? 'unban' : 'ban'}
        </button>,
      ],
    })).filter((item) => item['Total square'] > 0);
  }

  usersData() {
    return this.props.users.length && this.props.users.map((user) => ({
      'User ID': user._id,
      Email: user.emails[0].address.split('@').join(' @'),
      Type: user.profile.type,
      'Farmland area': user.profile.farmlandArea,
      'Main region': (this.props.localities.find((item) =>
        item.place_id === user.profile.mainRegion
      ) || {}).fullAddress,
      Cluster: user.profile.cluster,
      Role: user.roles && user.roles.join('; '),
      'Ban/unban': [
        <button
          key="ban"
          onClick={() => Meteor.call(`user.${Roles.userIsInRole(user._id, 'banned') ? 'unban' : 'ban'}`, user._id)}
        >
          {Roles.userIsInRole(user._id, 'banned') ? 'unban' : 'ban'}
        </button>,
        <button
          key="admin"
          onClick={() => Meteor.call(`user.${Roles.userIsInRole(user._id, 'admin') ? 'unsetAdmin' : 'setAsAdmin'}`, user._id)}
        >
          {Roles.userIsInRole(user._id, 'admin') ? 'unset admin' : 'set as admin'}
        </button>,
      ],
    }));
  }

  clustersData() {
    return this.props.clusters.length && this.props.clusters.map((cluster) => ({
      'Cluster name': cluster.name,
      'Cluster conditions': cluster.conditions,
      'Total area per cluster': cluster.totalArea,
      'Total square submitted': cluster.totalSquare,
      'Users count': cluster.usersCount,
    }));
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
          <h1>Activity</h1>
          <Griddle
            columnMetadata={[
              { columnName: 'User' },
              { columnName: 'Crops' },
              { columnName: 'Total square', customCompareFn: (a, b) => a - b },
              { columnName: '‹Normalized square›', customCompareFn: (a, b) => a - b },
              { columnName: 'Locations' },
              { columnName: 'Type' },
              { columnName: 'Cluster' },
              { columnName: 'Role' },
              { columnName: 'Ban/unban' },
            ]}
            results={this.activityData()}
          />

          <h1>Users</h1>
          <Griddle
            columnMetadata={[
              { columnName: 'User ID' },
              { columnName: 'Email' },
              { columnName: 'Type' },
              { columnName: 'Farmland area', customCompareFn: (a, b) => a - b },
              { columnName: 'Main region' },
              { columnName: 'Cluster' },
              { columnName: 'Role' },
              { columnName: 'Ban/unban' },
            ]}
            results={this.usersData()}
          />

          <h1>Clusters</h1>
          <Griddle
            columnMetadata={[
              { columnName: 'Cluster ID' },
              { columnName: 'Cluster conditions' },
              { columnName: 'Total area per cluster', customCompareFn: (a, b) => a - b },
              { columnName: 'Total square submitted', customCompareFn: (a, b) => a - b },
              { columnName: 'Users count', customCompareFn: (a, b) => a - b },
            ]}
            results={this.clustersData()}
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
  Meteor.subscribe('crops.all');

  return {
    users,
    records: Records.find({}).fetch(),
    localities: Localities.find({}).fetch(),
    clusters: Clusters.find({}).fetch(),
    crops: Crops.find({}).fetch(),
  };
}, AdminPage);

const mapStateToProps = (state) => ({ statisticsTable: state.statisticsTable, all: state.all });
export default connect(mapStateToProps)(container);
