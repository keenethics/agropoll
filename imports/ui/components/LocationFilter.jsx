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
        name === 'admLevel1' ? { admLevel2: null, place: null  } : null,
        name === 'admLevel2' ? { place: null } : null
      )
    );
  }

  renderSelect(name, title, items) {
    return (
      <select name={name} onChange={this.selectAdmLevel}>
        <option  value="">{title}</option>
        {this.props[items].map(item => (
          <option key={item.placeId} value={item.placeId}>{item.name}</option>
        ))}
      </select>
    );
  }

  render() {
    return (
      <div className="LocationFilter-wrapper">
        <h3>Select area:</h3>
        {this.renderSelect("admLevel1", "All Ukraine", "admLevel1Items")}
        {this.props.admLevel1 ? this.renderSelect("admLevel2", "Whole region", "admLevel2Items") : ''}
        {this.props.admLevel2 ? this.renderSelect("place", "Whole region", "places") : ''}
      </div>
    )
  }
}

const container = createContainer(({ admLevel1, admLevel2 }) => {
  Meteor.subscribe('localities', { admLevel1, admLevel2 });
  let admLevel1Items = [], admLevel2Items = [], places = [];

  Localities.find().map((item)=> {
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

  return { admLevel1Items, admLevel2Items, places }
}, LocationFilter);

const mapStateToProps = ({ statisticsTable}) => {
  return {...statisticsTable}
};


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(container);
