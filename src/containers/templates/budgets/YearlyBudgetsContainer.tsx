import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { push } from 'connected-react-router';
import axios from 'axios';
import { getYearlyBudgets } from '../../../reducks/budgets/selectors';
import { getGroupYearlyBudgets } from '../../../reducks/groupBudgets/selectors';
import { fetchGroups } from '../../../reducks/groups/operations';
import { fetchStandardBudgets, fetchYearlyBudgets } from '../../../reducks/budgets/operations';
import YearlyBudgets from '../../../templates/budgets/YearlyBudgets';

const YearlyBudgetsContainer = () => {
  const dispatch = useDispatch();
  const date = new Date();
  const { group_id } = useParams();
  const path = useLocation().pathname;
  const pathName = useLocation().pathname.split('/')[1];
  const totalBudget = useSelector(getYearlyBudgets).yearly_total_budget;
  const totalGroupBudget = useSelector(getGroupYearlyBudgets).yearly_total_budget;
  const [years, setYears] = useState<number>(date.getFullYear());

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchGroups(signal));
      const interval = setInterval(() => {
        dispatch(fetchGroups(signal));
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [pathName]);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName !== 'group') {
      dispatch(fetchStandardBudgets(signal));
      dispatch(fetchYearlyBudgets(years, signal));
    }

    return () => signal.cancel();
  }, []);

  const currentPageColor = () => {
    const style = {
      background: '',
      color: '',
    };

    if (path === '/yearly/budgets' || path === `/group/${group_id}/yearly/budgets`) {
      style.background = 'linear-gradient(90deg, rgba(245,117,109,1) 0%, rgba(238,62,91,1) 45%)';
      style.color = '#fff';
    }

    return style;
  };

  return (
    <YearlyBudgets
      pathName={pathName}
      years={years}
      setYears={setYears}
      totalBudget={totalBudget}
      totalGroupBudget={totalGroupBudget}
      currentPageColor={currentPageColor}
      routingStandardBudgets={() =>
        pathName !== 'group'
          ? dispatch(push('/standard/budgets'))
          : dispatch(push(`/group/${group_id}/standard/budgets`))
      }
      routingYearlyBudgets={() =>
        pathName !== 'group'
          ? dispatch(push('/yearly/budgets'))
          : dispatch(push(`/group/${group_id}/yearly/budgets`))
      }
    />
  );
};
export default YearlyBudgetsContainer;
