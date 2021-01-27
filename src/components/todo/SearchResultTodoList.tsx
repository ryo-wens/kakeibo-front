import React from 'react';
import { customMonth, year } from '../../lib/constant';
import '../../assets/todo/search-result-todo-list.scss';
import { TodoListItem } from '../../reducks/todoList/types';
import { GroupTodoListItem } from '../../reducks/groupTodoList/types';
import TodoListItemComponentContainer from '../../containers/todo/modules/ListItem/TodoListItemComponentContainer';

interface SearchResultTodoListProps {
  currentDateType: string;
  todoList: (TodoListItem | GroupTodoListItem)[];
  message: string;
}

const SearchResultTodoList = (props: SearchResultTodoListProps) => {
  const currentYearMonth = `${year}/${customMonth}`;

  const searchResultTodoList = (todoList: (TodoListItem | GroupTodoListItem)[]) => {
    let prevDate = '';

    return todoList.map((listItem: TodoListItem | GroupTodoListItem) => {
      const displayDate =
        props.currentDateType === 'implementation_date'
          ? listItem.implementation_date
          : listItem.due_date;

      const equalsDisplayDate = () => {
        if (prevDate !== displayDate) {
          prevDate = displayDate;
          return <p className="search-result-todo-list__date">{displayDate}</p>;
        }
      };

      return (
        <div key={listItem.id}>
          {equalsDisplayDate()}
          <TodoListItemComponentContainer listItem={listItem} currentYearMonth={currentYearMonth} />
        </div>
      );
    });
  };

  return (
    <>
      {props.todoList.length ? searchResultTodoList(props.todoList) : <span>{props.message}</span>}
    </>
  );
};

export default SearchResultTodoList;
