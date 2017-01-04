import React from 'react';

import { Link } from 'react-router';

export default class NavigationButton extends React.Component {

  changeClass(e) {
    const remClass = document.getElementsByClassName('active');
    remClass[0].className = 'navLink';
    e.target.className = 'active';
  }

  render() {
    return (
      <Link
        className={this.props.class}
        to={this.props.toLink}
        onClick={this.changeClass.bind(this)}
      >
        {this.props.text}
      </Link>
    );
  }
}
