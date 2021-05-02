import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import { fetchYearlyBudgets } from '../../../reducks/budgets/operations';
import { fetchCategories } from '../../../reducks/categories/operations';
import { fetchGroups } from '../../../reducks/groups/operations';
import { fetchGroupYearlyBudgets } from '../../../reducks/groupBudgets/operations';
import { fetchGroupTransactionsList } from '../../../reducks/groupTransactions/operations';
import {
  getSortCategoryTransactions,
  getTotalExpense,
} from '../../../reducks/transactions/selectors';
import {
  getSortCategoryGroupTransactions,
  getTotalGroupExpense,
} from '../../../reducks/groupTransactions/selectors';
import { getAmountPerDay, getCurrentMonthBudgets } from '../../../reducks/budgets/selectors';
import {
  getCurrentMonthGroupBudget,
  getGroupAmountPerDay,
} from '../../../reducks/groupBudgets/selectors';
import { month, year } from '../../../lib/constant';
import { SelectYears } from '../../../lib/date';
import Home from '../../../templates/home/Home';
import CheckAuth from '../../auth/CheckAuth';
import dayjs from 'dayjs';

const HomeContainer = () => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const pathName = useLocation().pathname.split('/')[1];
  const amountPerDay = useSelector(getAmountPerDay);
  const groupAmountPerDay = useSelector(getGroupAmountPerDay);
  const thisMonthTotalExpense = useSelector(getTotalExpense);
  const thisMonthGroupTotalExpense = useSelector(getTotalGroupExpense);
  const currentMonthBudgetStatus = useSelector(getCurrentMonthBudgets);
  const currentMonthGroupBudgetStatus = useSelector(getCurrentMonthGroupBudget);
  const sortCategoryTransactionsList = useSelector(getSortCategoryTransactions);
  const sortCategoryGroupTransactionsList = useSelector(getSortCategoryGroupTransactions);
  const [todoEditing, setTodoEditing] = useState(false);

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchYearlyBudgets(year, signal));
      dispatch(fetchCategories(signal));

      return () => {
        signal.cancel();
      };
    }
  }, [pathName]);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName === 'group' && !todoEditing) {
      const years: SelectYears = {
        selectedYear: String(year),
        selectedMonth: dayjs(String(month)).format('MM'),
      };

      dispatch(fetchGroupTransactionsList(Number(group_id), years, signal));
      dispatch(fetchGroupYearlyBudgets(Number(group_id), year, signal));
      dispatch(fetchGroups(signal));

      const interval = setInterval(() => {
        dispatch(fetchGroupTransactionsList(Number(group_id), years, signal));
        dispatch(fetchGroupYearlyBudgets(Number(group_id), year, signal));
        dispatch(fetchGroups(signal));
      }, 3000);

      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [pathName, group_id, todoEditing]);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName !== 'group') {
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

  return (
    <>
      <CheckAuth />
      <Home
        pathName={pathName}
        todoEditing={todoEditing}
        amountPerDay={amountPerDay}
        setTodoEditing={setTodoEditing}
        groupAmountPerDay={groupAmountPerDay}
        currentMonthBudgetStatus={currentMonthBudgetStatus}
        currentMonthGroupBudgetStatus={currentMonthGroupBudgetStatus}
        sortCategoryTransactionsList={sortCategoryTransactionsList}
        sortCategoryGroupTransactionsList={sortCategoryGroupTransactionsList}
        thisMonthTotalExpense={thisMonthTotalExpense}
        thisMonthGroupTotalExpense={thisMonthGroupTotalExpense}
      />
    </>
  );
};
export default HomeContainer;
