import React from 'react';

export default class StatisticsTableRow extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="cell coll-1">
          <span>{this.props.crop.name}</span>
        </div>
        <div className="cell coll-2">
          <span>{this.props.crop.squares[this.props.regionId].toFixed(2)}</span>
        </div>
        <div className="cell coll-3">
          <div
            className="square-forecast"
            title={(this.props.cropsView.totalSquare / 1000).toFixed(2)}
          >
            <div
              className="square-base"
              style={{ width: `${100 * this.props.crop.squares[this.props.regionId] / (this.props.crop.squares[this.props.regionId] + (this.props.cropsView.totalSquare / 1000))}%` }}
              title={this.props.crop.squares[this.props.regionId].toFixed(2)}
            >
            </div>
          </div>
        </div>
        <div className="cell coll-4">
          <span>{(this.props.cropsView.totalSquare / 1000).toFixed(2)}</span>
          {/* <span>{this.props.cropsView.harvest.toFixed(0)}</span> */}
        </div>
      </div>
    );
  }
}
