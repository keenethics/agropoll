import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Crops, Groups } from '/imports/api/crops/crops.js';
import { Records } from '/imports/api/records/records.js';
import { AdminSettings } from '/imports/api/adminSettings/adminSettings.js';

import StatisticsTableRow from '/imports/ui/components/StatisticsPage/StatisticsTableRow.jsx';
import StatisticsTableHeader from '/imports/ui/components/StatisticsPage/StatisticsTableHeader.jsx';
import LocationFilter from '/imports/ui/components/StatisticsPage/LocationFilter.jsx';
import StatusFilter from '/imports/ui/components/StatisticsPage/StatusFilter.jsx';
import YearSelector from '/imports/ui/components/YearSelector.jsx';

import { connect } from 'react-redux';

class StatisticsPage extends React.Component {

  render() {
    console.info('Subscribed records:', this.props.records);

    // It had sorted on server
    const records = this.props && this.props.records || [];

    const statuses = {
      planned: this.props.statisticsTable.planned,
      planted: this.props.statisticsTable.planted,
      harvested: this.props.statisticsTable.harvested,
    };
    console.log('statuses =', statuses);

    const cropsView = this.props.crops.map((crop) =>
      records.filter((record) =>
        record.cropId === crop.id &&
        // Filtering by status
        statuses[record.status]
      ).reduce((prev, next) =>
        ({
          cropId: prev.cropId,
          totalSquare: prev.totalSquare + +next.squareNorm,
          harvest: prev.harvest + next.squareNorm * next.cropYield,
        }),
        { cropId: crop.id, totalSquare: 0, harvest: 0 }
      )
    );

    const totalSquareByRegion = {
      base: this.props.crops.reduce((sum, crop) =>
        sum + +crop.squares[this.props.statisticsTable.administrative_area_level_1],
        0
      ),
      forecast: records.reduce((sum, record) =>
        sum + +record.squareNorm,
        0
      ),
    };
    console.log('Total square in region =', totalSquareByRegion);

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
          <div className="table-container">
            <StatisticsTableHeader adminSettings={this.props.adminSettings} />
            {this.props.groups.map(group => (
              <div key={group.id} className="group">
                <div className="head-row">
                  <div className="head">{group.name}</div>
                </div>
                {this.props.crops.filter(crop =>
                  crop.groupId === group.id
                ).map(crop => (
                  <StatisticsTableRow
                    regionId={this.props.statisticsTable.administrative_area_level_1}
                    key={crop.id}
                    crop={crop}
                    cropsView={cropsView.find((item) => item.cropId === crop.id)}
                    totalSquareByRegion={totalSquareByRegion}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const container = createContainer((props) => {
  const user = Meteor.user();
  Meteor.subscribe('crops.all');
  Meteor.subscribe('groups.all');
  const recordsHandler = Meteor.subscribe('records.filter', { ...props.statisticsTable, ...props.all });
  console.info('Records ready:', recordsHandler.ready());
  const records = recordsHandler.ready() ? Records.find({}).fetch() : [];
  Meteor.subscribe('adminSettings');

  return {
    user,
    crops: Crops.find({}, { sort: { id: 1 } }).fetch(),
    groups: Groups.find({}, { sort: { id: 1 } }).fetch(),
    records,
    adminSettings: AdminSettings.findOne(),
  };
}, StatisticsPage);

const mapStateToProps = (state) => ({ statisticsTable: state.statisticsTable, all: state.all });

export default connect(mapStateToProps)(container);
