import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import NavigatinButton from './NavigationButton.jsx';


class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="navContainer">
        <div className="float-left text-left percent-25 padding-top-10">
          <NavigatinButton toLink="/" text="Main" class="active"/>
        </div>
        <div className="float-left text-center percent-50 padding-top-10">
          <NavigatinButton toLink="/statistics" text="Statistics" class="navLink"/>
          <NavigatinButton toLink="/insert" text="Insert" class="navLink"/>
        </div>
	<div className="float-left text-right percent-25 padding-top-10">
          <NavigatinButton toLink="/login" text={this.props.user ? 'Profile' : 'Login'} class="navLink"/>
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