import React from 'react';
import {
  FetchSearchTodoListReq,
  TodoList,
  TodoListItem,
} from '../../../../../../reducks/todoList/types';
import { customMonth, year } from '../../../../../../lib/constant';
import SearchTodoListItemComponentContainer from '../../../../../../containers/todo/modules/area/searchTodoListArea/searchResultTodoList/searchResultTodoListItem/SearchTodoListItemComponentContainer';
import styles from './SarchResultTodoList.module.scss';

interface SearchResultTodoListProps {
  searchTodoList: TodoList;
  equalsDisplayDate: (listItem: TodoListItem) => boolean;
  displayDate: (listItem: TodoListItem) => string;
  fetchSearchTodoListRequestData: FetchSearchTodoListReq;
  message: string;
}

const SearchResultTodoList = (props: SearchResultTodoListProps) => {
  const existSearchTodoList = props.searchTodoList.length !== 0;

  return (
    <div className={styles.wrapper}>
      {existSearchTodoList ? (
        <ol className={styles.listByDate}>
          {props.searchTodoList.map((listItem) => {
            return (
              <React.Fragment key={listItem.id}>
                {props.equalsDisplayDate(listItem) && (
                  <p className={styles.date}>{props.displayDate(listItem)}</p>
                )}
                <SearchTodoListItemComponentContainer
                  listItem={listItem}
                  currentYear={String(year)}
                  currentMonth={customMonth}
                  fetchSearchTodoListRequestData={props.fetchSearchTodoListRequestData}
                  formClassName={styles.childFormClassName}
                />
              </React.Fragment>
            );
          })}
        </ol>
      ) : (
        <p className={styles.message}>{props.message}</p>
      )}
    </div>
  );
};

export default SearchResultTodoList;
