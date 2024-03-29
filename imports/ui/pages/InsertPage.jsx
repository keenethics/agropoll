import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '/imports/ui/actions/InsertPageActions.js';

import { Records } from '/imports/api/records/records.js';
import { Localities } from '/imports/api/localities/localities.js';
import { Crops, Groups } from '/imports/api/crops/crops.js';

import SearchBar from '/imports/ui/components/InsertPage/SearchBar.jsx';
import LocationPin from '/imports/ui/components/InsertPage/LocationPin.jsx';
import TableInsert from '/imports/ui/components/InsertTable/TableInsert.jsx';
import YearSelector from '/imports/ui/components/YearSelector.jsx';
import TypeSelector from '/imports/ui/components/TypeSelector.jsx';

class InsertPage extends React.Component {
  constructor(props) {
    super(props);

    this.goToPin = this.goToPin.bind(this);
    this.renderPins = this.renderPins.bind(this);
    this.saveCropData = this.saveCropData.bind(this);
    this.showModal = this.showModal.bind(this);

    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.down = false;
    this.XCoordinate = 0;
  }

  componentDidMount() {
    document.addEventListener('mouseup', () => {
      this.down = false;
    });
  }

  componentDidUpdate() {
    const pins = document.getElementsByClassName('locationPin');
    let totalSize = 0;
    if (pins[0]) {
      for (let i = 0; i < pins.length; i += 1) {
        totalSize += parseInt(pins[i].offsetWidth, 10) + 16;
      }
      document.getElementsByClassName('pin-locations')[0].style.width = `${totalSize}px`;
    }
  }

  saveCropData() {
    this.props.actions.saveData();
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
  }
  showModal() {
    this.props.actions.showModal(<SearchBar />);
  }

  mouseDown(e) {
    this.down = true;
    this.XCoordinate = e.clientX || e.nativeEvent.pageX;
  }
  mouseMove(e) {
    if (this.down) {
      const XCoord = e.clientX || e.nativeEvent.pageX;
      const difference = XCoord - this.XCoordinate;
      e.currentTarget.style.left = `${parseInt(e.currentTarget.style.left || 0, 10) + difference}px`;
      this.XCoordinate = XCoord;
    }
  }
  mouseUp(e) {
    this.down = false;
    if (parseInt(e.currentTarget.style.left, 10) > 0) {
      e.currentTarget.style.left = '0px';
    }
    const wraperWidth = parseInt(e.currentTarget.parentElement.offsetWidth, 10);
    const elementWidth = parseInt(e.currentTarget.offsetWidth, 10);
    const leftProp = parseInt(e.currentTarget.style.left, 10);
    if ((leftProp * -1) > (elementWidth - wraperWidth)) {
      e.currentTarget.style.left = `${wraperWidth - elementWidth}px`;
    }
  }

  renderTable() {
    const place_id = this.props.insertPage.place_id;
    const place = Localities.findOne({ place_id });
    const year = this.props.all.year;
    if (!(!place_id || !place || place.type !== 'locality' || !year)) {
      return (
        <div>
          <div className="control-bar-container">
            <TableInsert />
          </div>
          <div className="insert-button-container text-center padding-top-5">
            {this.props.user.profile.type === 'other' ?
              <TypeSelector type={this.props.user.profile.type} /> :
              <button className="btn btn-insert" onClick={this.saveCropData}>
                {{ ua: 'Зберегти', en: 'Save' }[localStorage.getItem('language') || 'ua']}
              </button>
            }
          </div>
        </div>
      );
    }
    return null;
  }
  renderPins() {
    const places_id = this.props.user.profile && this.props.user.profile.locations || [];
    return places_id && places_id.map((place_id) => {
      if (this.props.localities.length) {
        const fullAddress = this.props.localities.find(
          (locality) => locality.place_id === place_id
        ) && this.props.localities.find(
          (locality) => locality.place_id === place_id
        ).fullAddress;
        return (
          <div
            key={place_id}
            className={this.props.insertPage.place_id === place_id ? 'locationPin  selected' : 'locationPin '}
            onClick={() => this.goToPin(place_id)}
          >
            <LocationPin fullAddress={fullAddress} />
          </div>
        );
      }
    });
  }

  renderLocalityModal() {
    if (!this.props.insertPage.hideModal) {
      return this.props.insertPage.modalObject;
    }
    return null;
  }

  render() {
    console.info('Subscribed records:', this.props.records);

    if (Meteor.user()) {
      return (
        <div>
          {this.renderLocalityModal()}
          <div className="filter-bar">
            <div className="insert-one">
              <YearSelector />
            </div>
            <div className="insert-two">
              <div className="float-left add-location-wrapper">
                <button className="btn" onClick={this.showModal}>
                  {{ ua: 'Додати локацію', en: 'Add location' }[localStorage.getItem('language') || 'ua']}
                </button>
              </div>
              <div className="pins-wraper">
                <div
                  className="pin-locations noselect"
                  onMouseUp={this.mouseUp}
                  onMouseDown={this.mouseDown}
                  onMouseMove={this.mouseMove}
                  onTouchStart={this.mouseDown}
                  onTouchEnd={this.mouseUp}
                  onTouchMove={this.mouseMove}
                >
                  {this.renderPins()}
                </div>
              </div>
            </div>
          </div>
          {this.renderTable()}

        </div>
      );
    } else {
      return (
        <div style={{ textAlign: 'center' }}>
          <h3>
            {{
              ua: 'Для того, щоби вносити дані, будь ласка, авторизуйтеся',
              en: 'To enter your data, please authorize',
            }[localStorage.getItem('language') || 'ua']}
          </h3>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({ insertPage: state.insertPage, all: state.all });

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

const container = createContainer(({ params }) => {
  const user = Meteor.user();
  Meteor.subscribe('crops.all');
  Meteor.subscribe('groups.all');
  Meteor.subscribe('localities.all');
  const recordsHandler = Meteor.subscribe('records.user');
  console.info('Records ready:', recordsHandler.ready());

  return {
    user,
    crops: Crops.find({}).fetch(),
    groups: Groups.find({}).fetch(),
    records: Records.find({}).fetch(),
    localities: Localities.find({}).fetch(),
  };
}, InsertPage);

export default connect(mapStateToProps, mapDispatchToProps)(container);
