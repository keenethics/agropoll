import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class RowForGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="trow">
        <div className="tcoll0" onClick={this.props.collapseCrops} >++++</div>
        {this.props.groupName}
      </div>
    )
  }
}
