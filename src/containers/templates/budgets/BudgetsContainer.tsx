import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import Budgets from '../../../templates/budgets/Budgets';
import { push } from 'connected-react-router';
import axios from 'axios';
import { fetchGroups } from '../../../reducks/groups/operations';
import { year } from '../../../lib/constant';
import { useHistory } from 'react-router-dom';

const BudgetsContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { group_id } = useParams();
  const pathName = useLocation().pathname.split('/')[1];
  const query = useLocation().search;
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

  const currentStandardColor = () => {
    const style = {
      background: '',
      color: '',
    };

    if (query === '?standard') {
      style.background = 'linear-gradient(90deg, rgba(245,117,109,1) 0%, rgba(238,62,91,1) 45%)';
      style.color = '#fff';
    }

    return style;
  };

  const currentYearlyColor = () => {
    const style = {
      background: '',
      color: '',
    };

    if (query === `?yearly&year=${budgetsYear}`) {
      style.background = 'linear-gradient(90deg, rgba(245,117,109,1) 0%, rgba(238,62,91,1) 45%)';
      style.color = '#fff';
    }

    return style;
  };

  return (
    <Budgets
      query={query}
      budgetsYear={budgetsYear}
      setBudgetsYear={setBudgetsYear}
      currentStandardColor={currentStandardColor}
      currentYearlyColor={currentYearlyColor}
      routingStandard={() =>
        pathName !== 'group'
          ? dispatch(push('/budgets?standard'))
          : dispatch(push(`/group/${group_id}/budgets?standard`))
      }
      routingYearly={() => {
        pathName !== 'group'
          ? history.push({ pathname: '/budgets', search: `?yearly&year=${budgetsYear}` })
          : history.push({
              pathname: `/group/${group_id}/budgets`,
              search: `?yearly&year=${budgetsYear}`,
            });
      }}
    />
  );
};
export default BudgetsContainer;
