import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { NavigatinButton } from './NavigationButton.jsx';
import { browserHistory, Link } from 'react-router'


class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="navContainer">
      	<div className="float-left text-left">
          <NavigationButton toLink="/" text="Main" />
	      </div>
        <div className="float-left text-center">
          <NavigationButton toLink="/statistics" text="Statistics" />
          <NavigationButton toLink="/insert" text="Insert" />
        </div>
        <div className="float-left text-right">
          <NavigationButton toLink="/login" text="{this.props.user ? 'Profile' : 'Login'}" />
        </div>
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
