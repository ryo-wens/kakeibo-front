import React, { useEffect, useState } from 'react';
import { TodoList } from '../../../reducks/todoList/types';
import { GroupTodoList } from '../../../reducks/groupTodoList/types';
import { useLocation, useParams } from 'react-router';
import './switch-schedule-todo-list.scss';
import MonthlyTodoList from './monthly-todo-list/MonthlyTodoList';
import TodayTodoList from './today-todo-list/TodayTodoList';

interface SwitchScheduleTodoListProps {
  implementationTodoList: TodoList | GroupTodoList;
  dueTodoList: TodoList | GroupTodoList;
  selectedDate?: Date;
}

const SwitchScheduleTodoList = (props: SwitchScheduleTodoListProps) => {
  const [currentTodo, setCurrentTodo] = useState<number>(0);
  const pathName = useLocation().pathname.split('/').slice(-1)[0];
  const { id } = useParams();

  useEffect(() => {
    setCurrentTodo(0);
  }, [useLocation().pathname]);

  const switchScheduleTodoList = (value: number) => {
    setCurrentTodo(value);
  };

  const currentTodoButtonStyle = (value: number) => {
    if (currentTodo === value) {
      return {
        background: 'linear-gradient(90deg, rgba(245,117,109,1) 0%, rgba(238,62,91,1) 45%)',
        color: '#fff',
      };
    }
  };

  const switchTodayOrMonthlyTodoList = (
    planName: string,
    planTodoList: TodoList | GroupTodoList
  ) => {
    if (pathName === 'todo' || pathName === '' || pathName === id) {
      return (
        <TodayTodoList
          planName={planName}
          planTodoList={planTodoList}
          implementationTodoList={props.implementationTodoList}
          dueTodoList={props.dueTodoList}
        />
      );
    } else if (pathName === 'monthly' && props.selectedDate) {
      return (
        <MonthlyTodoList
          planName={planName}
          planTodoList={planTodoList}
          monthImplementationTodoList={props.implementationTodoList}
          monthDueTodoList={props.dueTodoList}
          selectedDate={props.selectedDate}
        />
      );
    }
  };

  return (
    <div className="switch-schedule-todo-list">
      <div className="switch-schedule-todo-list__switch-button">
        <button onClick={() => switchScheduleTodoList(0)} style={currentTodoButtonStyle(0)}>
          実施予定のTodo
        </button>
        <button onClick={() => switchScheduleTodoList(1)} style={currentTodoButtonStyle(1)}>
          締切予定のTodo
        </button>
      </div>
      {currentTodo === 0
        ? switchTodayOrMonthlyTodoList('実施予定', props.implementationTodoList)
        : switchTodayOrMonthlyTodoList('締切予定', props.dueTodoList)}
    </div>
  );
};
export default SwitchScheduleTodoList;
