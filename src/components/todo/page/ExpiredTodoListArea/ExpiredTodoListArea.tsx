import React from 'react';
import styles from './ExpiredTodoListArea.module.scss';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TodoListItemComponentContainer from '../../../../containers/todo/modules/listItem/TodoListItemComponentContainer';
import { DisplayTodoListItem } from '../../../../reducks/todoList/types';
import cn from 'classnames';

interface ExpiredTodoListAreaProps {
  expiredTodoList: DisplayTodoListItem[];
  displayExpiredTodoList: DisplayTodoListItem[];
  currentYear: string;
  currentMonth: string;
  readMore: boolean;
  setReadMore: React.Dispatch<React.SetStateAction<boolean>>;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  readMoreBtnClassName: string;
}

const ExpiredTodoListArea = (props: ExpiredTodoListAreaProps) => {
  const existExpiredTodoList = props.displayExpiredTodoList.length !== 0;
  const initialDisplayNumberTodoList = 3;

  return (
    <>
      {existExpiredTodoList ? (
        <>
          <ol className={styles.listByDate}>
            {props.displayExpiredTodoList.map((displayTodolistItem) => {
              return (
                <li className={styles.listItemByDate} key={displayTodolistItem.date}>
                  <p className={styles.date}>{displayTodolistItem.date}</p>
                  <ol className={styles.todoList}>
                    {displayTodolistItem.todoList.map((item) => {
                      return (
                        <TodoListItemComponentContainer
                          listItem={item}
                          currentYear={props.currentYear}
                          currentMonth={props.currentMonth}
                          setEditing={props.setEditing}
                          key={item.id}
                        />
                      );
                    })}
                  </ol>
                </li>
              );
            })}
          </ol>
          {props.expiredTodoList.length > initialDisplayNumberTodoList && (
            <button
              className={cn(styles.readMoreBtn, props.readMoreBtnClassName)}
              onClick={() => props.setReadMore(!props.readMore)}
            >
              {props.readMore ? 'close' : 'Read More'}
              {props.readMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowRightIcon />}
            </button>
          )}
        </>
      ) : (
        <p className={styles.message}>期限切れのToDoリストはありません。</p>
      )}
    </>
  );
};

export default ExpiredTodoListArea;
