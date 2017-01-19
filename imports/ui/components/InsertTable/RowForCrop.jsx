import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class RowForCrop extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="trow trow-crop-header">
        <div className="tcoll1 tcell tcell-crop-header">
          <div className="add-crop" onClick={() => this.props.addCropElem(this.props.cropId)}> + </div>
          <span>{this.props.cropName}</span>
        </div>
        <div className="tcoll2 tcell tcell-crop-header">
          {this.props.squareValue || ''}
        </div>
        <div className="tcoll3 tcell tcell-crop-header">
          {this.props.avgCropYield && this.props.avgCropYield.toFixed(4) || ''}
        </div>
        <div className="tcoll4 tcell tcell-crop-header"></div>
      </div>
    );
  }
}
