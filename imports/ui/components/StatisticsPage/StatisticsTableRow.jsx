import React from 'react';

export default class StatisticsTableRow extends React.Component {
  render() {
    const structure = {
      base: this.props.crop.squares[this.props.regionId] / this.props.totalSquareByRegion.base * 100,
      forecast: this.props.cropsView.totalSquare / (this.props.totalSquareByRegion.forecast || 1) * 100,
    };
    const structureRatio = 100 * structure.base / (structure.base + structure.forecast);

    return (
      <div className="row">
        <div className="cell coll-1">
          <span>{this.props.crop[`name-${localStorage.getItem('language') || 'ua'}`]}</span>
        </div>
        {/*<div className="cell coll-2">
          <span>{structure.base.toFixed(2)}</span>
        </div>*/}
        <div className="cell coll-3">
          <div
            className={`square-forecast ${!structure.forecast && 'square-empty'}`}
            title={(this.props.cropsView.totalSquare / 1000).toFixed(2)}
          >
            <div
              className={`square-base ${!structure.base && 'square-empty'}`}
              style={{ width: `${structureRatio}%` }}
              title={this.props.crop.squares[this.props.regionId].toFixed(2)}
            >
              {structureRatio > 0 && `${structure.base.toFixed(1)}%` || ''}
            </div>
            {structureRatio < 100 && `${structure.forecast.toFixed(1)}%` || ''}
          </div>
        </div>
        {/*<div className="cell coll-4">
          <span>{structure.forecast.toFixed(2)}</span>
        </div>*/}
      </div>
    );
  }
}
