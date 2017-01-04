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
    };
    this.logout = this.logout.bind(this);
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
    this.props.actions.goToPin(locationId, fullAddress, true);
    browserHistory.push('/insert');
  }

  logout() {
    Meteor.call('LoginProcedure', this.props.user.emails[0].address);
    Meteor.logout();
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
          <div key={place_id} className="locationPin" onClick={() => this.goToPin(place_id)}>
            <LocationPin fullAddress={fullAddress} />
          </div>
        );
      }
      return undefined;
    });
  }

  render() {
    const user = this.props.user;
    if (!user) {
      return (
        <div>
          <h1>Login</h1>
          <form id="loginForm" ref="loginForm" onSubmit={this.handleLoginSubmit}>
            <input type="email" name="login-email" id="login-email" />
            <input type="submit" id="login-button" />
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Welcome { user.profile ? user.profile.name : user.emails[0].address}</h1>
          <form id="nameChangeForm" ref="nameChangeForm" onSubmit={this.onNameSubmit}>
            <span>Enter your name: </span>
            <input type="text" ref="nameChange" placeholder="Enter new name" />
            <input type="submit" />
          </form>

          <form id="emailChangeForm" ref="emailChangeForm" onSubmit={this.onEmailSubmit}>
            <p>{`Your current email: ${Meteor.user().emails[0].address}`}</p>
            <span>Enter your email: </span>
            <input type="email" ref="emailChange" placeholder="Enter new email" />
            <input type="submit" />
          </form>
          <p>Your locations: </p>
          {this.renderPins()}

          <span>Exit: </span>
          <button onClick={this.logout}> Logout </button>
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
