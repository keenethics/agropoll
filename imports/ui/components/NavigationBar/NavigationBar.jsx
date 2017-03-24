import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import NavigatinButton from './NavigationButton.jsx';

class NavigationBar extends React.Component {
  render() {
    return (
      <div className="navContainer">
        <div className="text-left percent-25 padding-top-10">
          <NavigatinButton toLink="/" text={{ ua: 'Про проект', en: 'About' }[localStorage.getItem('language') || 'ua']} />
        </div>
        <div className="text-center percent-50 padding-top-10">
          <NavigatinButton toLink="/statistics" text={{ ua: 'Статистика', en: 'Statistics' }[localStorage.getItem('language') || 'ua']} />
          <NavigatinButton toLink="/insert" text={{ ua: 'Внести дані', en: 'Submit data' }[localStorage.getItem('language') || 'ua']} />
        </div>
        <div className="text-right percent-25 padding-top-10">
          <NavigatinButton toLink="/login" text={this.props.user ? { ua: 'Профіль', en: 'Profile' }[localStorage.getItem('language') || 'ua'] : { ua: 'Увійти', en: 'Sing up' }[localStorage.getItem('language') || 'ua']} />
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
