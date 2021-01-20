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
  YearlyAccount,
  InitialScreen,
} from './templates';

const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={'/'} component={InitialScreen} />
      <Route exact path={'/home'} component={Home} />
      <Route exact path={'/custom/budgets/:year/:month'} component={CustomBudgets} />
      <Route exact path={'/daily/history'} component={History} />
      <Route exact path={'/weekly/history'} component={History} />
      <Route exact path={'/login'} component={LogIn} />
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/standard/budgets'} component={StandardBudgets} />
      <Route exact path={'/standard/budgets/:year/:month'} component={EditStandardBudgets} />
      <Route exact path={'/todo'} component={Todo} />
      <Route exact path={'/yearly/budgets'} component={YearlyBudgets} />
      <Route exact path={'/group/:group_id/home'} component={Home} />
      <Route exact path={'/group/:group_id/daily/history'} component={History} />
      <Route exact path={'/group/:group_id/weekly/history'} component={History} />
      <Route exact path={'/group/:group_id/accounting'} component={YearlyAccount} />
      <Route exact path={'/group/:group_id/standard/budgets'} component={StandardBudgets} />
      <Route
        exact
        path={'/group/:group_id/custom/budgets/:year/:month'}
        component={CustomBudgets}
      />
      <Route exact path={'/group/:group_id/yearly/budgets'} component={YearlyBudgets} />
      <Route
        exact
        path={'/group/:group_id/standard/budgets/:year/:month'}
        component={EditStandardBudgets}
      />
      <Route exact path={'/group/:group_id/task'} component={Task} />
      <Route exact path={'/group/:group_id/todo'} component={Todo} />
    </Switch>
  );
};
export default Router;
