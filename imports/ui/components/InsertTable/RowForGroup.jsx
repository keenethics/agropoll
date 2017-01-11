import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class RowForGroup extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="trow insert-group">
        <div
          className="trow expand tcoll0"
          id={this.props.groupId}
          onClick={this.props.collapseCrops}
        >
          <div className="insert-list"> > </div>
        </div>
        <div className="trow group-name">{this.props.groupName}</div>
      </div>
    );
  }
}
