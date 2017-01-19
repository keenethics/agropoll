import React from 'react';

export default class StatisticsTableRow extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="row">
        <div className="cell coll-1">
          <span>{this.props.crop.name}</span>
        </div>
        <div className="cell coll-2">
          <span>{this.props.cropsView.totalSquare}</span>
        </div>
        <div className="cell coll-3">
          <span>{this.props.cropsView.harvest}</span>
        </div>
      </div>
    );
  }
}
