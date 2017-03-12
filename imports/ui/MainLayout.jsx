import React from 'react';
import NavigationBar from '/imports/ui/components/NavigationBar/NavigationBar.jsx';
import AppContainer from '/imports/ui/containers/AppContainer.jsx';
import Footer from '/imports/ui/components/Footer.jsx';

export default class MainLayout extends React.Component {

  render() {
    return (
      <div>
        <NavigationBar />
        <AppContainer>
          {this.props.children}
        </AppContainer>
        <Footer />
      </div>
    );
  }
}
