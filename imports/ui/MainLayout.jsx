import React from 'react';
import { browserHistory } from 'react-router';

import HomePage from '/imports/ui/pages/HomePage.jsx';
import SearchBar from '/imports/ui/components/SearchBar.jsx';
import NavigationBar from '/imports/ui/components/NavigationBar.jsx';
import AppContainer from '/imports/ui/containers/AppContainer.jsx';

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }

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
