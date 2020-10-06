import React, { useCallback, useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
import { InputTodoList, TodoListItemMenuButton } from './index';
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
  const [openEditTodoList, setOpenEditTodoList] = useState<boolean>(false);
  const [todoContent, setTodoContent] = useState<string>('');
  const [selectedImplementationDate, setSelectedImplementationDate] = useState<Date | null>(
    new Date()
  );
  const [selectedDueDate, setSelectedDueDate] = useState<Date | null>(new Date());

  const changePrevDateType = (date: string) => {
    const prevDates = date.split(/[/()]/, 3);
    const prevYear = Number(prevDates[0]);
    const prevMonth = Number(prevDates[1]) - 1;
    const prevDate = Number(prevDates[2]);
    return new Date(prevYear, prevMonth, prevDate);
  };

  const prevTodoContent = props.todoListItem.todo_content;
  const prevImplementationDate: Date = changePrevDateType(props.todoListItem.implementation_date);
  const prevDueDate: Date = changePrevDateType(props.todoListItem.due_date);

  const groupId = 0;

  useEffect(() => {
    closeInputTodoList();
  }, [groupId]);

  const inputTodoContent = useCallback(
    (event) => {
      setTodoContent(event.target.value as string);
    },
    [setTodoContent]
  );

  const inputImplementationDate = (date: Date | null) => {
    setSelectedImplementationDate(date);
    setSelectedDueDate(date);
  };

  const inputDueDate = (date: Date | null) => {
    setSelectedDueDate(date);
  };

  const handleChangeChecked = () => {
    if (!checked) {
      setChecked(true);
      setStrikethrough(classes.ListItemText);
    } else {
      setChecked(false);
      setStrikethrough('');
    }
  };

  const openInputTodoList = () => {
    setOpenEditTodoList(true);
    setTodoContent(prevTodoContent);
    setSelectedImplementationDate(prevImplementationDate);
    setSelectedDueDate(prevDueDate);
  };

  const closeInputTodoList = () => {
    setOpenEditTodoList(false);
    setTodoContent('');
  };

  const editTodoList = () => {
    if (!openEditTodoList) {
      return (
        <>
          <ListItem>
            <Checkbox color="primary" onClick={() => handleChangeChecked()} checked={checked} />
            <ListItemText className={strikethrough} secondary={props.todoListItem.todo_content} />
          </ListItem>
          <TodoListItemMenuButton openInputTodoList={() => openInputTodoList()} />
        </>
      );
    } else {
      return (
        <InputTodoList
          groupId={0}
          inputTodoContent={inputTodoContent}
          buttonLabel={'保存'}
          todoContent={todoContent}
          selectedImplementationDate={selectedImplementationDate}
          selectedDueDate={selectedDueDate}
          inputImplementationDate={inputImplementationDate}
          inputDueDate={inputDueDate}
          closeInputTodoList={closeInputTodoList}
        />
      );
    }
  };

  return (
    <>
      <List className={classes.root}>
        <div className={classes.groupMenu}>{editTodoList()}</div>
      </List>
    </>
  );
};

export default TodoList;
