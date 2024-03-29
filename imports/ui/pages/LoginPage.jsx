import { Meteor } from 'meteor/meteor';
import React from 'react';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Localities } from '/imports/api/localities/localities.js';

import LocationPin from '/imports/ui/components/InsertPage/LocationPin.jsx';
import TypeSelector from '/imports/ui/components/TypeSelector.jsx';
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
    this.setProfileName = this.setProfileName.bind(this);
    this.changeType = this.changeType.bind(this);
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
      } else { // ??
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

  getProfileName(email) {
    return email.substring(0, email.indexOf('@'));
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

  goToPin(locationId) {
    const fullAddress = this.props.localities.find(
      (locality) => locality.place_id === locationId
    ).fullAddress;
    const placeType = this.props.localities.find(
      (locality) => locality.place_id === locationId
    ).type;
    localStorage.setItem('place_id', locationId);
    localStorage.setItem('placeType', placeType);
    localStorage.setItem('fullAddress', fullAddress);
    this.props.actions.goToPin(locationId, placeType, fullAddress, true);
    browserHistory.push('/insert');
  }

  goToEmail(domain) {
    const emailServices = [
      {
        domain: 'gmail.com',
        url: 'https://mail.google.com'
      },
      {
        domain: 'ukr.net',
        url: 'https://mail.ukr.net'
      },
      {
        domain: 'outlook.com',
        url: 'https://outlook.live.com'
      },
      {
        domain: 'yandex.ru',
        url: 'https://mail.yandex.ru'
      },
      {
        domain: 'mail.ru',
        url: 'https://mail.ru'
      },
      {
        domain: 'zoho.com',
        url: 'https://www.zoho.com/mail/'
      },
      {
        domain: 'icloud.com',
        url: 'https://www.icloud.com/mail'
      },
      {
        domain: 'rambler.ru',
        url: 'https://mail.rambler.ru'
      },
      {
        domain: 'yahoo.com',
        url: 'https://mail.yahoo.com'
      }
    ];

    return (emailServices.find((item) => item.domain === domain) || { url: null }).url;
  }

  handleLoginSubmit(e) {
    e.preventDefault();

    this.props.actions.startSpinner();
    const email = document.getElementById('login-email').value.trim();

    Meteor.call('LoginProcedure', email, localStorage.getItem('language'), (err, res) => {
      this.props.actions.hideSpinner();

      if (err) {
        console.error(err);
      } else {
        const url = this.goToEmail(email.substring(email.indexOf('@') + 1));
        if (url) {
          document.location.href = url;
        } else {
          browserHistory.push('/redirect');
          console.log('redirecting!', res);
        }
      }
    });
  }

  logout() {
    Meteor.call('LoginProcedure', this.props.user.emails[0].address, localStorage.getItem('language'));
    Meteor.call('Logout');
    Meteor.logout();
  }

  logoutFromDevice() {
    localStorage.clear();
  }

  renderPins() {
    const places_id = this.props.user.profile && this.props.user.profile.locations || [];
    return places_id && places_id.map((place_id) => {
      if (this.props.localities.length) {
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

  changeType() {
    Meteor.call('user.changeType', this.refs.type.value);
  }

  render() {
    const user = this.props.user;
    if (!user) {
      return (
        <div className="login-page">
          <h3>
            {{
              ua: 'Для входу чи реєстрації вкажіть Ваш e-mail. Ми надішлемо вам одноразове посилання для входу на вказану пошту',
              en: 'To sign in/up type your e-mail. We\'ll send you one-time link for enter the site on specified e-mail',
            }[localStorage.getItem('language') || 'ua']}
          </h3>
          <form id="loginForm" ref="loginForm" onSubmit={this.handleLoginSubmit}>
            <input
              type="email"
              name="login-email"
              id="login-email"
              placeholder={{ ua: 'Ваша@пошта', en: 'Your@email' }[localStorage.getItem('language') || 'ua']}
            />
            <input
              type="submit"
              id="login-button"
              value={{ ua: 'Надіслати', en: 'Send' }[localStorage.getItem('language') || 'ua']}
            />
          </form>
        </div>
      );
    }
    return (
      <div className="login-page">
        <div className="title-page title-color">
          {{ ua: 'Вітаємо', en: 'Hi' }[localStorage.getItem('language') || 'ua']}, { user.profile ? user.profile.name : user.emails[0].address}
        </div>

        {/*
        <div className="percent-100 float-left text-left margin-top-20">
          <form id="nameChangeForm" ref="nameChangeForm" onSubmit={this.onNameSubmit}>
            <div className="float-left percent-80">
              <label className="label" htmlFor="nameChange">
                <span>Enter your name:</span>
                <input
                  type="text"
                  id="nameChange"
                  ref="nameChange"
                  placeholder="Enter new name"
                  className="name-change"
                  onChange={this.setProfileName}
                  value={this.state.name.title || !this.state.name.edit && user.profile.name || ''}
                />
              </label>
            </div>
            <div className="float-left percent-20 text-center">
              <input className="login-submit" type="submit" />
            </div>
          </form>
        </div>

        <div className="percent-100 float-left text-left margin-top-20">
          <form id="emailChangeForm" ref="emailChangeForm" onSubmit={this.onEmailSubmit}>
            <div className="float-left percent-80">
              <label className="label" htmlFor="emailChange">
                <span>Enter your email: </span>
                <input
                  id="emailChange"
                  type="email"
                  ref="emailChange"
                  placeholder="Enter new email"
                  className="name-change"
                  onChange={this.setUserEmail.bind(this)}
                  value={this.state.email.title || !this.state.email.edit && user.emails[0].address || ''}
                />
              </label>
            </div>
            <div className="float-left percent-20 text-center">
              <input className="login-submit" type="submit" />
            </div>
          </form>
        </div>
        */}

        <div className="percent-100 text-left margin-top-20">
          <div className="percent-80">
            <TypeSelector type={user.profile.type} />
          </div>
        </div>

        <div className="percent-100 text-left margin-top-5 margin-left-3">
          {{ ua: 'Внесені площі:', en: 'Entered localities:' }[localStorage.getItem('language') || 'ua']}
        </div>
        <div className="percent-100 text-left margin-top-5">
          {this.renderPins()}
        </div>
        <div className="percent-100 text-left">
          <span>
            {{ ua: 'Вийти на цьому пристрої: ', en: 'Exit this device: ' }[localStorage.getItem('language') || 'ua']}
          </span>
          <button className="login-submit" onClick={this.logoutFromDevice}>
            {{ ua: 'Вихід', en: 'Exit' }[localStorage.getItem('language') || 'ua']}
          </button>
        </div>
        <div className="percent-100 text-left">
          <span>
            {{ ua: 'Вийти на всіх пристроях: ', en: 'Exit all devices: ' }[localStorage.getItem('language') || 'ua']}
          </span>
          <button className="login-submit" onClick={this.logout}>
            {{ ua: 'Вихід', en: 'Exit' }[localStorage.getItem('language') || 'ua']}
          </button>
        </div>
      </div>
    );
  }
  // }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

const container = createContainer(() => {
  const user = Meteor.user();
  Meteor.subscribe('localities.all');

  return {
    user,
    localities: Localities.find({}).fetch(),
  };
}, LoginPage);

export default connect(mapStateToProps, mapDispatchToProps)(container);
