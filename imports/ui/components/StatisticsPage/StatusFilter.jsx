import React from 'react';

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
        <div className="float-left statistic-param">
          <div className="float-left">
            <input id="planned" className="statistic-input" type="checkbox" ref="planned" checked={this.props.state.planned} onChange={this.changeStatusFilter} />
            <label htmlFor="planned" className="checkbox-span planned">{{ ua: 'заплановано', en: 'planned' }[localStorage.getItem('language') || 'ua']}</label>
          </div>
          <div className="float-left">
            <input id="planted" className="statistic-input" type="checkbox" ref="planted" checked={this.props.state.planted} onChange={this.changeStatusFilter} />
            <label htmlFor="planted" className="checkbox-span planted">{{ ua: 'посіяно', en: 'platned' }[localStorage.getItem('language') || 'ua']}</label>
          </div>
          <div className="float-left">
            <input id="harvested" className="statistic-input" type="checkbox" ref="harvested" checked={this.props.state.harvested} onChange={this.changeStatusFilter} />
            <label htmlFor="harvested" className="checkbox-span harvested">{{ ua: 'зібрано', en: 'harvested' }[localStorage.getItem('language') || 'ua']}</label>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.statisticsTable,
});

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusFilter);
