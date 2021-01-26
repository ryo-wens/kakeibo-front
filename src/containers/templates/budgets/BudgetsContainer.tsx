import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import Budgets from '../../../templates/budgets/Budgets';
import { push } from 'connected-react-router';

const BudgetsContainer = () => {
  const dispatch = useDispatch();
  const { group_id } = useParams();
  const pathName = useLocation().pathname.split('/')[1];
  const query = useLocation().search;

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

    if (query === '?yearly') {
      style.background = 'linear-gradient(90deg, rgba(245,117,109,1) 0%, rgba(238,62,91,1) 45%)';
      style.color = '#fff';
    }

    return style;
  };

  return (
    <Budgets
      query={query}
      currentStandardColor={currentStandardColor}
      currentYearlyColor={currentYearlyColor}
      routingStandard={() =>
        pathName !== 'group'
          ? dispatch(push('/budgets?standard'))
          : dispatch(push(`/group/${group_id}/budgets?standard`))
      }
      routingYearly={() =>
        pathName !== 'group'
          ? dispatch(push('/budgets?yearly'))
          : dispatch(push(`/group/${group_id}/budgets?yearly`))
      }
    />
  );
};
export default BudgetsContainer;
