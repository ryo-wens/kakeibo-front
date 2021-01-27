import React from 'react';
import { useSelector } from 'react-redux';
import TodoListComponent from '../../../../../components/todo/modules/List/TodoListComponent/TodoListComponent';
import { getTodayDueTodoList } from '../../../../../reducks/todoList/selectors';
import { TodoListItem } from '../../../../../reducks/todoList/types';
import { GroupTodoListItem } from '../../../../../reducks/groupTodoList/types';
import { getGroupTodayDueTodoList } from '../../../../../reducks/groupTodoList/selectors';
import { useLocation } from 'react-router';

interface TodayDueDateTodoListContainerProps {
  currentYearMonth: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayDueDateTodoListContainer = (props: TodayDueDateTodoListContainerProps) => {
  const pathName = useLocation().pathname.split('/')[1];
  const todayDueTodoList = useSelector(getTodayDueTodoList);
  const groupTodayDueTodoList = useSelector(getGroupTodayDueTodoList);

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
      todoList={pathName === 'group' ? groupTodayDueTodoList : todayDueTodoList}
      currentYearMonth={props.currentYearMonth}
      message={'今日の締切予定のToDoリストは、登録されていません。'}
      equalsDisplayDate={equalsDisplayDate}
      displayDate={displayDate}
      setEditing={props.setEditing}
    />
  );
};

export default TodayDueDateTodoListContainer;
