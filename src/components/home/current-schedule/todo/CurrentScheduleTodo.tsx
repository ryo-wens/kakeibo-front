import React, { useEffect, useState } from 'react';
import { ExistsTodoLists } from '../../../todo';
import { TodoList } from '../../../../reducks/todoList/types';
import { GroupTodoList } from '../../../../reducks/groupTodoList/types';
import './current-schedule-todo.scss';
import { useLocation } from 'react-router';

interface SwitchTodoListProps {
  implementationTodoList: TodoList | GroupTodoList;
  dueTodoList: TodoList | GroupTodoList;
}

const CurrentScheduleTodo = (props: SwitchTodoListProps) => {
  const [currentTodo, setCurrentTodo] = useState<number>(0);

  useEffect(() => {
    setCurrentTodo(0);
  }, [useLocation().pathname]);

  const switchTodo = (value: number) => {
    setCurrentTodo(value);
  };

  const currentTodoButtonStyle = (value: number) => {
    if (currentTodo === value) {
      return {
        background: 'linear-gradient(90deg, rgba(252,139,26,1) 0%, rgba(254,103,12,1) 47%)',
        color: '#fff',
      };
    }
  };

  return (
    <div className="current-schedule-todo">
      <div className="current-schedule-todo__switch-button">
        <button onClick={() => switchTodo(0)} style={currentTodoButtonStyle(0)}>
          実施予定のTodo
        </button>
        <button onClick={() => switchTodo(1)} style={currentTodoButtonStyle(1)}>
          締切予定のTodo
        </button>
      </div>
      {currentTodo === 0 ? (
        <ExistsTodoLists
          planName={'実施予定'}
          todoList={props.implementationTodoList}
          implementationTodoList={props.implementationTodoList}
          dueTodoList={props.dueTodoList}
        />
      ) : (
        <ExistsTodoLists
          planName={'締切予定'}
          todoList={props.dueTodoList}
          implementationTodoList={props.implementationTodoList}
          dueTodoList={props.dueTodoList}
        />
      )}
    </div>
  );
};
export default CurrentScheduleTodo;
