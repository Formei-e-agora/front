import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../../helpers';
import { Feed, Jobs, Login, NotFound, Register } from '../index';
import { PrivateRoute } from '../../components/index';
import './App.css';

// connect here to get usertype and render different components
// https://stackoverflow.com/questions/44916839/how-do-i-utilize-dot-notation-when-rendering-components

const App = () => (
  <Router history={history}>
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/feed" component={Feed} />
      <PrivateRoute exact path="/jobs" component={Jobs} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;