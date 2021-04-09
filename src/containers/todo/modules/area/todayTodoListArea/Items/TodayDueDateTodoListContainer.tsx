import React from 'react';
import { useSelector } from 'react-redux';
import TodoListComponent from '../../../../../../components/todo/modules/list/TodoListComponent/TodoListComponent';
import { getTodayDueTodoList } from '../../../../../../reducks/todoList/selectors';
import { getGroupTodayDueTodoList } from '../../../../../../reducks/groupTodoList/selectors';
import { useLocation } from 'react-router';
import { DisplayTodoList } from '../../../../../../reducks/todoList/types';

interface TodayDueDateTodoListContainerProps {
  selectedYearParam: string;
  selectedMonthParam: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayDueDateTodoListContainer = (props: TodayDueDateTodoListContainerProps) => {
  const pathName = useLocation().pathname.split('/')[1];
  const todayDueTodoList = useSelector(getTodayDueTodoList);
  const groupTodayDueTodoList = useSelector(getGroupTodayDueTodoList);

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
    todayDueTodoList,
    groupTodayDueTodoList
  );

  return (
    <TodoListComponent
      todoList={todoList}
      selectedYearParam={props.selectedYearParam}
      selectedMonthParam={props.selectedMonthParam}
      message={'今日の締切予定のToDoリストは、登録されていません。'}
      setEditing={props.setEditing}
    />
  );
};

export default TodayDueDateTodoListContainer;
