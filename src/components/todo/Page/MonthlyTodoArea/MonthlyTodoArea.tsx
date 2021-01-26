import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import axios, { CancelTokenSource } from 'axios';
import {
  fetchGroupExpiredTodoList,
  fetchGroupMonthTodoList,
} from '../../../../reducks/groupTodoList/operations';
import { fetchGroups } from '../../../../reducks/groups/operations';
import { fetchMonthTodoList } from '../../../../reducks/todoList/operations';
import InputYears from '../../../uikit/InputYears';
import './monthly-todo-area.scss';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import MonthlyImplementationDateTodoListContainer from '../../../../containers/todo/page/MonthlyTodoListArea/MonthlyImplementationDateTodoListContainer/MonthlyImplementationDateTodoListContainer';
import MonthlyDueDateTodoListContainer from '../../../../containers/todo/page/MonthlyTodoListArea/MonthlyDueDateTodoListContainer/MonthlyDueDateTodoListContainer';

interface MonthlyTodoAreaProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYearMonth: string;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MonthlyTodoArea = (props: MonthlyTodoAreaProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const { group_id } = useParams();

  const currentYear = String(props.selectedYear);
  const currentMonth = (`0` + `${props.selectedMonth}`).slice(-2);
  const currentYearMonth = `${currentYear}/${currentMonth}`;

  const fetchGroupTodoList = (signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupExpiredTodoList(Number(group_id), signal));
    dispatch(fetchGroupMonthTodoList(Number(group_id), currentYear, currentMonth, signal));
  };

  useEffect(() => {
    if (pathName === 'group' && !props.editing) {
      const signal = axios.CancelToken.source();
      fetchGroupTodoList(signal);
      const interval = setInterval(() => {
        fetchGroupTodoList(signal);
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [props.selectedYear, props.selectedMonth, props.editing]);

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchMonthTodoList(currentYear, currentMonth, signal));
      return () => signal.cancel();
    }
  }, [props.selectedYear, props.selectedMonth]);

  return (
    <>
      <InputYears
        selectedYear={props.selectedYear}
        selectedMonth={props.selectedMonth}
        setSelectedMonth={props.setSelectedMonth}
        setSelectedYear={props.setSelectedYear}
      />
      <div className="monthly-todo-area__spacer" />
      <SwitchItemTabs
        leftButtonLabel={'実施予定のToDo'}
        rightButtonLabel={'締切予定のToDo'}
        leftItem={
          <MonthlyImplementationDateTodoListContainer
            selectedMonth={props.selectedMonth}
            currentYearMonth={currentYearMonth}
            setEditing={props.setEditing}
          />
        }
        rightItem={
          <MonthlyDueDateTodoListContainer
            selectedMonth={props.selectedMonth}
            currentYearMonth={currentYearMonth}
            setEditing={props.setEditing}
          />
        }
      />
    </>
  );
};

export default MonthlyTodoArea;
