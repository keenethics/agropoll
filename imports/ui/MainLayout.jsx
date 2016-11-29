import React from 'react';
import { browserHistory } from 'react-router';

import HelloWorld from './components/HelloWorld.jsx';
import HomePage from './pages/HomePage.jsx';



export default class MainLayout extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <HelloWorld />

        <HomePage />
        {this.props.children}
      </div>
    );
  }
}
