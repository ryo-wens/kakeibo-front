import React from 'react';
import './expired-todo-list-area.scss';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TodoListItemComponentContainer from '../../../../containers/todo/modules/listItem/TodoListItemComponentContainer';
import { TodoListItem } from '../../../../reducks/todoList/types';
import { GroupTodoListItem } from '../../../../reducks/groupTodoList/types';

interface ExpiredTodoListAreaProps {
  expiredTodoList: (TodoListItem | GroupTodoListItem)[];
  slicedExpiredTodoList: (TodoListItem | GroupTodoListItem)[];
  currentYearMonth: string;
  equalsDisplayDate: (listItem: TodoListItem | GroupTodoListItem) => boolean;
  displayDate: (listItem: TodoListItem | GroupTodoListItem) => string;
  readMore: boolean;
  setReadMore: React.Dispatch<React.SetStateAction<boolean>>;
  initialDisplayNumberTodoList: number;
}

const ExpiredTodoListArea = (props: ExpiredTodoListAreaProps) => {
  return (
    <div>
      <div className="expired-todo-list-area">
        {props.expiredTodoList.length ? (
          <>
            {props.slicedExpiredTodoList.map((listItem) => {
              return (
                <div key={listItem.id}>
                  {props.equalsDisplayDate(listItem) && (
                    <p className="expired-todo-list-area__date">{props.displayDate(listItem)}</p>
                  )}
                  <TodoListItemComponentContainer
                    listItem={listItem}
                    currentYearMonth={props.currentYearMonth}
                  />
                </div>
              );
            })}
            {props.expiredTodoList.length > props.initialDisplayNumberTodoList && (
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
