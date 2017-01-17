import React from 'react';

export default class LocationPin extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="pin-inner">{this.props.fullAddress && this.props.fullAddress.substring(0, this.props.fullAddress.indexOf(','))}</div>
    );
  }
}
