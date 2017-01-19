import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
// import { browserHistory } from 'react-router';
import { Crops, Groups } from '/imports/api/crops/crops.js';
// import { Records } from '/imports/api/records/records.js';
import { PseudoRecords } from '/imports/api/pseudoRecords/pseudoRecords.js';

import StatisticsTableRow from '/imports/ui/components/StatisticsPage/StatisticsTableRow.jsx';
import StatisticsTableHeader from '/imports/ui/components/StatisticsPage/StatisticsTableHeader.jsx';
import LocationFilter from '/imports/ui/components/StatisticsPage/LocationFilter.jsx';
import StatusFilter from '/imports/ui/components/StatisticsPage/StatusFilter.jsx';
import YearSelector from '/imports/ui/components/YearSelector.jsx';

import { connect } from 'react-redux';

class StatisticsPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    console.log('records >-->', this.props.records);
    // console.log('pseudo records >==>', this.props.pseudoRecords);

    // It had sorted on server
    const records = this.props && this.props.records /* .filter((item) =>
      item.marketingYear === this.props.all.marketingYear
    ).filter((item) =>
      item.status === 'planned' && this.props.statisticsTable.planned ||
      item.status === 'planted' && this.props.statisticsTable.planted ||
      item.status === 'harvested' && this.props.statisticsTable.harvested
    ) */ || [];

    const cropsView = this.props.crops.map((crop) =>
      records.filter((record) =>
        record.cropId === crop.id
      ).reduce((prev, next) =>
        ({
          cropId: prev.cropId,
          totalSquare: prev.totalSquare + Number(next.square),
          totalYield: prev.totalYield + next.square * next.cropYield,
        }),
        { cropId: crop.id, totalSquare: 0, totalYield: 0 }
      )
    );
    // console.log(':-->',cropsView);

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
            <StatisticsTableHeader />
            {this.props.groups.map(group => (
              <div key={group.id} className="group">
                <div className="head-row">
                  <div className="head">{group.name}</div>
                </div>
                {this.props.crops.filter(crop =>
                  crop.groupId === group.id
                ).map(crop => (
                  <StatisticsTableRow
                    key={crop.id}
                    crop={crop}
                    cropsView={cropsView.find((item) => item.cropId === crop.id)}
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
  // Meteor.subscribe('records.filter', { ...props.statisticsTable, ...props.all });
  const pseudoRecordsHandler = Meteor.subscribe('pseudoRecords.filter', { ...props.statisticsTable, ...props.all });
  console.log(pseudoRecordsHandler.ready());

  return {
    user,
    crops: Crops.find({}).fetch(),
    groups: Groups.find({}).fetch(),
    // records: Records.find({}).fetch(),
    records: PseudoRecords.find({}).fetch(),
  };
}, StatisticsPage);

const mapStateToProps = (state) => ({ statisticsTable: state.statisticsTable, all: state.all });

export default connect(mapStateToProps)(container);
