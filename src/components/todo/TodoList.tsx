import React, { useCallback, useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
import { InputTodoList, TodoListItemMenuButton } from './index';
import { TodoListItem } from '../../reducks/todoLists/types';
import { useDispatch } from 'react-redux';
import { editTodoListItem } from '../../reducks/todoLists/operations';
import { GroupTodoListItem } from '../../reducks/groupTodoLists/types';
import { editGroupTodoListItem } from '../../reducks/groupTodoLists/operations';
import { dateStringToDate } from '../../lib/date';
import { getPathGroupId, getPathTemplateName } from '../../lib/path';
import { date } from '../../lib/constant';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '700px',
      height: 'auto',
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
  todoListItem: TodoListItem | GroupTodoListItem;
}

const TodoList = (props: TodoListProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(props.todoListItem.complete_flag);
  const [openEditTodoList, setOpenEditTodoList] = useState<boolean>(false);
  const [todoContent, setTodoContent] = useState<string>(props.todoListItem.todo_content);
  const groupId = getPathGroupId(window.location.pathname);
  const templateName = getPathTemplateName(window.location.pathname);

  const prevTodoContent = props.todoListItem.todo_content;
  const prevImplementationDate: Date = dateStringToDate(props.todoListItem.implementation_date);
  const prevDueDate: Date = dateStringToDate(props.todoListItem.due_date);
  const [selectedImplementationDate, setSelectedImplementationDate] = useState<Date | null>(
    prevImplementationDate
  );
  const [selectedDueDate, setSelectedDueDate] = useState<Date | null>(prevDueDate);

  const todoListItemId = props.todoListItem.id;

  useEffect(() => {
    closeInputTodoList();
  }, [groupId]);

  const inputTodoContent = useCallback(
    (event) => {
      setTodoContent(event.target.value as string);
    },
    [setTodoContent]
  );

  const inputImplementationDate = useCallback(
    (date: Date | null) => {
      setSelectedImplementationDate(date);
      setSelectedDueDate(date);
    },
    [setSelectedImplementationDate, setSelectedDueDate]
  );

  const inputDueDate = useCallback(
    (date: Date | null) => {
      setSelectedDueDate(date);
    },
    [setSelectedDueDate]
  );

  const openInputTodoList = useCallback(() => {
    setOpenEditTodoList(true);
    setTodoContent(prevTodoContent);
    setSelectedImplementationDate(prevImplementationDate);
    setSelectedDueDate(prevDueDate);
  }, [
    setOpenEditTodoList,
    setTodoContent,
    setSelectedImplementationDate,
    setSelectedDueDate,
    prevTodoContent,
    prevImplementationDate,
    prevDueDate,
  ]);

  const closeInputTodoList = useCallback(() => {
    setOpenEditTodoList(false);
    setTodoContent(prevTodoContent);
  }, [setOpenEditTodoList, setTodoContent, prevTodoContent]);

  const handleChangeChecked = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);

      if (templateName === 'todo') {
        return dispatch(
          editTodoListItem(
            todoListItemId,
            date,
            selectedImplementationDate,
            selectedDueDate,
            todoContent,
            event.target.checked
          )
        );
      } else if (templateName === 'group') {
        return dispatch(
          editGroupTodoListItem(
            groupId,
            todoListItemId,
            selectedImplementationDate,
            selectedDueDate,
            todoContent,
            event.target.checked
          )
        );
      }
    },
    [
      dispatch,
      setChecked,
      groupId,
      todoListItemId,
      selectedImplementationDate,
      selectedDueDate,
      todoContent,
      editTodoListItem,
    ]
  );

  const switchStrikethrough = () => {
    if (!checked) {
      return <ListItemText secondary={props.todoListItem.todo_content} />;
    } else {
      return (
        <ListItemText
          className={classes.ListItemText}
          secondary={props.todoListItem.todo_content}
        />
      );
    }
  };

  return (
    <>
      <List className={classes.root}>
        <div className={classes.groupMenu}>
          {!openEditTodoList ? (
            <>
              <ListItem>
                <Checkbox
                  color="primary"
                  checked={checked}
                  onChange={(event) => handleChangeChecked(event)}
                />
                {switchStrikethrough()}
              </ListItem>
              <TodoListItemMenuButton
                openInputTodoList={() => openInputTodoList()}
                todoListItem={props.todoListItem}
              />
            </>
          ) : (
            <InputTodoList
              buttonLabel={'保存'}
              inputTodoContent={inputTodoContent}
              inputImplementationDate={inputImplementationDate}
              inputDueDate={inputDueDate}
              closeInputTodoList={closeInputTodoList}
              todoListItemId={todoListItemId}
              selectedImplementationDate={selectedImplementationDate}
              selectedDueDate={selectedDueDate}
              todoContent={todoContent}
              completeFlag={checked}
            />
          )}
        </div>
      </List>
    </>
  );
};

export default TodoList;
