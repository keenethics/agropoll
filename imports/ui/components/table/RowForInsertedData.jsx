import React from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';

export default class RowForGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="trow">
        <div className="tcoll0 "></div>
        <div className="tcoll1 tcell">
          <input className="input"
            type="text"
            ref={"sort"+this.props.dataId}
            defaultValue={this.props.defaultSort}
            placeholder="сорт"
          />
          <input className="input"
            type="text"
            ref={"reproduction"+this.props.dataId}
            defaultValue={this.props.defaultReproduction}
            placeholder="репродукція"
          />
        </div>
        <div className="tcoll2 tcell">
          <input className="input"
            type="number"
            ref={"square"+this.props.dataId}
            defaultValue={this.props.defaultSquare}
          />
        </div>
        <div className="tcoll3 tcell">
          <input className="input"
            type="number"
            ref={"cropCapacity"+this.props.dataId}
            defaultValue={this.props.defaultCapacity}
          />
        </div>
        <div className="tcoll4 tcell">
          <input className="input"
            type="text"
            ref={"status"+this.props.dataId}
            defaultValue={this.props.defaultStatus}
          />
        </div>
        <div className="tcoll5 " onClick={this.props.removeRow}>Remove</div>
      </div>
    )
  }
}
