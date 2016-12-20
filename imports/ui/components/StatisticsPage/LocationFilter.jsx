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

    this.state = {
      administrative_area_level_1: null // this.refs.selectAdmAreaLev1.value,
    };
  }

  selectAdmAreaLev1() {
    console.log('-->', this.refs.selectAdmAreaLev1.value);

    this.props.actions.changeLocationFilter(this.refs.selectAdmAreaLev1.value, null, null);

    this.setState({
      administrative_area_level_1: this.refs.selectAdmAreaLev1.value // this.refs.selectAdmAreaLev1.value,
    });
  }

  renderAdmAreaLev1() {
    return (<select ref="selectAdmAreaLev1" onChange={this.selectAdmAreaLev1.bind(this)}>
      <option key='null'>All Ukraine</option>
      {this.props.localities.
        filter(item => item.type === 'administrative_area_level_1' /* && item.parentId === null */).
        map(item => (<option key={item.place_id} value={item.place_id}>{item.name}</option>))}
    </select>);
  }

  selectAdmAreaLev2() {
    console.log('-->', this.refs.selectAdmAreaLev2.value);

    this.setState({
      administrative_area_level_2: this.refs.selectAdmAreaLev2.value // this.refs.selectAdmAreaLev1.value,
    });
  }

  renderAdmAreaLev2() {
    return (<select ref="selectAdmAreaLev2" onChange={this.selectAdmAreaLev2.bind(this)}>
      <option key='null' value='Whole region'>Whole region</option>
      {this.props.localities.
        filter(item => item.type === 'administrative_area_level_2' && item.parentId === this.state.administrative_area_level_1).
        map(item => (<option key={item.place_id} value={item.place_id}>{item.name}</option>))}
    </select>);
  }

  render() {
    console.log(this.props.localities);
    return (
      <div className="LocationFilter-wrapper">
        <h3>Select area:</h3>
        {this.renderAdmAreaLev1()}

        {this.renderAdmAreaLev2()}
      </div>
    )
  }
}

const container = createContainer(({ params }) => {
  const localities = Meteor.subscribe('localities.all');

  return {
    localities: Localities.find().fetch(),
  }
}, LocationFilter);

const mapStateToProps = (state) => {
  return { }
};

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(container);
