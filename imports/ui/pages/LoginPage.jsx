import { Meteor } from 'meteor/meteor';
import React from 'react';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Localities } from '/imports/api/localities/localities.js';

import LocationPin from '/imports/ui/components/InsertPage/LocationPin.jsx';
import * as actions from '/imports/ui/actions/InsertPageActions.js';


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: {
        title: '',
        edit: false
      },
      name: {
        title: '',
        edit: false
      }
    };
    this.logout = this.logout.bind(this);
    this.logoutFromDevice = this.logoutFromDevice.bind(this);
    this.goToPin = this.goToPin.bind(this);
    this.renderPins = this.renderPins.bind(this);
    this.onNameSubmit = this.onNameSubmit.bind(this);
    this.onEmailSubmit = this.onEmailSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  componentWillMount() {
    const hash = this.props.routeParams.hash;
    const token = localStorage.getItem('auth-token');
    if (hash) {
      Meteor.call('Login', hash, (err, res) => {
        if (err) {
          console.error(err);
          localStorage.removeItem('auth-token');
        } else {
          Meteor.loginWithToken(res[1], (err) => {
            if (err) {
              console.error(err);
            } else {
              localStorage.setItem('auth-token', res[1]);
              history.pushState('', '', '/login');
            }
          });
        }
      });
    } else if (token) {
      Meteor.loginWithToken(token, (err) => {
        if (err) {
          console.error('Bad Token');
          localStorage.removeItem('auth-token');
          Meteor.logout();
        }
      });
    }
  }

  onEmailSubmit(e) {
    e.preventDefault();
    const email = this.refs.emailChange.value;
    Meteor.call('user.emailChange', email, (err, res) => {
      if (err) {
        console.error(err);
      } else { // ??????????????????????????????????????????????????
        console.log('email changed to', email, res);
      }
      console.log(Meteor.user());
    });
  }

  onNameSubmit(e) {
    e.preventDefault();
    const name = this.refs.nameChange.value;
    Meteor.call('user.nameChange', name, (err, res) => {
      if (res) {
        console.log(`name changed to ${name}`);
      }
      console.log(Meteor.user());
    });
  }

  goToPin(locationId) {
    const fullAddress = this.props.localities.find(
      (locality) => locality.place_id === locationId
    ).fullAddress;
    const placeType = this.props.localities.find(
      (locality) => locality.place_id === locationId
    ).type;
    this.props.actions.goToPin(locationId, placeType, fullAddress, true);
    browserHistory.push('/insert');
  }

  logout() {
    Meteor.call('LoginProcedure', this.props.user.emails[0].address);
    Meteor.call('Logout');
    Meteor.logout();
  }

  logoutFromDevice() {
    localStorage.clear();
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();

    Meteor.call('LoginProcedure', email, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        browserHistory.push('/redirect');
        console.log('redirecting!', res);
      }
    });
  }

  renderPins() {
    const places_id = this.props.user.profile && this.props.user.profile.locations || [];
    return places_id && places_id.map((place_id) => {
      if (this.props.localities.length) {
        // console.log(place_id,'-->',this.props.localities);
        const fullAddress = this.props.localities.find(
          (locality) => locality.place_id === place_id
        ) ? this.props.localities.find(
          (locality) => locality.place_id === place_id
        ).fullAddress : '';
        return (
          <span key={place_id} className="locationPin" onClick={() => this.goToPin(place_id)}>
            <LocationPin fullAddress={fullAddress} />
          </span>
        );
      }
      return undefined;
    });
  }

  getProfileName(email) {
    return email.substring(0, email.indexOf("@"));
  }

  setProfileName() {
    this.setState({
      name: {
        title: this.refs.nameChange.value,
        edit: true
      }
    });
  }

  setUserEmail() {
    this.setState({
      email: {
        title: this.refs.emailChange.value,
        edit: true
      }
    });
  }

  render() {
    const user = this.props.user;
    if (!user) {
      return (
        <div>
          <h1>Login</h1>
          <form id="loginForm" ref="loginForm" onSubmit={this.handleLoginSubmit}>
            <label>Email: </label>
            <input type="email" name="login-email" id="login-email" />
            <input type="submit" id="login-button" />
          </form>
        </div>
      );
    } else {
      if (!user.profile || !user.profile.name) {
        Meteor.call('user.nameChange', this.getProfileName(user.emails[0].address));
      }
      return (
        <div className="login-page">
          <div className="title-page title-color">Welcome { user.profile ? user.profile.name : user.emails[0].address}</div>
          <div className="percent-100 float-left text-left margin-top-20">
            <form id="nameChangeForm" ref="nameChangeForm" onSubmit={this.onNameSubmit}>
              <div className="float-left percent-80">
                <label className="label" htmlFor="nameChange">
                  <span>Enter your name:</span>
                  <input type="text" id="nameChange" ref="nameChange" placeholder="Enter new name" className="name-change" onChange={this.setProfileName.bind(this)} value={this.state.name.title || !this.state.name.edit && user.profile.name || ''} />
                </label>
              </div>
              <div className="float-left percent-20 text-center">
                <input className="login-submit" type="submit" />
              </div>
            </form>
          </div>
          <div className="percent-100 float-left text-left margin-top-20">
            {`Your current email: ${Meteor.user().emails[0].address}`}
          </div>
          <div className="percent-100 float-left text-left margin-top-20">
            <form id="emailChangeForm" ref="emailChangeForm" onSubmit={this.onEmailSubmit}>
              <div className="float-left percent-80">
                <label className="label" htmlFor="emailChange">
                  <span>Enter your email: </span>
                  <input id="emailChange" type="email" ref="emailChange" placeholder="Enter new email" className="name-change" onChange={this.setUserEmail.bind(this)} value={this.state.email.title || !this.state.email.edit && user.emails[0].address || ''} />
                </label>
              </div>
              <div className="float-left percent-20 text-center">
                <input className="login-submit" type="submit" />
              </div>
            </form>
          </div>
          <div className="percent-100 float-left text-left margin-top-5 margin-left-3">
            Your locations:
          </div>
          <div className="percent-100 float-left text-left margin-top-5">
            {this.renderPins()}
          </div>
          <div className="percent-100 float-left text-left">
            <span>Exit from device: </span>
            <button className="login-submit" onClick={this.logoutFromDevice}> Logout </button>
          </div>
          <div className="percent-100 float-left text-left">
            <span>Full exit: </span>
            <button className="login-submit" onClick={this.logout}> Logout </button>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });


const container = createContainer(({ params }) => {
  const user = Meteor.user();
  Meteor.subscribe('localities.all');

  return {
    user,
    localities: Localities.find({}).fetch(),
  };
}, LoginPage);

export default connect(mapStateToProps, mapDispatchToProps)(container);
