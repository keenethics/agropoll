import React from 'react';
import { browserHistory } from 'react-router';

import HomePage from '/imports/ui/pages/HomePage.jsx';
import NavigationBar from '/imports/ui/components/NavigationBar/NavigationBar.jsx';
import AppContainer from '/imports/ui/containers/AppContainer.jsx';

export default class MainLayout extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <NavigationBar />
        <AppContainer>
          {this.props.children}
        </AppContainer>
      </div>
    );
  }
}
