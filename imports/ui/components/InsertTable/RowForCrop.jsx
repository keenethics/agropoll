import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class RowForCrop extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="trow">
        <div className="tcoll0">
          {this.props.canAdd && <div onClick={() => this.props.addCropElem(this.props.cropId)} className="insert-list action add">+</div> || ''}
        </div>
        <div className="tcoll1 tcell">
          <span>{this.props.cropName}</span>
        </div>
        <div className="tcoll2 tcell">
          {this.props.squareValue || ''}
        </div>
        <div className="tcoll3 tcell">
          {this.props.avgCapacity && this.props.avgCapacity.toFixed(4) || ''}
        </div>
        <div className="tcoll4 tcell"></div>
        <div className="tcoll5"></div>
      </div>
    );
  }
}
