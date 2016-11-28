import React from 'react'
import { Router, Route, browserHistory, IndexRoute} from 'react-router'

import AppContainer from ''

import LoginPage from ''

export const renderRoutes = () => {
  <Router history={browserHistory}>
    <Route path="login" component={LoginPage}/>
    <Route path="login/:token" component={LoginPage}/>
    <Route path="/" component={AppContainer}>
    </Route>
  </Router>
}
