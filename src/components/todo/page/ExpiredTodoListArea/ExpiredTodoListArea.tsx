import React from 'react';
import './expired-todo-list-area.scss';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TodoListItemComponentContainer from '../../../../containers/todo/modules/listItem/TodoListItemComponentContainer';
import { DisplayTodoListItem } from '../../../../reducks/todoList/types';

interface ExpiredTodoListAreaProps {
  expiredTodoList: DisplayTodoListItem[];
  displayExpiredTodoList: DisplayTodoListItem[];
  currentYear: string;
  currentMonth: string;
  readMore: boolean;
  setReadMore: React.Dispatch<React.SetStateAction<boolean>>;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExpiredTodoListArea = (props: ExpiredTodoListAreaProps) => {
  const existExpiredTodoList = props.displayExpiredTodoList.length !== 0;
  const initialDisplayNumberTodoList = 3;

  return (
    <div>
      <div className="expired-todo-list-area">
        {existExpiredTodoList ? (
          <>
            <ol className="expired-todo-list-area__list-by-date">
              {props.displayExpiredTodoList.map((displayTodolistItem) => {
                return (
                  <li key={displayTodolistItem.date}>
                    <p className="expired-todo-list-area__date">{displayTodolistItem.date}</p>
                    <ol className="expired-todo-list-area__todo-list">
                      {displayTodolistItem.list.map((item) => {
                        return (
                          <li className="expired-todo-list-area__todo-list-item" key={item.id}>
                            <TodoListItemComponentContainer
                              listItem={item}
                              currentYear={props.currentYear}
                              currentMonth={props.currentMonth}
                              setEditing={props.setEditing}
                              inputTodoClassName={'todo-list-item-component__input-todo--max-width'}
                            />
                          </li>
                        );
                      })}
                    </ol>
                  </li>
                );
              })}
            </ol>
            {props.expiredTodoList.length > initialDisplayNumberTodoList && (
              <button
                className="expired-todo-list-area__read-more-button"
                onClick={() => props.setReadMore(!props.readMore)}
              >
                {props.readMore ? 'close' : 'Read More'}
                {props.readMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowRightIcon />}
              </button>
            )}
          </>
        ) : (
          <p className="expired-todo-list-area__message">期限切れのToDoリストはありません。</p>
        )}
      </div>
    </div>
  );
};

export default ExpiredTodoListArea;
