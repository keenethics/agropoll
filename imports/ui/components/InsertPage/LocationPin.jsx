import React from 'react';

export default class LocationPin extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  getAddress() {
    const index = this.props.fullAddress ? this.props.fullAddress.indexOf(',') : -1;
    const address = (index === -1) ? this.props.fullAddress : this.props.fullAddress.substring(0, this.props.fullAddress.indexOf(','));
    return address;
  }

  render() {
    return (
      <div className="pin-inner">{this.getAddress()}</div>
    );
  }
}
