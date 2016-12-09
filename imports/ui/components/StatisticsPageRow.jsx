import React from 'react';
// import { createContainer } from 'meteor/react-meteor-data';
// import { browserHistory } from 'react-router';
// import { Crops, Groups } from '/imports/api/crops/crops.js';
// import { Records } from '/imports/api/records/records.js';
// import SearchBar from '/imports/ui/components/SearchBar.jsx';

export default class StatisticsPageRow extends React.Component {
  constructor(props) {
    super(props);
  }

  sumOfSquares(cropId) {
    return this.props.records.
      filter((item) => item.cropId === cropId).
      reduce((sum, item) => sum + +item.square, 0);
  }

  avgCropCapacity(cropId) {

    return this.totalYield(cropId) / this.sumOfSquares(cropId);

  }

  totalYield(cropId) {
    return this.props.records.
      filter((item) => item.cropId === cropId).
      reduce((sum, item) => sum + item.square * item.cropCapacity, 0);
  }

  render() {
    return (
      <div className="row">
        <div className="cell"></div>
        <div className="cell">{this.props.crop.name}</div>
        <div className="cell">
          {this.sumOfSquares(this.props.crop.id)}
        </div>
        <div className="cell">
          {this.totalYield(this.props.crop.id)}
        </div>
        <div className="cell"></div>
      </div>
    );
  }
}
