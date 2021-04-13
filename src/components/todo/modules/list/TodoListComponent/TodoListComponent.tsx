import React from 'react';
import styles from './TodoListComponent.module.scss';
import { DisplayTodoListItem } from '../../../../../reducks/todoList/types';
import TodoListItemComponentContainer from '../../../../../containers/todo/modules/listItem/TodoListItemComponentContainer';

interface TodoListComponentProps {
  todoList: DisplayTodoListItem[];
  selectedYearParam: string;
  selectedMonthParam: string;
  message: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoListComponent = (props: TodoListComponentProps) => {
  const existTodoList = props.todoList.length !== 0;

  return (
    <>
      {existTodoList ? (
        <ol className={styles.listByDate}>
          {props.todoList.map((displayTodolistItem) => {
            return (
              <li className={styles.listItemByDate} key={displayTodolistItem.date}>
                <p className={styles.date}>{displayTodolistItem.date}</p>
                <ol className={styles.todoList}>
                  {displayTodolistItem.todoList.map((item) => {
                    return (
                      <TodoListItemComponentContainer
                        listItem={item}
                        selectedYearParam={props.selectedYearParam}
                        selectedMonthParam={props.selectedMonthParam}
                        setEditing={props.setEditing}
                        formClassName={styles.childFormClassName}
                        key={item.id}
                      />
                    );
                  })}
                </ol>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className={styles.message}>{props.message}</p>
      )}
    </>
  );
};

export default TodoListComponent;
