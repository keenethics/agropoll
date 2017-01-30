import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class RowForGroup extends React.Component {
  render() {
    return (
      <div
        id={this.props.groupId}
        className="trow group-name cursor-pointer"
        onClick={this.props.collapseCrops}
      >
        > &nbsp;{this.props.groupName}
      </div>
    );
  }
}
