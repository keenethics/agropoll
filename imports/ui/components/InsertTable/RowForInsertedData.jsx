import { Meteor } from 'meteor/meteor';
import React from 'react';
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

  componentWillMount() {
    this.props.addInputData(this.props.cropData);
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
    const currentValue = e.currentTarget.innerText;
    const recordId = this.props.dataId;
    let newStatus = 'planned';
    if (currentValue === 'planned') {
      newStatus = 'planted';
    } else if (currentValue === 'planted') {
      newStatus = 'harvested';
    }
    e.currentTarget.innerText = newStatus;
    Meteor.call('record.updateStatus', { recordId, newStatus }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  render() {
    return (
      <div className="trow-crop">
        <div className="tcoll1 tcell">
          <div
            className="cropName"
          >
            <div
              className="remove-crop"
              onClick={this.props.removeRow}
            >
              &ndash;
            </div>
            <input
              className="input-sort"
              type="text"
              ref={`sort${this.props.dataId}`}
              defaultValue={this.props.defaultSort}
              placeholder="сорт ..."
              onChange={this.changeSort}
            />
          </div>
          <input
            className="input"
            type="text"
            ref={`reproduction${this.props.dataId}`}
            defaultValue={this.props.defaultReproduction}
            placeholder="репродукція ..."
            onChange={this.changeReproduction}
          />
        </div>
        <div className="tcoll2 tcell">
          <input
            className="input"
            type="number"
            ref={`square${this.props.dataId}`}
            defaultValue={this.props.defaultSquare}
            onChange={this.changeSquare}
          />
        </div>
        <div className="tcoll3 tcell">
          <input
            className="input"
            type="number"
            ref={`cropCapacity${this.props.dataId}`}
            defaultValue={this.props.defaultCapacity}
            onChange={this.changeCapacity}
          />
        </div>
        <div
          className="tcoll4 tcell cursor-pointer"
          ref={`status${this.props.dataId}`}
          onClick={this.changeStatus}
        >
          {this.props.defaultStatus}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ });

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(RowForGroup);
