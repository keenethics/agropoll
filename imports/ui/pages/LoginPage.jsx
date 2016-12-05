import React from 'react'
import { browserHistory, Link } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
    this.logout = this.logout.bind(this);
    this.onNameSubmit = this.onNameSubmit.bind(this);
    this.onEmailSubmit = this.onEmailSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
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
            Meteor.logout();
            localStorage.removeItem('auth-hash');
          }
        })
      });
    }
  }

  logout() {
    Meteor.call('LoginProcedure', this.props.user.emails[0].address);
    Meteor.logout();
  }

  onEmailSubmit(e) {
    e.preventDefault();
    const email = this.refs.emailChange.value;
    Meteor.call('user.emailChange', email, (err, res) => {
      if(err)
        console.error(err);
      else
        console.log('email changed to ' + email)
        console.log(Meteor.user());
    })
  }

  onNameSubmit(e) {
    e.preventDefault()
    const name = this.refs.nameChange.value;
    Meteor.call('user.nameChange', name, (err, res) => {
      if(res)
        console.log('name changed to ' + name)
        console.log(Meteor.user());
    })
  }

  handleLoginSubmit(e){
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
    const user = this.props.user;
    if (!user){
      return(
        <div>
          <h1>Login</h1>
          <form id="loginForm" ref="loginForm" onSubmit={this.handleLoginSubmit}>
            <input type="email" name="login-email" id="login-email" />
            <input type="submit"  id="login-button" />
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Welcome { user.profile ? user.profile.name : user.emails[0].address}</h1>
          <form id="nameChangeForm" ref="nameChangeForm" onSubmit={this.onNameSubmit}>
            <input type="text" ref="nameChange" placeholder="Enter new name"/>
            <input type="submit" />
          </form>

          <form id="emailChangeForm" ref="emailChangeForm" onSubmit={this.onEmailSubmit}>
            <input type="email" ref="emailChange" placeholder="Enter new email" />
            <input type="submit" />
          </form>

          <button onClick={this.logout}> Logout </button>
        </div>
      )
    }
  }
}

export default createContainer (( {params} ) => {
  const user = Meteor.user();

  return {
    user
  }
}, LoginPage)
