import React from 'react';
import { TodoListItem, TodoLists } from '../../reducks/todoLists/types';
import { TodoList } from './index';
import { GroupTodoListItem, GroupTodoLists } from '../../reducks/groupTodoLists/types';

interface ExistTodoListsProps {
  planName: string;
  todoList: TodoLists | GroupTodoLists;
  implementationTodoList: TodoLists | GroupTodoLists;
  dueTodoList: TodoLists | GroupTodoLists;
  todoListsMessage: string;
}

const ExistsTodoLists = (props: ExistTodoListsProps) => {
  const existsPlanTodoLists = (
    todoLists: (TodoListItem | GroupTodoListItem)[],
    planName: string
  ) => {
    if (todoLists.length > 0) {
      return (
        <>
          <p>{planName}のTodo</p>
          {todoLists.map((todoList: TodoListItem | GroupTodoListItem) => {
            return (
              <div key={todoList.id}>
                <TodoList todoListItem={todoList} />
              </div>
            );
          })}
        </>
      );
    } else {
      return <p>{planName}のTodoはありません。</p>;
    }
  };

  return props.implementationTodoList.length === 0 && props.dueTodoList.length === 0 ? (
    <p>{props.todoListsMessage}</p>
  ) : (
    <>{existsPlanTodoLists(props.todoList, props.planName)}</>
  );
};

export default ExistsTodoLists;
