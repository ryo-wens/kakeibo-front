import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { fetchMonthTodoList } from '../reducks/todoLists/operations';
import { getApprovedGroups, getUnapprovedGroups } from '../reducks/groups/selectors';
import {
  getMonthDueTodoList,
  getMonthImplementationTodoList,
  getMonthTodoListMessage,
} from '../reducks/todoLists/selectors';
import { State } from '../reducks/store/types';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '../components/uikit';
import { TodoButton, TodoMenu, WeeksTabs, WeeksTodoLists } from '../components/todo';
import { dateToDateString } from '../lib/date';
import { getPathGroupId, getPathTemplateName } from '../lib/path';
import {
  getGroupDueTodoLists,
  getGroupImplementationTodoLists,
  getGroupTodoListsMessage,
} from '../reducks/groupTodoLists/selectors';
import { fetchGroupMonthTodoLists } from '../reducks/groupTodoLists/operations';
import { date } from '../lib/constant';

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

const WeekTodo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const approvedGroups = getApprovedGroups(selector);
  const unapprovedGroups = getUnapprovedGroups(selector);
  const monthImplementationTodoList = getMonthImplementationTodoList(selector);
  const monthDueTodoList = getMonthDueTodoList(selector);
  const monthTodoListMessage = getMonthTodoListMessage(selector);
  const groupImplementationTodoList = getGroupImplementationTodoLists(selector);
  const groupDueTodoList = getGroupDueTodoLists(selector);
  const groupTodoListMessage = getGroupTodoListsMessage(selector);
  const entityType = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);
  const year = String(date.getFullYear());
  const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    if (entityType === 'group' && approvedGroups.length === 0 && unapprovedGroups.length === 0) {
      dispatch(fetchGroups());
    }
  }, []);

  useEffect(() => {
    if (
      entityType !== 'group' &&
      !monthImplementationTodoList.length &&
      !monthDueTodoList.length &&
      !monthTodoListMessage
    ) {
      dispatch(fetchMonthTodoList(year, month));
    }
  }, []);

  useEffect(() => {
    if (
      entityType === 'group' &&
      !groupImplementationTodoList.length &&
      !groupDueTodoList.length &&
      !groupTodoListMessage
    ) {
      dispatch(fetchGroupMonthTodoLists(groupId, year, month));
    }
  }, [groupId]);

  const handleDateChange = useCallback(
    (selectedDate) => {
      setSelectedDate(selectedDate as Date);
    },
    [setSelectedDate]
  );

  const getTodayDate = useCallback(() => {
    setSelectedDate(date);
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

  const isSelectedDateToday = dateToDateString(selectedDate) === dateToDateString(new Date());

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
          <TodoButton
            label={'<'}
            disabled={isSelectedDateToday}
            onClick={() => getPreviousWeek()}
          />
          <TodoButton label={'>'} disabled={false} onClick={() => getNextWeek()} />
          <TodoButton label={'今日'} disabled={false} onClick={() => getTodayDate()} />
        </div>
        <WeeksTabs selectedDate={selectedDate} />
        <WeeksTodoLists
          selectedDate={selectedDate}
          monthImplementationTodoList={monthImplementationTodoList}
          monthDueTodoList={monthDueTodoList}
          groupMonthImplementationTodoList={groupImplementationTodoList}
          groupMonthDueTodoList={groupDueTodoList}
        />
      </div>
    </>
  );
};

export default WeekTodo;
