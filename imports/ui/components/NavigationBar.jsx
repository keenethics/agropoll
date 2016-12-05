import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { browserHistory, Link } from 'react-router'


class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="navContainer">
        <Link className="navLink mainLink" to="/">Main</Link>
        <div className="navCenter">
          <Link className="navLink statLink" to="/statistic">Statistic</Link>
          <Link className="navLink insLink" to="/insert">Insert</Link>
        </div>
        <Link className="navLink logLink" to="/login">{this.props.user ? 'Profile' : 'Login'}</Link>
      </div>
    )
  }
}

export default createContainer ( ({params}) => {
  const user = Meteor.user()

  return {
    user
  }
}, NavigationBar)
