import React from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
// import { createContainer } from 'meteor/react-meteor-data';

import { Crops, Groups } from '/imports/api/crops/crops.js'

import RowForCrop from './RowForCrop.jsx';
import RowForGroup from './RowForGroup.jsx';
import RowForInsertedData from './RowForInsertedData.jsx';
import TableHeader from './TableHeader.jsx';
/*This Eleement doesn't use anywhere*/
class TableInsert extends React.Component {
  constructor(props) {
    super(props);

  }

  hasUserThisCrop(crop) {
    return this.props.records.find((elem) => {
      return (elem.cropId === crop.id && elem.location.placeId === this.state.placeId)
    })
  }

  collapseCrops(e){
    const elementsToHide = e.target.parentElement.parentElement.children;
    const arrElementsToHide = Array.prototype.slice.call(elementsToHide);
    this.setState({
      hideCrops: false,
    })
    arrElementsToHide.shift()
    arrElementsToHide.forEach((elem) => {
      elem.className = elem.className.replace(' hidden', "");
    })
  }

  removeCropRow(id) {
    Meteor.call('record.removeOne', id);
  }

  getSquareValue(cropId) {
    // const placeId = this.state.placeId;
    // const userId = this.props.user._id;
    // const marketingYear = this.state.marketingYear;
    // return this.props.records.filter((record) => {
    //   return (record.cropId === cropId && record.location.placeId === placeId &&
    //     record.userId === userId && record.marketingYear === marketingYear)
    // }).reduce((a, b) => {
    //     return a + +b.square
    //   }, 0)
  }

  getAvgCapacityValue(cropId, square) {
    // const placeId = this.state.placeId;
    // const userId = this.props.user._id;
    // const marketingYear = this.state.marketingYear;
    // const capacity = this.props.records.filter((record) => {
    //   return (record.cropId === cropId && record.location.placeId === placeId &&
    //     record.userId === userId && record.marketingYear === marketingYear)
    // }).reduce((a, b) => {
    //     return a + (+b.square * +b.cropCapacity)
    //   }, 0);
    // return capacity / square;
  }

  addCropElem(cropId) {
    const placeId = this.state.placeId;
    const placeType = this.state.placeType;
    const marketingYear = this.state.marketingYear;

    if (placeId && placeType === 'locality' && marketingYear) {
      Meteor.call('record.insert', {
        marketingYear,
        reproduction: "",
        cropCapacity: 0,
        placeId,
        cropId,
        square: 0,
        status: 'planned',
        sort: "",
      });
    }
    else
      alert('no place selected')
  }

  renderInsertedCropsRows(crop) {
    const placeId = this.props.insertPage.placeId;
    const userId = this.props.user._id;
    const marketingYear = this.state.marketingYear;
    const cropsData = Records.find({
      cropId: crop.id,
      'location.placeId': placeId,
      userId,
      marketingYear,
    });
    return cropsData.map((cropData) => {
      return(
        <div key={cropData._id}>
          <RowForInsertedData
             dataId={ cropData._id }
             defaultSort={ cropData.sort }
             defaultReproduction={ cropData.reproduction }
             defaultSquare={ cropData.squre }
             defaultCapacity={ cropData.capacity }
             defaultStatus={ cropData.status }
             removeRow={ () => this.removeCropRow(cropData._id) }
          />
        </div>
    //     <div className="trow" key={cropData._id}>
    //       <div className="tcoll0 "></div>
    //       <div className="tcoll1 tcell">
    //         <input className="input" type="text" ref={"sort"+cropData._id} defaultValue={cropData.sort} placeholder="сорт"/>
    //         <input className="input" type="text" ref={"reproduction"+cropData._id} defaultValue={cropData.reproduction} placeholder="репродукція"/>
    //       </div>
    //       <div className="tcoll2 tcell">
    //         <input className="input" type="number" ref={"square"+cropData._id} defaultValue={cropData.square}/>
    //       </div>
    //       <div className="tcoll3 tcell">
    //         <input className="input" type="number" ref={"cropCapacity"+cropData._id} defaultValue={cropData.cropCapacity}/>
    //       </div>
    //       <div className="tcoll4 tcell">
    //         <input className="input" type="text"  ref={"status"+cropData._id} defaultValue={cropData.status}/></div>
    //       <div className="tcoll5 " onClick={() => this.removeCropRow(cropData._id)}>Remove</div>
    //     </div>
    //   )
    // })
  }

  renderCropsRows(crops) {
    const placeId = this.props.insertPage.placeId;
    const marketingYear = this.props.insertPage.marketingYear;
    const placeType = this.props.insertPage.placeType;
    const canAdd = placeId && placeType === 'locality' && marketingYear;
    return crops.map((crop) => {
      const squareValue = 0//this.getSquareValue(crop.id);
      const avgCapacity = 0//this.getAvgCapacityValue(crop.id, squareValue);
      const hiddenClass = (!this.hasUserThisCrop(crop) && this.state.hideCrops )? " hidden" : "";
      return (
        <div key={ cropId } className={ hiddenClass }>
          <RowForCrop addCropElem={ this.addCropElem }
            canAdd={ canAdd }
            cropName={ crop.name }
            squareValue={ squareValue }
            avgCapacity={ avgCapacity }
          />
          { this.renderInsertedCropsRows(crop) }
        </div>
    //     <div key={crop.id} className={hiddenClass}>
    //       <div className="trow">
    //         <div className="tcoll0">
    //           { canAdd && <span onClick={() => this.addCropElem(crop.id)}>add</span> || "" }
    //         </div>
    //         <div className="tcoll1 tcell">{ crop.name }</div>
    //         <div className="tcoll2 tcell">{ squareValue || "" }</div>
    //         <div className="tcoll3 tcell">{ avgCapacity && avgCapacity.toFixed(4) || "" }</div>
    //         <div className="tcoll4 tcell"></div>
    //         <div className="tcoll5"></div>
    //       </div>
    //       { this.renderInsertedCropsRows(crop) }
    //     </div>
      )
    })
  }

  renderTableRows() {
    return this.props.groups.map((group) => {
      const crops = Crops.find({ groupId: group.id }).fetch();
      return (
        <div key={groupId}>
          <RowForGroup groupName={group.name} collapseCrops={this.collapseCrops} />
          { this.renderCropsRows(crops) }
        </div>
    //     <div key={group.id}>
    //       <div className="trow">
    //         <div className="tcoll0" onClick={this.collapseCrops} >++++</div>
    //         {group.name}
    //       </div>
    //       { this.renderCropsRows(crops) }
    //     </div>
      )
    })
  }

  render() {
    return(
      <div className="table3">
        <TableHeader />
        {this.renderTableRows()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { insertPage: state.insertPage }
};

const mapTrackerToProps = (state, props) => {
  const user = Meteor.user();
  const cropsHandler = Meteor.subscribe('crops.all');
  const groupsHandler = Meteor.subscribe('groups.all');

  return {
    user,
    crops: Crops.find({}).fetch(),
    groups: Groups.find({}).fetch()
  };
};


export default connect(mapTrackerToProps, mapStateToProps)(TableInsert);

// export default createContainer( ({params}) => {
//   const user = Meteor.user();
//   const cropsHandler = Meteor.subscribe('crops.all');
//   const groupsHandler = Meteor.subscribe('groups.all');
//
//   return {
//     user,
//     crops: Crops.find({}).fetch(),
//     groups: Groups.find({}).fetch()
//   }
// }, TableInsert)
