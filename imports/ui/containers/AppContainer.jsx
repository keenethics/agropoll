import React from 'react';

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-layout">
        {this.props.children}
      </div>
    );
  }
}
