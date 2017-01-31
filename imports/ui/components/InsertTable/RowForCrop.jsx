import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class RowForCrop extends React.Component {
  render() {
    return (
      <div className="trow trow-crop-header">
        <div className="tcoll1 tcell tcell-crop-header">
          <div className="add-crop" onClick={() => this.props.addCropElem(this.props.cropId)}> + </div>
          <span>{this.props.cropName}</span>
        </div>
        <div className="tcoll2 tcell tcell-crop-header">
          {this.props.squareValue && this.props.squareValue.toFixed(2) || ''}
        </div>
        <div className="tcoll3 tcell tcell-crop-header">
          {this.props.avgCropYield && this.props.avgCropYield.toFixed(1) || ''}
        </div>
        <div className="tcoll4 tcell tcell-crop-header"></div>
      </div>
    );
  }
}
