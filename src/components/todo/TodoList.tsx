import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
import { TodoListItemMenuButton } from './index';
import { TodoListItem } from '../../reducks/todoLists/types';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '40px',
      width: '700px',
      zIndex: 1100,
    },
    groupMenu: {
      display: 'flex',
    },
    ListItemText: {
      textDecoration: 'line-through',
    },
  })
);

interface TodoListProps {
  todoListItem: TodoListItem;
}

const TodoList = (props: TodoListProps) => {
  const classes = useStyles();
  const [checked, setChecked] = useState<boolean>(false);
  const [strikethrough, setStrikethrough] = useState<string>('');

  const handleChange = () => {
    if (!checked) {
      setChecked(true);
      setStrikethrough(classes.ListItemText);
    } else {
      setChecked(false);
      setStrikethrough('');
    }
  };

  return (
    <>
      <List className={classes.root}>
        <div className={classes.groupMenu}>
          <ListItem>
            <Checkbox color="primary" onClick={() => handleChange()} checked={checked} />
            <ListItemText className={strikethrough} secondary={props.todoListItem.todo_content} />
          </ListItem>
          <TodoListItemMenuButton />
        </div>
      </List>
    </>
  );
};

export default TodoList;