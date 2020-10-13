import React from 'react';
import { Route, Switch } from 'react-router';
import {
  GroupTodo,
  Todo,
  SignUp,
  LogIn,
  Home,
  SelectBigCategory,
  ScheduleTodo,
  InputCustomCategory,
  StandardBudgets,
  YearlyBudgets,
  CustomBudgets,
  WeeklyHistory,
  SelectStandardBudgets,
} from './templates';

const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={'/group-todo/:id'} component={GroupTodo} />
      <Route exact path={'/todo'} component={Todo} />
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/schedule-todo'} component={ScheduleTodo} />
      <Route exact path={'/login'} component={LogIn} />
      <Route exact path={'/'} component={Home} />
      <Route exact path={'/big-categories'} component={SelectBigCategory} />
      <Route exact path={'/custom-categories/:id'} component={InputCustomCategory} />
      <Route exact path={'/standard-budgets'} component={StandardBudgets} />
      <Route exact path={'/custom-budgets'} component={YearlyBudgets} />
      <Route exact path={'/custom-budgets/:year:month'} component={CustomBudgets} />
      <Route exact path={'/standard-budgets/:year:month'} component={SelectStandardBudgets} />
      <Route exact path={'/history-week'} component={WeeklyHistory} />
    </Switch>
  );
};
export default Router;
