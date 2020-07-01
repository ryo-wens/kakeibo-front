import React from 'react';
import { Route, Switch } from 'react-router';
import { SignUp } from './templates';

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route />
    </Switch>
  );
};
export default Router;
