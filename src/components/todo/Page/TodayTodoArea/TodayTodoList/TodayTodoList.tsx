import React from 'react';
import { TodoListItem, TodoList } from '../../../../../reducks/todoList/types';
import { GroupTodoListItem, GroupTodoList } from '../../../../../reducks/groupTodoList/types';
import { customMonth, date, year } from '../../../../../lib/constant';
import TodoListItemComponentContainer from '../../../../../containers/todo/modules/ListItem/TodoListItemComponentContainer/TodoListItemComponentContainer';

interface TodayTodoListProps {
  planName: string;
  planTodoList: TodoList | GroupTodoList;
  implementationTodoList: TodoList | GroupTodoList;
  dueTodoList: TodoList | GroupTodoList;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayTodoList = (props: TodayTodoListProps) => {
  const currentYearMonth = `${year}/${customMonth}`;

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
                <TodoListItemComponentContainer
                  listItem={todoList}
                  currentYearMonth={currentYearMonth}
                  selectedDate={date}
                  setEditing={props.setEditing}
                />
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
