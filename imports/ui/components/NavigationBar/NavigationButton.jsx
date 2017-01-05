import React from 'react';

import { Link } from 'react-router';

export default class NavigationButton extends React.Component {

  render() {
    return (
      <Link
        onlyActiveOnIndex
        className="navLink"
        activeClassName="active"
        to={this.props.toLink}
      >
        {this.props.text}
      </Link>
    );
  }
}
