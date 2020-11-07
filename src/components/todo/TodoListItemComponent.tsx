import React, { useCallback, useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
import { InputTodoList, TodoListItemMenuButton } from './index';
import { TodoListItem } from '../../reducks/todoList/types';
import { useDispatch } from 'react-redux';
import { editTodoListItem } from '../../reducks/todoList/operations';
import { GroupTodoListItem } from '../../reducks/groupTodoList/types';
import { editGroupTodoListItem } from '../../reducks/groupTodoList/operations';
import { dateStringToDate } from '../../lib/date';
import { getPathGroupId, getPathTemplateName } from '../../lib/path';
import { date } from '../../lib/constant';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '700px',
      height: 'auto',
    },
    groupMenu: {
      display: 'flex',
    },
    ListItemText: {
      textDecoration: 'line-through',
    },
  })
);

interface TodoListItemComponentProps {
  todoListItem: TodoListItem | GroupTodoListItem;
  selectedDate: Date | null;
}

const TodoListItemComponent = (props: TodoListItemComponentProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(props.todoListItem.complete_flag);
  const [openEditTodoList, setOpenEditTodoList] = useState<boolean>(false);
  const groupId = getPathGroupId(window.location.pathname);
  const templateName = getPathTemplateName(window.location.pathname);

  const prevTodoContent = props.todoListItem.todo_content;
  const prevImplementationDate: Date = dateStringToDate(props.todoListItem.implementation_date);
  const prevDueDate: Date = dateStringToDate(props.todoListItem.due_date);
  const [todoContent, setTodoContent] = useState<string>('');
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
      setTodoContent(event.target.value);
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
    [setSelectedDueDate, todoContent]
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
  }, [setOpenEditTodoList, prevTodoContent, todoContent, setTodoContent]);

  const closeWhenSave = useCallback(() => {
    setOpenEditTodoList(false);
  }, [setOpenEditTodoList]);

  const handleChangeChecked = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
      if (templateName === 'todo') {
        dispatch(
          editTodoListItem(
            todoListItemId,
            date,
            props.selectedDate,
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
            date,
            props.selectedDate,
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
              selectedDate={props.selectedDate}
              selectedImplementationDate={selectedImplementationDate}
              selectedDueDate={selectedDueDate}
              todoContent={todoContent}
              completeFlag={checked}
              closeWhenSave={closeWhenSave}
            />
          )}
        </div>
      </List>
    </>
  );
};

export default TodoListItemComponent;
