import React, { useEffect } from 'react';
import axios from 'axios';
import { fetchDateTodoList } from '../../../reducks/todoList/operations';
import { useDispatch } from 'react-redux';
import { date } from '../../../lib/constant';
import { useLocation } from 'react-router';
import './current-shedule.scss';

const CurrentSchedule = () => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const todayYear = String(date.getFullYear());
  const todayMonth: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const todayDate: string = ('0' + date.getDate()).slice(-2);

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
