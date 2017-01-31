import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Localities } from '/imports/api/localities/localities.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '/imports/ui/actions/statisticsTableActions.js';


class LocationFilter extends React.Component {
  constructor(props) {
    super(props);
    this.selectAdmLevel = this.selectAdmLevel.bind(this);
  }

  selectAdmLevel({ target: { name, value } }) {
    this.props.actions.changeLocationFilter(
      Object.assign(
        { [name]: value },
        name === 'administrative_area_level_1' ? { administrative_area_level_2: null, place_id: null } : null,
        name === 'administrative_area_level_2' ? { place_id: null } : null
      )
    );
  }

  renderSelect(name, title, items) {
    return (
      <div className="float-left filter-select-container">
        <select className="select-filter" name={name} onChange={this.selectAdmLevel}>
          <option className="select-filter-option" value="">{title}</option>
          {this.props[items].map(item => (
            <option className="select-filter-option" key={item.place_id} value={item.place_id}>{item.name}</option>
          ))}
        </select>
      </div>
    );
  }

  render() {
    return (
      <div className="LocationFilter-wrapper percent-100 float-left">
        {this.renderSelect('administrative_area_level_1', 'Вся Україна', 'admLevel1Items')}
        {/*
        {this.props.administrative_area_level_1 ? this.renderSelect('administrative_area_level_2', 'Whole region', 'admLevel2Items') : ''}
        {this.props.administrative_area_level_2 ? this.renderSelect('place_id', 'Whole district', 'places') : ''}
        */}
      </div>
    );
  }
}

const container = createContainer(({
  administrative_area_level_1,
  administrative_area_level_2,
}) => {
  Meteor.subscribe('localities', {
    administrative_area_level_1,
    administrative_area_level_2,
  });
  const admLevel1Items = [];
  const admLevel2Items = [];
  const places = [];
  Localities.find().forEach((item) => {
    switch (item.type) {
      case 'administrative_area_level_1': {
        admLevel1Items.push(item);
        break;
      }
      case 'administrative_area_level_2': {
        admLevel2Items.push(item);
        break;
      }
      case 'locality': {
        places.push(item);
        break;
      }
      default: break;
    }
  });
  return { admLevel1Items, admLevel2Items, places };
}, LocationFilter);

const mapStateToProps = ({ statisticsTable }) => ({ ...statisticsTable });

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(container);
