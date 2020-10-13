import React from 'react';
import { TodoListItem, TodoLists } from '../../reducks/todoLists/types';
import { TodoList } from './index';
import { GroupTodoListItem, GroupTodoLists } from '../../reducks/groupTodoLists/types';

interface ExistTodoListsProps {
  planName: string;
  todoLists: TodoLists | GroupTodoLists;
  implementationTodoLists: TodoLists | GroupTodoLists;
  dueTodoLists: TodoLists | GroupTodoLists;
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

  return props.implementationTodoLists.length === 0 && props.dueTodoLists.length === 0 ? (
    <p>{props.todoListsMessage}</p>
  ) : (
    <>{existsPlanTodoLists(props.todoLists, props.planName)}</>
  );
};

export default ExistsTodoLists;
