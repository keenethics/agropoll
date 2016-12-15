import React from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';

export default class RowForCrop extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const canAdd = this.props.canAdd;
    // const addCropElem = this.props.addCropElem;
    // const cropName = this.props.cropName;
    // const avgCapacity = this.props.avgCapacity;
    // const squareValue = this.props.squareValue;
    // console.log(this.props);
    return (
      <div className="trow">
        <div className="tcoll0">
          { this.props.canAdd && <span onClick={() => this.props.addCropElem(this.props.cropId)}>add</span> || "" }
        </div>
        <div className="tcoll1 tcell">{ this.props.cropName }</div>
        <div className="tcoll2 tcell">{ this.props.squareValue || "" }</div>
        <div className="tcoll3 tcell">{ this.props.avgCapacity && this.props.avgCapacity.toFixed(4) || "" }</div>
        <div className="tcoll4 tcell"></div>
        <div className="tcoll5"></div>
      </div>
    )
  }
}
