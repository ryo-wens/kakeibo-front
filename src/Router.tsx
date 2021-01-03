import React from 'react';
import { Route, Switch } from 'react-router';
import {
  Todo,
  SignUp,
  LogIn,
  Home,
  StandardBudgets,
  YearlyBudgets,
  CustomBudgets,
  EditStandardBudgets,
  History,
  Task,
  PayOff,
  YearlyAccount,
} from './templates';

const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={'/'} component={Home} />
      <Route exact path={'/custom/budgets/:year/:month'} component={CustomBudgets} />
      <Route exact path={'/daily/history'} component={History} />
      <Route exact path={'/weekly/history'} component={History} />
      <Route exact path={'/login'} component={LogIn} />
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/standard/budgets'} component={StandardBudgets} />
      <Route exact path={'/standard/budgets/:year/:month'} component={EditStandardBudgets} />
      <Route exact path={'/todo'} component={Todo} />
      <Route exact path={'/yearly/budgets'} component={YearlyBudgets} />
      <Route exact path={'/group/:id'} component={Home} />
      <Route exact path={'/group/:id/daily/history'} component={History} />
      <Route exact path={'/group/:id/weekly/history'} component={History} />
      <Route exact path={'/group/:id/accounting/:year'} component={YearlyAccount} />
      <Route exact path={'/group/:id/accounting/:year/:month'} component={PayOff} />
      <Route exact path={'/group/:id/standard/budgets'} component={StandardBudgets} />
      <Route exact path={'/group/:id/custom/budgets/:year/:month'} component={CustomBudgets} />
      <Route exact path={'/group/:id/yearly/budgets'} component={YearlyBudgets} />
      <Route
        exact
        path={'/group/:id/standard/budgets/:year/:month'}
        component={EditStandardBudgets}
      />
      <Route exact path={'/group/:id/task'} component={Task} />
      <Route exact path={'/group/:id/todo'} component={Todo} />
    </Switch>
  );
};
export default Router;
