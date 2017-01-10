import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class FilterFooter extends React.Component {
  render() {
    return (
      <div className="footer"> {this.props.children} </div>
    );
  }
}
