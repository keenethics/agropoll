import React from 'react'
import { browserHistory, Link } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    var token = this.props.routeParams.token ;
    if (token) {
      localStorage.setItem('auth-hash', token )
    } else {
      token = localStorage.getItem('auth-hash')
    }

    if (token){
      Meteor.call('Login', token, (err, res) => {
        if (err)
          localStorage.removeItem('auth-hash');
        Meteor.loginWithToken(res[1], (err) => {
          if(err){
            console.error('Bad Token');
            localStorage.removeItem('auth-hash');
          } else {
            browserHistory.push('/')
          }
        })
      });
    }
  }

  handleSubmit(e){
    e.preventDefault();
    var email = document.getElementById('login-email').value.trim();
    var password = 132;
    var sessionHash = localStorage.getItem('auth-hash');

    Meteor.call('LoginProcedure', email, (err, res) => {
      if (err) {
        console.error(err);
      } else if (res[0] === 200) {
        browserHistory.push('/redirect')
        console.log('reddirecting!');
      }
    })
  }

  render() {
    return(
      <div>
        <h1>Login</h1>
        <form id="loginForm" onSubmit={this.handleSubmit}>
          <input type="email" name="login-email" id="login-email" />
          <input type="submit"  id="login-button" />
        </form>
      </div>
    )
  }
}
