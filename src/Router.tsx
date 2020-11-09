import React from 'react';
import { Route, Switch } from 'react-router';
import {
  Todo,
  SignUp,
  LogIn,
  Home,
  SelectBigCategory,
  InputCustomCategory,
  StandardBudgets,
  YearlyBudgets,
  CustomBudgets,
  WeeklyHistory,
  EditStandardBudgets,
  Task,
  MonthlyTodo,
} from './templates';

const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={'/'} component={Home} />
      <Route exact path={'/big-categories'} component={SelectBigCategory} />
      <Route exact path={'/custom/budgets/:year/:month'} component={CustomBudgets} />
      <Route exact path={'/custom-categories/:id'} component={InputCustomCategory} />
      <Route exact path={'/history-week'} component={WeeklyHistory} />
      <Route exact path={'/login'} component={LogIn} />
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/standard/budgets'} component={StandardBudgets} />
      <Route exact path={'/standard/budgets/:year/:month'} component={EditStandardBudgets} />
      <Route exact path={'/todo'} component={Todo} />
      <Route exact path={'/todo/monthly'} component={MonthlyTodo} />
      <Route exact path={'/yearly/budgets'} component={YearlyBudgets} />
      <Route exact path={'/group/:id/standard/budgets'} component={StandardBudgets} />
      <Route exact path={'/group/:id/custom/budgets/:year/:month'} component={CustomBudgets} />
      <Route exact path={'/group/:id/yearly/budgets'} component={YearlyBudgets} />
      <Route
        exact
        path={'/group/:id/standard/budgets/:year/:month'}
        component={EditStandardBudgets}
      />
      <Route exact path={'/group/:id'} component={Home} />
      <Route exact path={'/group/:id/task'} component={Task} />
      <Route exact path={'/group/:id/todo'} component={Todo} />
      <Route exact path={'/group/:id/todo/monthly'} component={MonthlyTodo} />
    </Switch>
  );
};
export default Router;
