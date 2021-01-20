import React, { useCallback, useState } from 'react';
import 'date-fns';
import { TodoButton } from './index';
import { AddButton, DatePicker } from '../uikit';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { addTodoListItem } from '../../reducks/todoList/operations';
import { addGroupTodoListItem } from '../../reducks/groupTodoList/operations';
import { getPathTemplateName } from '../../lib/path';
import { date } from '../../lib/constant';
import { useParams } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textarea: {
      '& > *': {
        margin: theme.spacing(1),
        width: '500px',
      },
    },
    box: {
      width: '100%',
      borderColor: '#ccc',
    },
    buttons: {
      display: 'flex',
    },
  })
);

interface AddTodoProps {
  date: Date;
}

const AddTodo = (props: AddTodoProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [todoContent, setTodoContent] = useState<string>('');
  const [selectedImplementationDate, setSelectedImplementationDate] = useState<Date | null>(
    props.date
  );
  const [selectedDueDate, setSelectedDueDate] = useState<Date | null>(props.date);
  const entityType = getPathTemplateName(window.location.pathname);
  const { group_id } = useParams();
  const today = date;

  const handleOpen = () => {
    setOpen(true);
    setSelectedImplementationDate(props.date);
    setSelectedDueDate(props.date);
  };

  const handleClose = () => {
    setOpen(false);
    setTodoContent('');
  };

  const handleImplementationDateChange = (date: Date | null) => {
    setSelectedImplementationDate(date);
    setSelectedDueDate(date);
  };

  const handleDueDateChange = (date: Date | null) => {
    setSelectedDueDate(date);
  };

  const inputTodo = useCallback(
    (event) => {
      setTodoContent(event.target.value);
    },
    [setTodoContent]
  );

  const isBlankTodoContent = todoContent === '';

  const addTodo = () => {
    if (entityType === 'todo') {
      return dispatch(
        addTodoListItem(today, props.date, selectedImplementationDate, selectedDueDate, todoContent)
      );
    } else if (entityType === 'group') {
      return dispatch(
        addGroupTodoListItem(
          Number(group_id),
          today,
          props.date,
          selectedImplementationDate,
          selectedDueDate,
          todoContent
        )
      );
    }
  };

  return (
    <>
      {open ? (
        <form noValidate autoComplete="off">
          <Box border={1} className={classes.box}>
            <TextField
              className={classes.textarea}
              id="filled-basic"
              variant="outlined"
              type={'text'}
              value={todoContent}
              onChange={inputTodo}
            />
            <div className={classes.buttons} style={{ justifyContent: 'flex-end' }}>
              <DatePicker
                id={'date'}
                label={'実施日'}
                value={selectedImplementationDate}
                onChange={handleImplementationDateChange}
                required={true}
                disabled={false}
                minDate={new Date('1900-01-01')}
              />
              <DatePicker
                id={'date'}
                label={'締切日'}
                value={selectedDueDate}
                onChange={handleDueDateChange}
                required={true}
                disabled={false}
                minDate={selectedImplementationDate}
              />
            </div>
          </Box>

          <div className={classes.buttons}>
            <TodoButton
              label={'Todoを追加'}
              disabled={isBlankTodoContent}
              onClick={() => {
                addTodo();
                handleClose();
              }}
            />
            <TodoButton label={'キャンセル'} disabled={false} onClick={() => handleClose()} />
          </div>
        </form>
      ) : (
        <AddButton label={'Todoを追加'} onClick={() => handleOpen()} />
      )}
    </>
  );
};

export default AddTodo;
