import React from 'react';
import { useSelector } from 'react-redux';
import TodoListComponent from '../../../../../components/todo/modules/list/TodoListComponent/TodoListComponent';
import { TodoListItem } from '../../../../../reducks/todoList/types';
import { GroupTodoListItem } from '../../../../../reducks/groupTodoList/types';
import { getMonthDueTodoList } from '../../../../../reducks/todoList/selectors';
import { getGroupMonthDueTodoList } from '../../../../../reducks/groupTodoList/selectors';
import { useLocation } from 'react-router';

interface MonthlyDueDateTodoListContainerProps {
  selectedMonth: number;
  currentYearMonth: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MonthlyDueDateTodoListContainer = (props: MonthlyDueDateTodoListContainerProps) => {
  const pathName = useLocation().pathname.split('/')[1];

  const monthlyDueTodoList = useSelector(getMonthDueTodoList);
  const groupMonthlyDueTodoList = useSelector(getGroupMonthDueTodoList);

  const prevData = {
    dueDate: '',
  };

  const equalsDisplayDate = (listItem: TodoListItem | GroupTodoListItem) => {
    if (prevData.dueDate !== listItem.due_date) {
      prevData.dueDate = listItem.due_date;
      return true;
    }
    return false;
  };

  const displayDate = (listItem: TodoListItem | GroupTodoListItem) => {
    return listItem.due_date;
  };

  return (
    <TodoListComponent
      todoList={pathName === 'group' ? groupMonthlyDueTodoList : monthlyDueTodoList}
      currentYearMonth={props.currentYearMonth}
      message={`${props.selectedMonth}月の締切予定のToDoリストは、登録されていません。`}
      equalsDisplayDate={equalsDisplayDate}
      displayDate={displayDate}
      setEditing={props.setEditing}
    />
  );
};

export default MonthlyDueDateTodoListContainer;
