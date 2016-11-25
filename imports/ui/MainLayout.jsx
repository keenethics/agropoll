import React from 'react';

import HelloWorld from './components/HelloWorld.jsx';
import Page from './pages/Page.jsx';



export default class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <HelloWorld />

        <Page />

      </div>
    );
  }
}
