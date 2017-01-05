import React from 'react';

export default class StatisticsTableRow extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  sumOfSquares(cropId) {
    return this.props.records.filter((item) =>
      item.cropId === cropId
    ).reduce((sum, item) =>
      sum + +item.square, 0
    );
    // /* region filter?  */     filter((item) => item.cropId === localStorage.administrative_area_level_1 || localStorage.administrative_area_level_1 === null).
    // спробувати або через event emitter або через БД
  }

  avgCropCapacity(cropId) {
    return this.totalYield(cropId) / this.sumOfSquares(cropId);
  }

  totalYield(cropId) {
    return this.props.records.filter((item) =>
      item.cropId === cropId
    ).reduce((sum, item) =>
      sum + item.square * item.cropCapacity, 0
    );
  }

  render() {
    return (
      <div className="row">
        <div className="cell coll-1">{this.props.crop.name}</div>
        <div className="cell coll-2">
          {this.sumOfSquares(this.props.crop.id)}
        </div>
        <div className="cell coll-3">
          {this.totalYield(this.props.crop.id)}
        </div>
      </div>
    );
  }
}
