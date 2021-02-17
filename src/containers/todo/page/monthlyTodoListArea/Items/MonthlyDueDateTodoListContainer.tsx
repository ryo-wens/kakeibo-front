import React from 'react';
import { useSelector } from 'react-redux';
import TodoListComponent from '../../../../../components/todo/modules/list/TodoListComponent/TodoListComponent';
import { getMonthlyDueTodoList } from '../../../../../reducks/todoList/selectors';
import { getGroupMonthlyDueTodoList } from '../../../../../reducks/groupTodoList/selectors';
import { useLocation } from 'react-router';

interface MonthlyDueDateTodoListContainerProps {
  selectedMonth: number;
  currentYearMonth: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MonthlyDueDateTodoListContainer = (props: MonthlyDueDateTodoListContainerProps) => {
  const pathName = useLocation().pathname.split('/')[1];

  const monthlyDueTodoList = useSelector(getMonthlyDueTodoList);
  const groupMonthlyDueTodoList = useSelector(getGroupMonthlyDueTodoList);

  return (
    <TodoListComponent
      todoList={pathName === 'group' ? groupMonthlyDueTodoList : monthlyDueTodoList}
      currentYearMonth={props.currentYearMonth}
      message={`${props.selectedMonth}月の締切予定のToDoリストは、登録されていません。`}
      setEditing={props.setEditing}
    />
  );
};

export default MonthlyDueDateTodoListContainer;
