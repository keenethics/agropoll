import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import NavigatinButton from './NavigationButton.jsx';

class NavigationBar extends React.Component {
  render() {
    return (
      <div className="navContainer">
        <div className="float-left text-left percent-25 padding-top-10">
          <NavigatinButton toLink="/" text="Про проект" />
        </div>
        <div className="float-left text-center percent-50 padding-top-10">
          <NavigatinButton toLink="/statistics" text="Статистика" />
          <NavigatinButton toLink="/insert" text="Внести дані" />
        </div>
        <div className="float-left text-right percent-25 padding-top-10">
          <NavigatinButton toLink="/login" text={this.props.user ? 'Профіль' : 'Увійти'} />
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  const user = Meteor.user();

  return {
    user
  };
}, NavigationBar);
