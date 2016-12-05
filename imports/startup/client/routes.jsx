import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';
// route components
import MainLayout from '/imports/ui/MainLayout.jsx';
import HomePage from '/imports/ui/pages/HomePage.jsx';
import LoginPage from '/imports/ui/pages/LoginPage.jsx';
import RedirectPage from '/imports/ui/pages/RedirectPage.jsx';
// import NotFoundPage from '/imports/ui/pages/NotFoundPage.jsx';
Meteor.startup ( () => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={HomePage} />
        <Route path="/login" component={LoginPage}/>
        <Route path="/login/:token" component={LoginPage}/>
        <Route path="redirect" component={RedirectPage}/>
      </Route>
    </Router>,
    document.getElementById('react-root')
  )
})
