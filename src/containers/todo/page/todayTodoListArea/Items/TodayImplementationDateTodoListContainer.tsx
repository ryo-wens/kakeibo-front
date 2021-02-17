import React from 'react';
import { useSelector } from 'react-redux';
import TodoListComponent from '../../../../../components/todo/modules/list/TodoListComponent/TodoListComponent';
import { getTodayImplementationTodoList } from '../../../../../reducks/todoList/selectors';
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

  return (
    <TodoListComponent
      todoList={
        pathName === 'group' ? groupTodayImplementationTodoList : todayImplementationTodoList
      }
      currentYearMonth={props.currentYearMonth}
      message={'今日の実施予定のToDoリストは、登録されていません。'}
      setEditing={props.setEditing}
    />
  );
};

export default TodayImplementationDateTodoListContainer;
