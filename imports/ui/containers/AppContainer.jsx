import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'

export default class AppContainer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Container</h3>
        {this.props.children}
      </div>
    )
  }
}
