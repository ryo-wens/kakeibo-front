import React from 'react';
import styles from './TodoListComponent.module.scss';
import { DisplayTodoListItem } from '../../../../../reducks/todoList/types';
import TodoListItemComponentContainer from '../../../../../containers/todo/modules/listItem/TodoListItemComponentContainer';

interface TodoListComponentProps {
  todoList: DisplayTodoListItem[];
  currentYear: string;
  currentMonth: string;
  message: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoListComponent = (props: TodoListComponentProps) => {
  const existTodoList = props.todoList.length !== 0;

  return (
    <div className={styles.wrapper}>
      {existTodoList ? (
        <ol className={styles.listByDate}>
          {props.todoList.map((displayTodolistItem) => {
            return (
              <li className={styles.listItemByDate} key={displayTodolistItem.date}>
                <p className={styles.date}>{displayTodolistItem.date}</p>
                <ol className={styles.todoList}>
                  {displayTodolistItem.list.map((item) => {
                    return (
                      <TodoListItemComponentContainer
                        listItem={item}
                        currentYear={props.currentYear}
                        currentMonth={props.currentMonth}
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
    </div>
  );
};

export default TodoListComponent;
