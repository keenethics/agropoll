import React from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '/imports/ui/actions/insertTableActions.js';

class RowForGroup extends React.Component {
  constructor(props) {
    super(props);

    this.changeSort = this.changeSort.bind(this);
    this.changeSquare = this.changeSquare.bind(this);
    this.changeReproduction = this.changeReproduction.bind(this);
    this.changeCapacity = this.changeCapacity.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  changeSort(e) {
    const id = this.props.dataId;
    const sort = e.target.value;
    this.props.actions.changeSort(id, sort);
  }

  changeSquare(e) {
    const id = this.props.dataId;
    const square = e.target.value;
    this.props.actions.changeSquare(id, square);
  }

  changeReproduction(e) {
    const id = this.props.dataId;
    const reproduction = e.target.value;
    this.props.actions.changeReproduction(id, reproduction);
  }

  changeCapacity(e) {
    const id = this.props.dataId;
    const capacity = e.target.value;
    this.props.actions.changeCapacity(id, capacity);
  }

  changeStatus(e) {
    const id = this.props.dataId;
    const status = e.target.value;
    this.props.actions.changeStatus(id, status);
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
            onChange={this.changeSort}
          />
          <input className="input"
            type="text"
            ref={"reproduction"+this.props.dataId}
            defaultValue={this.props.defaultReproduction}
            placeholder="репродукція"
            onChange={this.changeReproduction}
          />
        </div>
        <div className="tcoll2 tcell">
          <input className="input"
            type="number"
            ref={"square"+this.props.dataId}
            defaultValue={this.props.defaultSquare}
            onChange={this.changeSquare}
          />
        </div>
        <div className="tcoll3 tcell">
          <input className="input"
            type="number"
            ref={"cropCapacity"+this.props.dataId}
            defaultValue={this.props.defaultCapacity}
            onChange={this.changeCapacity}
          />
        </div>
        <div className="tcoll4 tcell">
          <input className="input"
            type="text"
            ref={"status"+this.props.dataId}
            defaultValue={this.props.defaultStatus}
            onChange={this.changeStatus}
          />
        </div>
        <div className="tcoll5 " onClick={this.props.removeRow}>Remove</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { }
};

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(RowForGroup);
