import React from 'react'
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

  selectAdmLevel({ target: {name, value} }) {
    this.props.actions.changeLocationFilter(
      Object.assign(
        { [name]: value },
        name === 'administrative_area_level_1' ? { administrative_area_level_2: null, place_id: null  } : null,
        name === 'administrative_area_level_2' ? { place_id: null } : null
      )
    );
  }

  renderSelect(name, title, items) {
    return (
      <select name={name} onChange={this.selectAdmLevel}>
        <option  value="">{title}</option>
        {this.props[items].map(item => (
          <option key={item.place_id} value={item.place_id}>{item.name}</option>
        ))}
      </select>
    );
  }

  render() {
    return (
      <div className="LocationFilter-wrapper">
        <h3>Select area:</h3>
        {this.renderSelect("administrative_area_level_1", "All Ukraine", "admLevel1Items")}
        {this.props.administrative_area_level_1 ? this.renderSelect("administrative_area_level_2", "Whole region", "admLevel2Items") : ''}
        {this.props.administrative_area_level_2 ? this.renderSelect("place_id", "Whole region", "places") : ''}
      </div>
    );
  }
}

const container = createContainer(({ administrative_area_level_1, administrative_area_level_2 }) => {
  Meteor.subscribe('localities', { administrative_area_level_1, administrative_area_level_2 });
  let admLevel1Items = [], admLevel2Items = [], places = [];
  Localities.find().map((item) => {
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
    }
  });
  return { admLevel1Items, admLevel2Items, places };
}, LocationFilter);

const mapStateToProps = ({ statisticsTable }) => {
  return { ...statisticsTable };
};

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(container);