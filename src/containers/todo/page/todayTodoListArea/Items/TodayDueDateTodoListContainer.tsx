import React from 'react';
import { useSelector } from 'react-redux';
import TodoListComponent from '../../../../../components/todo/modules/list/TodoListComponent/TodoListComponent';
import { getTodayDueTodoList } from '../../../../../reducks/todoList/selectors';
import { getGroupTodayDueTodoList } from '../../../../../reducks/groupTodoList/selectors';
import { useLocation } from 'react-router';

interface TodayDueDateTodoListContainerProps {
  currentYear: string;
  currentMonth: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayDueDateTodoListContainer = (props: TodayDueDateTodoListContainerProps) => {
  const pathName = useLocation().pathname.split('/')[1];
  const todayDueTodoList = useSelector(getTodayDueTodoList);
  const groupTodayDueTodoList = useSelector(getGroupTodayDueTodoList);

  return (
    <TodoListComponent
      todoList={pathName === 'group' ? groupTodayDueTodoList : todayDueTodoList}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      message={'今日の締切予定のToDoリストは、登録されていません。'}
      setEditing={props.setEditing}
    />
  );
};

export default TodayDueDateTodoListContainer;
