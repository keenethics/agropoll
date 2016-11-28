import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import MainLayout from '/imports/ui/MainLayout.jsx';
import HomePage from '/imports/ui/pages/HomePage.jsx';
// import NotFoundPage from '/imports/ui/pages/NotFoundPage.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={HomePage} />
      <Route path="input" component={InputData}/>
      <Route path="statistics" component={Statistics}/>

      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>
);
