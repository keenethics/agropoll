import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux-meteor';
import { createStore } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import RootReducer from '/imports/ui/reducers/RootReducer.js';
// route components
import HomePage from '/imports/ui/pages/HomePage.jsx';
import LoginPage from '/imports/ui/pages/LoginPage.jsx';
import InsertPage from '/imports/ui/pages/InsertPage.jsx';
import MainLayout from '/imports/ui/MainLayout.jsx';
import RedirectPage from '/imports/ui/pages/RedirectPage.jsx';
import StatisticsPage from '/imports/ui/pages/StatisticsPage.jsx';
// import NotFoundPage from '/imports/ui/pages/NotFoundPage.jsx';

let store = createStore(RootReducer)

Meteor.startup (() => {
  render (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
          <IndexRoute component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/login/:hash" component={LoginPage} />
          <Route path="redirect" component={RedirectPage} />
          <Route path="statistics" component={StatisticsPage} />
          <Route path="insert" component={InsertPage} />
          <Route path="insert/:placeId" component={InsertPage} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('react-root')
  )
})
