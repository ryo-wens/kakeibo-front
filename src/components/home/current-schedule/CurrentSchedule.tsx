import React, { useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { fetchDateTodoList } from '../../../reducks/todoList/operations';
import { useDispatch, useSelector } from 'react-redux';
import { date } from '../../../lib/constant';
import { useLocation, useParams } from 'react-router';
import './current-shedule.scss';
import CurrentScheduleTodo from './todo/CurrentScheduleTodo';
import {
  getTodayDueTodoList,
  getTodayImplementationTodoList,
} from '../../../reducks/todoList/selectors';
import {
  getGroupTodayDueTodoList,
  getGroupTodayImplementationTodoList,
} from '../../../reducks/groupTodoList/selectors';
import { fetchGroupTodayTodoList } from '../../../reducks/groupTodoList/operations';

const CurrentSchedule = () => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const { id } = useParams();
  const todayImplementationTodoList = useSelector(getTodayImplementationTodoList);
  const todayDueTodoList = useSelector(getTodayDueTodoList);
  const groupTodayImplementationTodoList = useSelector(getGroupTodayImplementationTodoList);
  const groupTodayDueTodoList = useSelector(getGroupTodayDueTodoList);
  const todayYear = String(date.getFullYear());
  const todayMonth: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const todayDate: string = ('0' + date.getDate()).slice(-2);

  const fetchGroupData = (signal: CancelTokenSource) => {
    dispatch(fetchGroupTodayTodoList(Number(id), todayYear, todayMonth, todayDate, signal));
  };

  useEffect(() => {
    if (pathName === 'group') {
      const signal = axios.CancelToken.source();
      fetchGroupData(signal);
      const interval = setInterval(() => {
        fetchGroupData(signal);
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [todayYear, todayMonth, todayDate, pathName]);

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchDateTodoList(todayYear, todayMonth, todayDate, signal));
      return () => signal.cancel();
    }
  }, [todayYear, todayMonth, todayDate, pathName]);

  return (
    <div className="current-schedule">
      <h3 className="current-schedule__title">今日の予定</h3>
      <div className="current-schedule__content">
        <h4>Todoリスト</h4>
        <CurrentScheduleTodo
          implementationTodoList={
            pathName === 'group' ? groupTodayImplementationTodoList : todayImplementationTodoList
          }
          dueTodoList={pathName === 'group' ? groupTodayDueTodoList : todayDueTodoList}
        />
      </div>
      <div className="current-schedule__content">
        <h4>買い物リスト</h4>
      </div>
      {pathName === 'group' && (
        <div className="current-schedule__content">
          <h4>割り当てられたタスク</h4>
        </div>
      )}
    </div>
  );
};

export default CurrentSchedule;
