import React from 'react';

export default (props) => (
  <div className="row table-header">
    <div className="cell coll-1">Культура</div>
    <div className="cell coll-3">Структура посівних площ під врожай {props && props.adminSettings && props.adminSettings.baseYear} року / прогноз</div>
  </div>
);
