import React, { useEffect, useRef, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
import { InputTodoList } from './index';
import { TodoListItem } from '../../reducks/todoList/types';
import { useDispatch } from 'react-redux';
import { editTodoListItem } from '../../reducks/todoList/operations';
import { GroupTodoListItem } from '../../reducks/groupTodoList/types';
import { editGroupTodoListItem } from '../../reducks/groupTodoList/operations';
import { dateStringToDate } from '../../lib/date';
import { date } from '../../lib/constant';
import { useLocation, useParams } from 'react-router';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
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
  displayDueDate?: () => void;
}

const TodoListItemComponent = (props: TodoListItemComponentProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const { id } = useParams();
  const prevImplementationDate: Date = dateStringToDate(props.todoListItem.implementation_date);
  const prevDueDate: Date = dateStringToDate(props.todoListItem.due_date);
  const [openEditTodoList, setOpenEditTodoList] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [todoContent, setTodoContent] = useState<string>('');
  const [selectedImplementationDate, setSelectedImplementationDate] = useState<Date | null>(
    prevImplementationDate
  );
  const [selectedDueDate, setSelectedDueDate] = useState<Date | null>(prevDueDate);
  const inputTodoRef = useRef<HTMLDivElement>(null);

  const noDifferenceTodoContent = todoContent === props.todoListItem.todo_content;
  const noDifferenceSelectedImplementationDate =
    (selectedImplementationDate as Date).getTime() === prevImplementationDate.getTime();
  const noDifferenceSelectedDueDate = (selectedDueDate as Date).getTime() === prevDueDate.getTime();
  const isBlankTodoContent = todoContent === '';

  const disabledSaveButton = () => {
    if (isBlankTodoContent) {
      return true;
    } else if (!noDifferenceTodoContent) {
      return false;
    } else if (noDifferenceSelectedImplementationDate && noDifferenceSelectedDueDate) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setChecked(props.todoListItem.complete_flag);
    setTodoContent(props.todoListItem.todo_content);
  }, []);

  const inputTodoContent = (event: React.ChangeEvent<{ value: string }>) => {
    setTodoContent(event.target.value);
  };

  const inputImplementationDate = (date: Date | null) => {
    setSelectedImplementationDate(date);
    setSelectedDueDate(date);
  };

  const inputDueDate = (date: Date | null) => {
    setSelectedDueDate(date);
  };

  const openInputTodoList = () => {
    setOpenEditTodoList(true);
    setTodoContent(props.todoListItem.todo_content);
    setSelectedImplementationDate(prevImplementationDate);
    setSelectedDueDate(prevDueDate);
  };

  const closeInputTodoList = () => {
    setOpenEditTodoList(false);
    setTodoContent(props.todoListItem.todo_content);
  };

  const onClickCloseInputTodoList = (event: Event) => {
    if (inputTodoRef.current && !inputTodoRef.current.contains(event.target as Node)) {
      setOpenEditTodoList(false);
      setTodoContent(props.todoListItem.todo_content);
    }
  };

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (pathName !== 'group') {
      dispatch(
        editTodoListItem(
          props.todoListItem.id,
          date,
          props.selectedDate,
          selectedImplementationDate,
          selectedDueDate,
          todoContent,
          event.target.checked
        )
      );
    } else if (pathName === 'group') {
      dispatch(
        editGroupTodoListItem(
          Number(id),
          props.todoListItem.id,
          date,
          props.selectedDate,
          selectedImplementationDate,
          selectedDueDate,
          todoContent,
          event.target.checked
        )
      );
    }
  };

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
              {props.displayDueDate && props.displayDueDate()}
              <EditIcon
                className="task-list-item__edit-icon"
                onClick={() => {
                  openInputTodoList();
                }}
              />
            </ListItem>
          </>
        ) : (
          <InputTodoList
            buttonLabel={'保存'}
            inputTodoContent={inputTodoContent}
            inputImplementationDate={inputImplementationDate}
            inputDueDate={inputDueDate}
            closeInputTodoList={closeInputTodoList}
            todoListItemId={props.todoListItem.id}
            selectedDate={props.selectedDate}
            selectedImplementationDate={selectedImplementationDate}
            selectedDueDate={selectedDueDate}
            todoContent={todoContent}
            completeFlag={checked}
            onClickSave={
              pathName === 'group'
                ? editGroupTodoListItem(
                    Number(id),
                    props.todoListItem.id,
                    date,
                    props.selectedDate,
                    selectedImplementationDate,
                    selectedDueDate,
                    todoContent,
                    checked
                  )
                : editTodoListItem(
                    props.todoListItem.id,
                    date,
                    props.selectedDate,
                    selectedImplementationDate,
                    selectedDueDate,
                    todoContent,
                    checked
                  )
            }
            closeInputTodo={setOpenEditTodoList}
            onClickCloseInputTodoList={onClickCloseInputTodoList}
            disabledSaveButton={disabledSaveButton()}
            ref={inputTodoRef}
          />
        )}
      </div>
    </>
  );
};

export default TodoListItemComponent;
