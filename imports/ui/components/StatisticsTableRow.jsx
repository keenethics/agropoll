import React from 'react';

export default class StatisticsTableRow extends React.Component {
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
