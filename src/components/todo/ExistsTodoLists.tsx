import React from 'react';
import { TodoListItem, TodoList } from '../../reducks/todoLists/types';
import { TodoListItemComponent } from './index';
import { GroupTodoListItem, GroupTodoLists } from '../../reducks/groupTodoLists/types';
import { date } from '../../lib/constant';

interface ExistTodoListsProps {
  planName: string;
  todoList: TodoList | GroupTodoLists;
  implementationTodoList: TodoList | GroupTodoLists;
  dueTodoList: TodoList | GroupTodoLists;
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
                <TodoListItemComponent todoListItem={todoList} selectedDate={date} />
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
    <p>今日実施予定todo、締切予定todoは登録されていません。</p>
  ) : (
    <>{existsPlanTodoLists(props.todoList, props.planName)}</>
  );
};

export default ExistsTodoLists;
