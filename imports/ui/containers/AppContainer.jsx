import React from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { bindActionCreators } from 'redux';
import Spinner from 'react-spinkit';
import * as actions from '/imports/ui/actions/InsertPageActions.js';

class AppContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const spinnerStyle = {
      width: 100,
      height: 100,
      position: 'fixed',
      margin: 'calc(50% - 50px)',
    };
    return (
      <div className="main-layout">
        {this.props.insertPage.seekingLocation ? <Spinner spinnerName="circle" style={spinnerStyle} /> : ''}
        {this.props.children}
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

const mapStateToProps = (state) => ({ insertPage: state.insertPage });

const containter = createContainer(({ params }) => {
  return {};
}, AppContainer);

export default connect(mapStateToProps, mapDispatchToProps)(containter);
