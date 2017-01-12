import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { createContainer } from 'meteor/react-meteor-data';
// import { Localities } from '/imports/api/localities/localities.js';

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
    return (
      <div className="StatusFilter-wrapper percent-85 float-left">
        <div className="filter-title-page float-left title-color">status:</div>
        <div className="float-left statistic-param">
          <div className="float-left">
            <input className="statistic-input" type="checkbox" checked={this.props.state.planned} onChange={this.changeStatusFilter.bind(this)} ref="planned" />
            <span className="checkbox-span"> planned </span>
          </div>
          <div className="float-left">
            <input className="statistic-input" type="checkbox" defaultChecked="true" ref="planted" />
            <span className="checkbox-span"> planted </span>
          </div>
          <div className="float-left">
            <input className="statistic-input" type="checkbox" ref="harvested" />
            <span className="checkbox-span"> harvested </span>
          </div>
        </div>
      </div>
    );
  }
}

// const container = createContainer(({ params }) => {
//   const localities = Meteor.subscribe('localities.all');
//
//   return {
//     localities: Localities.find().fetch(),
//   }
// }, LocationFilter);

const mapStateToProps = (state) => ({
  state: state.statisticsTable,
});

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusFilter);
