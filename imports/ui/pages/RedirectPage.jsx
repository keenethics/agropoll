import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'


export default class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return(
      <h2> This Page gonna redirect you somewhere </h2>
    )
  }

}
