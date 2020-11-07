import React, { useState } from 'react';
import { TodoList, TodoListItem } from '../../reducks/todoList/types';
import { TodoListItemComponent } from './index';
import { date } from '../../lib/constant';
import { Divider } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: 'auto',
      height: 'auto',
    },
    button: {
      backgroundColor: '#3DAEB2',
      border: 'none',
      borderRadius: '16px',
      color: '#fff',
      height: '20px',
      margin: '0px 0px 20px 20px',
      outline: 'none',
      width: '70px',
    },
  })
);

interface ExpiredTodoListProps {
  expiredTodoList: TodoList;
}

const ExpiredTodoList = (props: ExpiredTodoListProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);

  const showMoreTodoList = () => {
    setExpanded(true);
  };

  const hideMoreTodoList = () => {
    setExpanded(false);
  };

  const expiredTodoList = props.expiredTodoList.map((todoListItem: TodoListItem) => {
    return (
      <TodoListItemComponent
        key={todoListItem.id}
        todoListItem={todoListItem}
        selectedDate={date}
      />
    );
  });

  const switchExpanded = () => {
    if (!expanded) {
      return (
        <>
          {expiredTodoList.length > 3 ? expiredTodoList.slice(0, 3) : expiredTodoList}
          {expiredTodoList.length > 3 && (
            <button className={classes.button} onClick={() => showMoreTodoList()}>
              More
            </button>
          )}
        </>
      );
    } else if (expanded) {
      return (
        <>
          {expiredTodoList}
          <button className={classes.button} onClick={() => hideMoreTodoList()}>
            Close
          </button>
        </>
      );
    }
  };

  return (
    <div className={classes.root}>
      <span>期限切れのTodo</span>
      <Divider />
      {switchExpanded()}
    </div>
  );
};

export default ExpiredTodoList;
