import React from 'react';

import HelloWorld from './components/HelloWorld.jsx';
import HomePage from './pages/HomePage.jsx';



export default class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <HelloWorld />

        <HomePage />

      </div>
    );
  }
}
