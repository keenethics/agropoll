import React from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { bindActionCreators } from 'redux';
import { Circle } from 'better-react-spinkit';
import * as actions from '/imports/ui/actions/InsertPageActions.js';

class AppContainer extends React.Component {
  render() {
    const backgroundStyle = {
      position: 'fixed',
      background: 'gray',
      opacity: 0.5,
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh'
    };
    const spinnerStyle = {
      position: 'absolute',
      top: 'calc(45% - 50px)',
      left: 'calc(50% - 50px)'
    };
    return (
      <div className="main-layout">
        {this.props.children}
        {this.props.insertPage.seekingLocation ? <div style={backgroundStyle}><Circle size={100} color="white" style={spinnerStyle} /></div> : ''}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

const mapStateToProps = (state) => ({ insertPage: state.insertPage });

const containter = createContainer(({ params }) => ({}), AppContainer);

export default connect(mapStateToProps, mapDispatchToProps)(containter);
