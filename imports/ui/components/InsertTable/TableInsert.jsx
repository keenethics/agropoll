import React from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { bindActionCreators } from 'redux';

import { Records } from '/imports/api/records/records.js';
import { Localities } from '/imports/api/localities/localities.js';
import { Crops, Groups } from '/imports/api/crops/crops.js';

import * as insertPageActions from '/imports/ui/actions/InsertPageActions.js';
import * as insertTableActions from '/imports/ui/actions/insertTableActions.js';

import RowForCrop from './RowForCrop.jsx';
import RowForGroup from './RowForGroup.jsx';
import TableHeader from './TableHeader.jsx';
import RowForInsertedData from './RowForInsertedData.jsx';

class TableInsert extends React.Component {
  constructor(props) {
    super(props);

    this.addCropElem = this.addCropElem.bind(this);
    this.collapseCrops = this.collapseCrops.bind(this);
    this.removeCropRow = this.removeCropRow.bind(this);
    this.hasUserThisCrop = this.hasUserThisCrop.bind(this);
    this.renderTableRows = this.renderTableRows.bind(this);
    this.renderCropsRows = this.renderCropsRows.bind(this);
    this.renderInsertedCropsRows = this.renderInsertedCropsRows.bind(this);
  }

  getSquareValue(cropId) {
    const place_id = this.props.insertPage.place_id;
    const userId = this.props.user._id;
    const marketingYear = this.props.insertPage.marketingYear;
    return this.props.records.filter((record) =>
      record.cropId === cropId &&
      record.location.place_id === place_id &&
      record.userId === userId && record.marketingYear === marketingYear
    ).reduce((a, b) => a + +b.square, 0);
  }

  getAvgCapacityValue(cropId, square) {
    const place_id = this.props.insertPage.place_id;
    const userId = this.props.user._id;
    const marketingYear = this.props.insertPage.marketingYear;

    const capacity = this.props.records.filter((record) =>
      record.cropId === cropId &&
      record.location.place_id === place_id &&
      record.userId === userId &&
      record.marketingYear === marketingYear
    ).reduce((a, b) => a + (+b.square * +b.cropCapacity), 0);
    return capacity / square;
  }

  hasUserThisCrop(crop) {
    return this.props.records.find((elem) => (
      elem.cropId === crop.id &&
      elem.location.place_id === this.props.insertPage.place_id &&
      elem.marketingYear === this.props.insertPage.marketingYear
    ));
    // return true;
  }

  collapseCrops(e) {
    const elementsToHide = e.target.parentElement.parentElement.children;
    const arrElementsToHide = Array.prototype.slice.call(elementsToHide);

    this.props.insertPageActions.showCrops();
    arrElementsToHide.shift(); // remove the name of crop
    arrElementsToHide.forEach((elem) => {
      elem.className = elem.className.replace(' hidden', '');
    });
  }

  removeCropRow(id) {
    Meteor.call('record.removeOne', id);
  }

  addCropElem(cropId) {
    const place_id = this.props.insertPage.place_id;
    const placeType = this.props.insertPage.placeType;
    const marketingYear = this.props.insertPage.marketingYear;

    if (place_id && placeType === 'locality' && marketingYear) {
      Meteor.call('record.insert', {
        marketingYear,
        reproduction: '',
        cropCapacity: 0,
        place_id,
        cropId,
        square: 0,
        status: 'planned',
        sort: '',
      });
    } else {
      alert('no place selected');
    }
  }

  renderInsertedCropsRows(crop) {
    const place_id = this.props.insertPage.place_id;
    const userId = this.props.user._id;
    const marketingYear = this.props.insertPage.marketingYear;
    const cropsData = Records.find({
      cropId: crop.id,
      'location.place_id': place_id,
      userId,
      marketingYear,
    });
    return cropsData.map((cropData) => {
      this.props.insertTableActions.addInputData(cropData);
      return (
        <div key={cropData._id}>
          <RowForInsertedData
            dataId={cropData._id}
            defaultSort={cropData.sort}
            defaultReproduction={cropData.reproduction}
            defaultSquare={cropData.square}
            defaultCapacity={cropData.cropCapacity}
            defaultStatus={cropData.status}
            removeRow={() => this.removeCropRow(cropData._id)}
          />
        </div>
      );
    });
  }

  renderCropsRows(crops) {
    const place_id = this.props.insertPage.place_id;
    const marketingYear = this.props.insertPage.marketingYear;
    const placeType = this.props.insertPage.placeType;
    const canAdd = place_id && placeType === 'locality' && marketingYear;
    return crops.map((crop) => {
      const squareValue = this.getSquareValue(crop.id);
      const avgCapacity = this.getAvgCapacityValue(crop.id, squareValue);
      const hiddenClass = (!this.hasUserThisCrop(crop) && this.props.insertPage.hideCrops) ? ' hidden' : '';
      return (
        <div key={crop.id} className={hiddenClass}>
          <RowForCrop
            addCropElem={this.addCropElem}
            cropId={crop.id}
            canAdd={canAdd}
            cropName={crop.name}
            squareValue={squareValue}
            avgCapacity={avgCapacity}
          />
          {this.renderInsertedCropsRows(crop)}
        </div>
      );
    });
  }

  renderTableRows() {
    return this.props.groups.map((group) => {
      const crops = Crops.find({ groupId: group.id }).fetch();
      return (
        <div key={group.id}>
          <RowForGroup groupName={group.name} collapseCrops={this.collapseCrops} />
          { this.renderCropsRows(crops) }
        </div>
      );
    });
  }

  render() {
    console.log(this.props.insertPage);
    return (
      <div className="table">
        <div className="table-title">{this.props.insertPage.fullAddress}</div>
        <TableHeader />
        {this.renderTableRows()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ insertPage: state.insertPage });

const mapDispatchToProps = (dispatch) => ({
  insertPageActions: bindActionCreators(insertPageActions, dispatch),
  insertTableActions: bindActionCreators(insertTableActions, dispatch),
});

const TableInsertContainer = createContainer(({ params }) => {
  const user = Meteor.user();
  Meteor.subscribe('crops.all');
  Meteor.subscribe('groups.all');
  Meteor.subscribe('records.user', Meteor.userId());
  Meteor.subscribe('localities.all');

  return {
    user,
    crops: Crops.find({}).fetch(),
    groups: Groups.find({}).fetch(),
    records: Records.find({}).fetch(),
    localities: Localities.find({}).fetch(),
  };
}, TableInsert);

export default connect(mapStateToProps, mapDispatchToProps)(TableInsertContainer);
