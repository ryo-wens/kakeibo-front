import React from 'react';
import { useSelector } from 'react-redux';
import TodoListComponent from '../../../../../components/todo/modules/list/TodoListComponent/TodoListComponent';
import { getMonthImplementationTodoList } from '../../../../../reducks/todoList/selectors';
import { getGroupMonthlyImplementationTodoList } from '../../../../../reducks/groupTodoList/selectors';
import { useLocation } from 'react-router';

interface MonthlyImplementationDateTodoListContainerProps {
  selectedMonth: number;
  currentYear: string;
  currentMonth: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MonthlyImplementationDateTodoListContainer = (
  props: MonthlyImplementationDateTodoListContainerProps
) => {
  const pathName = useLocation().pathname.split('/')[1];

  const monthlyImplementationTodoList = useSelector(getMonthImplementationTodoList);
  const groupMonthlyImplementationTodoList = useSelector(getGroupMonthlyImplementationTodoList);

  return (
    <TodoListComponent
      todoList={
        pathName === 'group' ? groupMonthlyImplementationTodoList : monthlyImplementationTodoList
      }
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      message={`${props.selectedMonth}月の実施予定のToDoリストは、登録されていません。`}
      setEditing={props.setEditing}
    />
  );
};

export default MonthlyImplementationDateTodoListContainer;
