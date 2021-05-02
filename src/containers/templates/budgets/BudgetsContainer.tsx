import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import Budgets from '../../../templates/budgets/Budgets';
import { push } from 'connected-react-router';
import axios from 'axios';
import { fetchGroups } from '../../../reducks/groups/operations';
import { year } from '../../../lib/constant';
import { useHistory } from 'react-router-dom';
import CheckAuth from '../../auth/CheckAuth';

const BudgetsContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { group_id } = useParams<{ group_id: string }>();
  const pathName = useLocation().pathname.split('/')[1];
  const query = useLocation().search.split('&')[0];
  const [budgetsYear, setBudgetsYear] = useState(year);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchGroups(signal));

    const interval = setInterval(() => {
      dispatch(fetchGroups(signal));
    }, 3000);

    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, []);

  const routingStandardBudgetPage = () => {
    pathName !== 'group'
      ? dispatch(push('/budgets?standard'))
      : dispatch(push(`/group/${group_id}/budgets?standard`));
  };

  const routingYearlyBudgetPage = () => {
    pathName !== 'group'
      ? history.push({ pathname: '/budgets', search: `?yearly&year=${budgetsYear}` })
      : history.push({
          pathname: `/group/${group_id}/budgets`,
          search: `?yearly&year=${budgetsYear}`,
        });
  };

  return (
    <>
      <CheckAuth />
      <Budgets
        query={query}
        budgetsYear={budgetsYear}
        setBudgetsYear={setBudgetsYear}
        routingStandard={routingStandardBudgetPage}
        routingYearly={routingYearlyBudgetPage}
      />
    </>
  );
};
export default BudgetsContainer;
