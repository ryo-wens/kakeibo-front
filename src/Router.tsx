import React from 'react';
import { Route, Switch } from 'react-router';
import { SignUp, LogIn, Home } from './templates';

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/login'} component={LogIn} />
      <Route exact path={'/'} component={Home} />
    </Switch>
  );
};
export default Router;
