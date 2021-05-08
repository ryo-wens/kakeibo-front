import React from 'react';
import { Route, Switch } from 'react-router';
import { Task, InitialScreen } from './templates';
import SignUpContainer from './containers/templates/signup/SignUpContainer';
import LogInContainer from './containers/templates/login/LogInContainer';
import HomeContainer from './containers/templates/home/HomeContainer';
import HistoryContainer from './containers/templates/history/HistoryContainer';
import TodoContainer from './containers/templates/Todo/TodoContainer';
import YearlyAccountContainer from './containers/templates/account/YearlyAccountContainer';
import BudgetsContainer from './containers/templates/budgets/BudgetsContainer';
import { PrivateRouter } from './containers/auth/PrivateRouter';

const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={'/'} component={InitialScreen} />
      <Route exact path={'/signup'} component={SignUpContainer} />
      <Route exact path={'/login'} component={LogInContainer} />

      {/*
       以下のコンポーネントはログイン時のみ表示される
       未ログイン状態で遷移した場合はリダイレクト処理が実行される
      */}
      <PrivateRouter exact path={'/home'} component={HomeContainer} />
      <PrivateRouter exact path={'/history'} component={HistoryContainer} />
      <PrivateRouter exact path={'/budgets'} component={BudgetsContainer} />
      <PrivateRouter exact path={'/todo'} component={TodoContainer} />
      <PrivateRouter exact path={'/group/:group_id/home'} component={HomeContainer} />
      <PrivateRouter exact path={'/group/:group_id/history'} component={HistoryContainer} />
      <PrivateRouter exact path={'/group/:group_id/budgets'} component={BudgetsContainer} />
      <PrivateRouter
        exact
        path={'/group/:group_id/accounting'}
        component={YearlyAccountContainer}
      />
      <PrivateRouter exact path={'/group/:group_id/task'} component={Task} />
      <PrivateRouter exact path={'/group/:group_id/todo'} component={TodoContainer} />
    </Switch>
  );
};
export default Router;
