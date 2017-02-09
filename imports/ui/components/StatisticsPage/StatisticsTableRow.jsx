import React from 'react';

export default class StatisticsTableRow extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="cell coll-1">
          <span>{this.props.crop.name}</span>
        </div>
        <div className="cell coll-2">
          <span>{this.props.crop.baseSquare.toFixed(2)}</span>
        </div>
        <div className="cell coll-3">
          <span>{(this.props.cropsView.totalSquare / 1000).toFixed(2)}</span>
          {/* <span>{this.props.cropsView.harvest.toFixed(0)}</span> */}
        </div>
      </div>
    );
  }
}
