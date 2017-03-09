import React from 'react';

export default class StatisticsTableHeader extends React.Component {
  render() {
    return (
      <div className="row table-header">
        <div className="cell coll-1">Культура</div>
        <div className="cell coll-3">Структура посівних площ під врожай {this.props.adminSettings && this.props.adminSettings.baseYear} року / прогноз</div>
      </div>
    );
  }
}
