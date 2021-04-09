import React from 'react';
import { useSelector } from 'react-redux';
import TodoListComponent from '../../../../../../components/todo/modules/list/TodoListComponent/TodoListComponent';
import { getMonthlyDueTodoList } from '../../../../../../reducks/todoList/selectors';
import { getGroupMonthlyDueTodoList } from '../../../../../../reducks/groupTodoList/selectors';
import { useLocation } from 'react-router';
import { DisplayTodoList } from '../../../../../../reducks/todoList/types';

interface MonthlyDueDateTodoListContainerProps {
  selectedMonth: number;
  selectedYearParam: string;
  selectedMonthParam: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MonthlyDueDateTodoListContainer = (props: MonthlyDueDateTodoListContainerProps) => {
  const pathName = useLocation().pathname.split('/')[1];

  const monthlyDueTodoList = useSelector(getMonthlyDueTodoList);
  const groupMonthlyDueTodoList = useSelector(getGroupMonthlyDueTodoList);

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
    monthlyDueTodoList,
    groupMonthlyDueTodoList
  );

  return (
    <TodoListComponent
      todoList={todoList}
      selectedYearParam={props.selectedYearParam}
      selectedMonthParam={props.selectedMonthParam}
      message={`${props.selectedMonth}月の締切予定のToDoリストは、登録されていません。`}
      setEditing={props.setEditing}
    />
  );
};

export default MonthlyDueDateTodoListContainer;
