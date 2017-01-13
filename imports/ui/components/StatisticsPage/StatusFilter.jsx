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

    this.changeStatusFilter = this.changeStatusFilter.bind(this);
  }

  changeStatusFilter() {
    const statuses = {
      planned: this.refs.planned.checked,
      planted: this.refs.planted.checked,
      harvested: this.refs.harvested.checked,
    };
    this.props.actions.changeStatusFilter(statuses);
  }

  render() {
    return (
      <div className="StatusFilter-wrapper percent-85 float-left">
        <div className="filter-title-page float-left title-color">Filter by status:</div>
        <div className="float-left statistic-param">
          <div className="float-left">
            <input className="statistic-input" type="checkbox" ref="planned" checked={this.props.state.planned} onChange={this.changeStatusFilter} />
            <span className="checkbox-span">planned</span>
          </div>
          <div className="float-left">
            <input className="statistic-input" type="checkbox" ref="planted" checked={this.props.state.planted} onChange={this.changeStatusFilter} />
            <span className="checkbox-span">planted</span>
          </div>
          <div className="float-left">
            <input className="statistic-input" type="checkbox" ref="harvested" checked={this.props.state.harvested} onChange={this.changeStatusFilter} />
            <span className="checkbox-span">harvested</span>
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
