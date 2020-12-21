import React from 'react';
import { TodoListItem, TodoList } from '../../../../reducks/todoList/types';
import { TodoListItemComponent } from '../../index';
import { GroupTodoListItem, GroupTodoList } from '../../../../reducks/groupTodoList/types';
import { date } from '../../../../lib/constant';

interface TodayTodoListProps {
  planName: string;
  planTodoList: TodoList | GroupTodoList;
  implementationTodoList: TodoList | GroupTodoList;
  dueTodoList: TodoList | GroupTodoList;
}

const TodayTodoList = (props: TodayTodoListProps) => {
  const existsPlanTodoLists = (
    todoLists: (TodoListItem | GroupTodoListItem)[],
    planName: string
  ) => {
    if (todoLists.length > 0) {
      return (
        <>
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
      return <p>{planName}のTodoは登録されていません。</p>;
    }
  };

  return props.implementationTodoList.length === 0 && props.dueTodoList.length === 0 ? (
    <p>今日の、実施予定todo、締切予定todoは登録されていません。</p>
  ) : (
    <>{existsPlanTodoLists(props.planTodoList, props.planName)}</>
  );
};

export default TodayTodoList;
