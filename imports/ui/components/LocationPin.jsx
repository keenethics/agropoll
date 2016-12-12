import React from 'react'

export default class LocationPin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        <span>Pin</span>
        <span>{this.props.fullAddress}</span>
      </span>
    )
  }
}
