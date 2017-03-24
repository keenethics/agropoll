import React from 'react';

export default (props) => (
  <div className="row table-header">
    <div className="cell coll-1">
      {{ ua: 'Культура', en: 'Crops' }[localStorage.getItem('language') || 'ua']}
    </div>
    <div className="cell coll-3">
      {{ ua: 'Структура посівних площ під врожай ', en: 'The structure of areas under crops for ' }[localStorage.getItem('language') || 'ua']}
      {props && props.adminSettings && props.adminSettings.baseYear}
      {{ ua: ' року / прогноз', en: ' year / forecast' }[localStorage.getItem('language') || 'ua']}
    </div>
  </div>
);
