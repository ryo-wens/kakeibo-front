import React, { useCallback, useEffect, useState } from 'react';
import { TodoButton, TodoMenu } from '../components/todo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { fetchMonthTodoLists } from '../reducks/todoLists/operations';
import { getApprovedGroups, getUnapprovedGroups } from '../reducks/groups/selectors';
import { getDueTodoLists, getImplementationTodoLists } from '../reducks/todoLists/selectors';
import { State } from '../reducks/store/types';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { WeeksTabs } from '../components/todo';
import { DatePicker } from '../components/uikit';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: '40px 0px 0px 200px',
    },
    date: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    datePicker: {
      width: `200px`,
    },
  })
);

const ScheduleTodo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const approvedGroups = getApprovedGroups(selector);
  const unapprovedGroups = getUnapprovedGroups(selector);
  const implementationTodoLists = getImplementationTodoLists(selector);
  const dueTodoLists = getDueTodoLists(selector);
  const dt: Date = new Date();
  const year = String(dt.getFullYear());
  const month: string = ('0' + (dt.getMonth() + 1)).slice(-2);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    if (approvedGroups.length === 0 && unapprovedGroups.length === 0) {
      dispatch(fetchGroups());
    }
  }, []);

  useEffect(() => {
    if (implementationTodoLists.length === 0 && dueTodoLists.length === 0) {
      dispatch(fetchMonthTodoLists(year, month));
    }
  }, []);

  const handleDateChange = useCallback(
    (selectedDate) => {
      setSelectedDate(selectedDate as Date);
    },
    [setSelectedDate]
  );

  const getTodayDate = useCallback(() => {
    setSelectedDate(dt);
  }, [selectedDate]);

  const getNextWeek = useCallback(() => {
    const nextWeek = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + 7
    );
    setSelectedDate(nextWeek);
  }, [selectedDate, setSelectedDate]);

  const getPreviousWeek = useCallback(() => {
    const previousWeek = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() - 7
    );
    setSelectedDate(previousWeek);
  }, [selectedDate, setSelectedDate]);

  return (
    <>
      <TodoMenu />
      <div className={classes.root}>
        <div className={classes.date}>
          <div className={classes.datePicker}>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              id={'date-picker-dialog'}
              label={''}
              required={false}
            />
          </div>
          <TodoButton label={'<'} disabled={false} onClick={() => getPreviousWeek()} />
          <TodoButton label={'>'} disabled={false} onClick={() => getNextWeek()} />
          <TodoButton label={'今日'} disabled={false} onClick={() => getTodayDate()} />
        </div>
        <WeeksTabs selectedDate={selectedDate} />
      </div>
    </>
  );
};

export default ScheduleTodo;
