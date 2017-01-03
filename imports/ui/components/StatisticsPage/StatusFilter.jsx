import React from 'react'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Localities } from '/imports/api/localities/localities.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '/imports/ui/actions/statisticsTableActions.js';


class StatusFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // administrative_area_level_1: null // this.refs.selectAdmAreaLev1.value,
    };
  }

  changeStatusFilter(e) {
    console.log(e.target.checked);

    // this.props.actions.changeStatusFilter(this.refs.planned.value, null, null);
    //
    // this.setState({
    //   administrative_area_level_1: this.refs.selectAdmAreaLev1.value // this.refs.selectAdmAreaLev1.value,
    // });

    this.props.actions.changeStatusFilter(e.target.name, e.target.checked);
  }

  render() {
    console.log(this.props.localities);
    return (
      <div className="StatusFilter-wrapper">
        <h3>Filter by status:</h3>
        <input type="checkbox" checked={this.props.state.planned} onChange={this.changeStatusFilter.bind(this)} ref="planned" /> planned
        <input type="checkbox" defaultChecked="true" ref="planted" /> planted
        <input type="checkbox" ref="harvested" /> harvested
      </div>
    )
  }
}

// const container = createContainer(({ params }) => {
//   const localities = Meteor.subscribe('localities.all');
//
//   return {
//     localities: Localities.find().fetch(),
//   }
// }, LocationFilter);

const mapStateToProps = (state) => {
  return {
    state: state.statisticsTable
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusFilter);