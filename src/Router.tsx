import React from 'react';
import { Route, Switch } from 'react-router';
import { CustomBudgets, EditStandardBudgets, Task, InitialScreen } from './templates';
import SignUpContainer from './containers/templates/signup/SignUpContainer';
import LogInContainer from './containers/templates/login/LogInContainer';
import HomeContainer from './containers/templates/home/HomeContainer';
import HistoryContainer from './containers/templates/history/HistoryContainer';
import TodoContainer from './containers/templates/Todo/TodoContainer';
import YearlyAccountContainer from './containers/templates/account/YearlyAccountContainer';
import BudgetsContainer from './containers/templates/budgets/BudgetsContainer';

const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={'/'} component={InitialScreen} />
      <Route exact path={'/signup'} component={SignUpContainer} />
      <Route exact path={'/login'} component={LogInContainer} />
      <Route exact path={'/home'} component={HomeContainer} />
      <Route exact path={'/daily/history'} component={HistoryContainer} />
      <Route exact path={'/weekly/history'} component={HistoryContainer} />
      <Route exact path={'/budgets'} component={BudgetsContainer} />
      <Route exact path={'/custom/budgets/:year/:month'} component={CustomBudgets} />
      <Route exact path={'/standard/budgets/:year/:month'} component={EditStandardBudgets} />
      <Route exact path={'/todo'} component={TodoContainer} />
      <Route exact path={'/group/:group_id/home'} component={HomeContainer} />
      <Route exact path={'/group/:group_id/daily/history'} component={HistoryContainer} />
      <Route exact path={'/group/:group_id/weekly/history'} component={HistoryContainer} />
      <Route exact path={'/group/:group_id/accounting'} component={YearlyAccountContainer} />
      <Route exact path={'/group/:group_id/budgets'} component={BudgetsContainer} />
      <Route
        exact
        path={'/group/:group_id/custom/budgets/:year/:month'}
        component={CustomBudgets}
      />
      <Route
        exact
        path={'/group/:group_id/standard/budgets/:year/:month'}
        component={EditStandardBudgets}
      />
      <Route exact path={'/group/:group_id/task'} component={Task} />
      <Route exact path={'/group/:group_id/todo'} component={TodoContainer} />
    </Switch>
  );
};
export default Router;
