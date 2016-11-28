import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    var token = this.props.routeParams.token || Storage.get('auth-hash');
    if (token){
      Meteor.call('Login', token, (err, res) => {
        if (err)
          Storage.remove('auth-hash');
        Meteor.loginWithToken(response[1], (err) => {
          if(err){
            console.error('ERROR');
          } else {
            browserHistory.push('/')
          }
        })
      };
    }
  }

  handleSubmit(e){
    e.preventDefault();
    var email = document.getElementById('#login-email').value.trim();
    var password = 132;
    var sessionHash = Storage.get('auth-hash');

    Meteor.call('LoginProcedure', email, (err, res) => {
      if(err){
        if (err.error === 400)
          Storage.remove('auth-hash');
      } else if (response[0] === 200) {
        Meteor.loginWithToken(response[1], (err) => {
          if(err){
            console.error('ERROR');
          } else {
            browserHistory.push('/')
          }
        })
        Storage.set('auth-hash', response[1])
    })
  }

  render() {
    <div>
      <h1>Login</h1>
      <form id="loginForm" onSubmit={this.handleSubmit}>
        <input type="email" id="login-email"/>
        <input type="submit" id="login-button"/>
      </form>
    </div>
  }
}
