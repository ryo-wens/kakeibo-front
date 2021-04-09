import React from 'react';
import { useSelector } from 'react-redux';
import TodoListComponent from '../../../../../../components/todo/modules/list/TodoListComponent/TodoListComponent';
import { getTodayImplementationTodoList } from '../../../../../../reducks/todoList/selectors';
import { getGroupTodayImplementationTodoList } from '../../../../../../reducks/groupTodoList/selectors';
import { useLocation } from 'react-router';
import { DisplayTodoList } from '../../../../../../reducks/todoList/types';

interface TodayImplementationDateTodoListContainerProps {
  selectedYearParam: string;
  selectedMonthParam: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayImplementationDateTodoListContainer = (
  props: TodayImplementationDateTodoListContainerProps
) => {
  const pathName = useLocation().pathname.split('/')[1];
  const todayImplementationTodoList = useSelector(getTodayImplementationTodoList);
  const groupTodayImplementationTodoList = useSelector(getGroupTodayImplementationTodoList);

  const determineTodoList = (
    pathName: string,
    todoList: DisplayTodoList,
    groupTodoList: DisplayTodoList
  ) => {
    if (pathName === 'group') {
      return groupTodoList;
    }

    return todoList;
  };

  const todoList: DisplayTodoList = determineTodoList(
    pathName,
    todayImplementationTodoList,
    groupTodayImplementationTodoList
  );

  return (
    <TodoListComponent
      todoList={todoList}
      selectedYearParam={props.selectedYearParam}
      selectedMonthParam={props.selectedMonthParam}
      message={'今日の実施予定のToDoリストは、登録されていません。'}
      setEditing={props.setEditing}
    />
  );
};

export default TodayImplementationDateTodoListContainer;
