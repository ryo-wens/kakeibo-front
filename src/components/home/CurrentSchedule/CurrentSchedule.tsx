import React, { useEffect } from 'react';
import axios from 'axios';
import { fetchDateTodoList } from '../../../reducks/todoList/operations';
import { useDispatch, useSelector } from 'react-redux';
import { date } from '../../../lib/constant';
import { useLocation, useParams } from 'react-router';
import './current-shedule.scss';
import {
  getTodayDueTodoList,
  getTodayImplementationTodoList,
} from '../../../reducks/todoList/selectors';
import {
  getGroupTodayDueTodoList,
  getGroupTodayImplementationTodoList,
} from '../../../reducks/groupTodoList/selectors';
import { fetchGroupTodayTodoList } from '../../../reducks/groupTodoList/operations';
import SwitchItemTabs from '../../uikit/tabs/SwitchItemTabs';
import TodayTodoList from '../../todo/Page/TodayTodoArea/TodayTodoList/TodayTodoList';
import { getTodayShoppingList } from '../../../reducks/shoppingList/selectors';
import { fetchTodayShoppingList } from '../../../reducks/shoppingList/operations';
import ShoppingListArea from './ShoppingListArea/ShoppingListArea';

interface CurrentScheduleProps {
  todoEditing: boolean;
  setTodoEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const CurrentSchedule = (props: CurrentScheduleProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const { group_id } = useParams();
  const todayImplementationTodoList = useSelector(getTodayImplementationTodoList);
  const todayDueTodoList = useSelector(getTodayDueTodoList);
  const groupTodayImplementationTodoList = useSelector(getGroupTodayImplementationTodoList);
  const groupTodayDueTodoList = useSelector(getGroupTodayDueTodoList);
  const todayShoppingList = useSelector(getTodayShoppingList);
  const todayYear = String(date.getFullYear());
  const todayMonth: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const todayDate: string = ('0' + date.getDate()).slice(-2);
  const currentYearMonth = `${todayYear}/${todayMonth}`;

  useEffect(() => {
    if (pathName === 'group' && !props.todoEditing) {
      const signal = axios.CancelToken.source();
      dispatch(fetchGroupTodayTodoList(Number(group_id), todayYear, todayMonth, todayDate, signal));
      const interval = setInterval(() => {
        dispatch(
          fetchGroupTodayTodoList(Number(group_id), todayYear, todayMonth, todayDate, signal)
        );
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [todayYear, todayMonth, todayDate, props.todoEditing, pathName, group_id]);

  useEffect(() => {
    if (pathName !== 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchDateTodoList(todayYear, todayMonth, todayDate, signal));
      dispatch(fetchTodayShoppingList(todayYear, todayMonth, todayDate, signal));
      return () => signal.cancel();
    }
  }, [todayYear, todayMonth, todayDate, pathName]);

  return (
    <div className="current-schedule">
      <h3 className="current-schedule__title">今日の予定</h3>
      <div className="current-schedule__content">
        <h4>Todoリスト</h4>
        <div className="current-schedule__todo">
          <SwitchItemTabs
            leftButtonLabel={'実施予定のToDo'}
            rightButtonLabel={'締切予定のToDo'}
            leftItem={
              <TodayTodoList
                planName={'実施予定'}
                planTodoList={
                  pathName === 'group'
                    ? groupTodayImplementationTodoList
                    : todayImplementationTodoList
                }
                implementationTodoList={
                  pathName === 'group'
                    ? groupTodayImplementationTodoList
                    : todayImplementationTodoList
                }
                dueTodoList={pathName === 'group' ? groupTodayDueTodoList : todayDueTodoList}
                setEditing={props.setTodoEditing}
              />
            }
            rightItem={
              <TodayTodoList
                planName={'締切予定'}
                planTodoList={pathName === 'group' ? groupTodayDueTodoList : todayDueTodoList}
                implementationTodoList={
                  pathName === 'group'
                    ? groupTodayImplementationTodoList
                    : todayImplementationTodoList
                }
                dueTodoList={pathName === 'group' ? groupTodayDueTodoList : todayDueTodoList}
                setEditing={props.setTodoEditing}
              />
            }
          />
        </div>
      </div>
      <div className="current-schedule__content">
        <h4>買い物リスト</h4>
        <SwitchItemTabs
          leftButtonLabel={'日別'}
          rightButtonLabel={'カテゴリ別'}
          leftItem={
            <ShoppingListArea
              shoppingListByDate={todayShoppingList}
              currentYearMonth={currentYearMonth}
              message={'今日の買い物リストは、登録されていません。'}
            />
          }
          rightItem={<div />}
        />
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
