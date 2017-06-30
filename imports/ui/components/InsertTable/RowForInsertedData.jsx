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
    this.changeYield = this.changeYield.bind(this);
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
    console.log('[CHANGE]', e.target)
    const id = this.props.dataId;
    const square = e.target.value;
    this.props.actions.changeSquare(id, square);
  }

  changeReproduction(e) {
    const id = this.props.dataId;
    const reproduction = e.target.value;
    this.props.actions.changeReproduction(id, reproduction);
  }

  changeYield(e) {
    const id = this.props.dataId;
    const cropYield = e.target.value;
    this.props.actions.changeYield(id, cropYield);
  }

  changeStatus(e) {
    const currentValue = e.currentTarget.dataset.status;
    const recordId = this.props.dataId;
    let newStatus = 'planned';
    if (currentValue === 'planned') {
      newStatus = 'planted';
    } else if (currentValue === 'planted') {
      newStatus = 'harvested';
    }
    Meteor.call('record.updateStatus', { recordId, newStatus }, (err) => {
      if (err) {
        console.error(err);
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
            <div className="sort-conteiner">
              <input
                className="input-sort"
                type="text"
                ref={`sort${this.props.dataId}`}
                defaultValue={this.props.defaultSort}
                placeholder={{ ua: 'сорт...', en: 'sort...' }[localStorage.getItem('language') || 'ua']}
                onChange={this.changeSort}
              />
            </div>
          </div>
          <div className="reproduction-conteiner">
            <input
              className="input"
              type="text"
              ref={`reproduction${this.props.dataId}`}
              defaultValue={this.props.defaultReproduction}
              placeholder={{ ua: 'репродукція...', en: 'reproduction...' }[localStorage.getItem('language') || 'ua']}
              onChange={this.changeReproduction}
            />
          </div>
        </div>
        <div className="tcoll2 tcell">
          <input
            className="input"
            type="number"
            min="0"
            step="0.01"
            ref={`square${this.props.dataId}`}
            defaultValue={this.props.defaultSquare}
            onChange={this.changeSquare}
          />
        </div>
        <div className="tcoll3 tcell">
          <input
            className="input"
            type="number"
            min="0"
            step="0.1"
            ref={`cropYield${this.props.dataId}`}
            defaultValue={this.props.defaultYield}
            onChange={this.changeYield}
          />
        </div>
        <div
          className="tcoll4 tcell cursor-pointer"
          ref={`status${this.props.dataId}`}
          onClick={this.changeStatus}
          data-status={this.props.defaultStatus}
        >
          {{
            planned: { ua: 'Заплановано', en: 'Planned' }[localStorage.getItem('language') || 'ua'],
            planted: { ua: 'Посіяно', en: 'Planted' }[localStorage.getItem('language') || 'ua'],
            harvested: { ua: 'Зібрано', en: 'Harvested' }[localStorage.getItem('language') || 'ua'],
          }[this.props.defaultStatus]}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ });

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(RowForGroup);
