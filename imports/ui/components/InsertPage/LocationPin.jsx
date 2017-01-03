import React from 'react';

export default class LocationPin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        <span>{this.props.fullAddress.substring(0, this.props.fullAddress.indexOf(','))}</span>
      </span>
    );
  }
}

// export default const LocationPin = () => (
//   <span>
//     <span>{this.props.fullAddress.substring(0, this.props.fullAddress.indexOf(','))}</span>
//   </span>
// );
