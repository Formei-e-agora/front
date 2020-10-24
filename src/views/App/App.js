import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../../helpers';
import { Feed, Jobs, Login, NotFound, Register, Settings, Notifications, UserManager } from '../index';
import { PrivateRoute } from '../../components/index';
import './App.css';

const App = () => (
  <Router history={history}>
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/feed" component={Feed} />
      <PrivateRoute exact path="/jobs" component={Jobs} />
      <PrivateRoute exact path="/settings" component={Settings} />
      <PrivateRoute exact path="/notifications" component={Notifications} />
      <PrivateRoute exact path="/usermanager" component={UserManager} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;