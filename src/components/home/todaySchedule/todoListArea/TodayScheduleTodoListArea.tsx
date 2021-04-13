import React from 'react';
import styles from './TodayScheduleTodoListArea.module.scss';
import { TodoListItem } from '../../../../reducks/todoList/types';
import TodoListItemComponentContainer from '../../../../containers/todo/modules/listItem/TodoListItemComponentContainer';

interface TodayScheduleTodoListAreaProps {
  todoList: TodoListItem[];
  selectedYearParam: string;
  selectedMonthParam: string;
  message: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayScheduleTodoListArea = (props: TodayScheduleTodoListAreaProps) => {
  const existTodoList = props.todoList.length !== 0;

  return (
    <>
      {existTodoList ? (
        <ol className={styles.todoList}>
          {props.todoList.map((listItem) => {
            return (
              <TodoListItemComponentContainer
                listItem={listItem}
                selectedYearParam={props.selectedYearParam}
                selectedMonthParam={props.selectedMonthParam}
                setEditing={props.setEditing}
                key={listItem.id}
              />
            );
          })}
        </ol>
      ) : (
        <p className={styles.message}>{props.message}</p>
      )}
    </>
  );
};

export default TodayScheduleTodoListArea;
