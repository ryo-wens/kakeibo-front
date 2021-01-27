import React from 'react';
import { useSelector } from 'react-redux';
import TodoListComponent from '../../../../../components/todo/modules/List/TodoListComponent/TodoListComponent';
import { getTodayImplementationTodoList } from '../../../../../reducks/todoList/selectors';
import { TodoListItem } from '../../../../../reducks/todoList/types';
import { GroupTodoListItem } from '../../../../../reducks/groupTodoList/types';
import { getGroupTodayImplementationTodoList } from '../../../../../reducks/groupTodoList/selectors';
import { useLocation } from 'react-router';

interface TodayImplementationDateTodoListContainerProps {
  currentYearMonth: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayImplementationDateTodoListContainer = (
  props: TodayImplementationDateTodoListContainerProps
) => {
  const pathName = useLocation().pathname.split('/')[1];
  const todayImplementationTodoList = useSelector(getTodayImplementationTodoList);
  const groupTodayImplementationTodoList = useSelector(getGroupTodayImplementationTodoList);

  const prevData = {
    implementationDate: '',
  };

  const equalsDisplayDate = (listItem: TodoListItem | GroupTodoListItem) => {
    if (prevData.implementationDate !== listItem.implementation_date) {
      prevData.implementationDate = listItem.implementation_date;
      return true;
    }
    return false;
  };

  const displayDate = (listItem: TodoListItem | GroupTodoListItem) => {
    return listItem.implementation_date;
  };

  return (
    <TodoListComponent
      todoList={
        pathName === 'group' ? groupTodayImplementationTodoList : todayImplementationTodoList
      }
      currentYearMonth={props.currentYearMonth}
      message={'今日の実施予定のToDoリストは、登録されていません。'}
      equalsDisplayDate={equalsDisplayDate}
      displayDate={displayDate}
      setEditing={props.setEditing}
    />
  );
};

export default TodayImplementationDateTodoListContainer;
