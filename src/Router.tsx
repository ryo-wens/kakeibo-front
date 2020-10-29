import React from 'react';
import { Route, Switch } from 'react-router';
import {
  GroupTodo,
  Todo,
  SignUp,
  LogIn,
  Home,
  SelectBigCategory,
  WeekTodo,
  InputCustomCategory,
  StandardBudgets,
  YearlyBudgets,
  CustomBudgets,
  WeeklyHistory,
  SelectStandardBudgets,
  Task,
} from './templates';

const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={'/'} component={Home} />
      <Route exact path={'/big-categories'} component={SelectBigCategory} />
      <Route exact path={'/custom-budgets/:year:month'} component={CustomBudgets} />
      <Route exact path={'/custom-categories/:id'} component={InputCustomCategory} />
      <Route exact path={'/history-week'} component={WeeklyHistory} />
      <Route exact path={'/login'} component={LogIn} />
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/standard-budgets'} component={StandardBudgets} />
      <Route exact path={'/standard-budgets/:year:month'} component={SelectStandardBudgets} />
      <Route exact path={'/todo'} component={Todo} />
      <Route exact path={'/todo/week'} component={WeekTodo} />
      <Route exact path={'/yearly-budgets'} component={YearlyBudgets} />
      <Route exact path={'/group/:id'} component={Home} />
      <Route exact path={'/group/:id/task'} component={Task} />
      <Route exact path={'/group/:id/todo'} component={GroupTodo} />
      <Route exact path={'/group/:id/todo/week'} component={WeekTodo} />
    </Switch>
  );
};
export default Router;
