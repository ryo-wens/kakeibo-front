import React from 'react';
import { useSelector } from 'react-redux';
import TodoListComponent from '../../../../../../components/todo/modules/list/TodoListComponent/TodoListComponent';
import { getMonthImplementationTodoList } from '../../../../../../reducks/todoList/selectors';
import { getGroupMonthlyImplementationTodoList } from '../../../../../../reducks/groupTodoList/selectors';
import { useLocation } from 'react-router';
import { DisplayTodoList } from '../../../../../../reducks/todoList/types';

interface MonthlyImplementationDateTodoListContainerProps {
  selectedMonth: number;
  selectedYearParam: string;
  selectedMonthParam: string;

  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MonthlyImplementationDateTodoListContainer = (
  props: MonthlyImplementationDateTodoListContainerProps
) => {
  const pathName = useLocation().pathname.split('/')[1];

  const monthlyImplementationTodoList = useSelector(getMonthImplementationTodoList);
  const groupMonthlyImplementationTodoList = useSelector(getGroupMonthlyImplementationTodoList);

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
    monthlyImplementationTodoList,
    groupMonthlyImplementationTodoList
  );

  return (
    <TodoListComponent
      todoList={todoList}
      selectedYearParam={props.selectedYearParam}
      selectedMonthParam={props.selectedMonthParam}
      message={`${props.selectedMonth}月の実施予定のToDoリストは、登録されていません。`}
      setEditing={props.setEditing}
    />
  );
};

export default MonthlyImplementationDateTodoListContainer;
