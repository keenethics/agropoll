import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class TypeSelector extends React.Component {
  changeType() {
    Meteor.call('user.changeType', this.refs.type.value);
  }

  render() {
    return (
      <div>
        <label className="label" htmlFor="selectType">
          {{
            ua: 'Вкажіть тип господарства, щоби дані відображалися в загальній статистиці',
            en: 'Select type of farmland so data will be appeared in overall statistics',
          }[localStorage.getItem('language') || 'ua']}
          <select
            ref="type"
            id="selectType"
            onChange={this.changeType.bind(this)}
            value={this.props.type}
            className="select-filter"
          >
            <option value="other" className="select-filter-option">
              {{ ua: 'Інше (внесені дані не враховуються)', en: 'Other (data isn\'t included)' }[localStorage.getItem('language') || 'ua']}
            </option>
            <option value="enterprise" className="select-filter-option">
              {{ ua: 'Сільськогосподарське підприємство', en: 'Agricultural enterprise' }[localStorage.getItem('language') || 'ua']}
            </option>
            <option value="household" className="select-filter-option">
              {{ ua: 'Особисте селянське господарство', en: 'Household' }[localStorage.getItem('language') || 'ua']}
            </option>
          </select>
        </label>
      </div>
    );
  }
}
