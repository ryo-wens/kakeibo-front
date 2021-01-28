import React from 'react';
import { useSelector } from 'react-redux';
import TodoListComponent from '../../../../../components/todo/modules/list/TodoListComponent/TodoListComponent';
import { TodoListItem } from '../../../../../reducks/todoList/types';
import { GroupTodoListItem } from '../../../../../reducks/groupTodoList/types';
import { getMonthImplementationTodoList } from '../../../../../reducks/todoList/selectors';
import { getGroupMonthImplementationTodoList } from '../../../../../reducks/groupTodoList/selectors';
import { useLocation } from 'react-router';

interface MonthlyImplementationDateTodoListContainerProps {
  selectedMonth: number;
  currentYearMonth: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MonthlyImplementationDateTodoListContainer = (
  props: MonthlyImplementationDateTodoListContainerProps
) => {
  const pathName = useLocation().pathname.split('/')[1];

  const monthlyImplementationTodoList = useSelector(getMonthImplementationTodoList);
  const groupMonthlyImplementationTodoList = useSelector(getGroupMonthImplementationTodoList);

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
        pathName === 'group' ? groupMonthlyImplementationTodoList : monthlyImplementationTodoList
      }
      currentYearMonth={props.currentYearMonth}
      message={`${props.selectedMonth}月の実施予定のToDoリストは、登録されていません。`}
      equalsDisplayDate={equalsDisplayDate}
      displayDate={displayDate}
      setEditing={props.setEditing}
    />
  );
};

export default MonthlyImplementationDateTodoListContainer;
