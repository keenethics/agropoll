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
          Вкажіть тип господарства, щоби дані відображалися в загальній статистиці
          <select
            ref="type"
            id="selectType"
            onChange={this.changeType.bind(this)}
            value={this.props.type}
            className="select-filter"
          >
            <option value="other" className="select-filter-option">Інше (внесені дані не враховуються)</option>
            <option value="enterprise" className="select-filter-option">Сільськогосподарське підприємство</option>
            <option value="household" className="select-filter-option">Особисте селянське господарство</option>
          </select>
        </label>
      </div>
    );
  }
}
