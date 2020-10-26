import React, { useCallback, useState, useEffect } from 'react';
import 'date-fns';
import { TodoButton } from './index';
import { AddButton } from '../uikit';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch } from 'react-redux';
import { createTodoListItem } from '../../reducks/todoLists/operations';
import { createGroupTodoListItem } from '../../reducks/groupTodoLists/operations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textarea: {
      '& > *': {
        margin: theme.spacing(1),
        width: '600px',
      },
    },
    box: {
      width: '700px',
      borderColor: '#ccc',
    },
    buttons: {
      display: 'flex',
    },
  })
);

interface AddTodoProps {
  groupId?: number;
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
  const pathName: string = window.location.pathname;
  const paths = pathName.split('/', 2);
  const type = paths[1];

  const handleOpen = () => {
    setOpen(true);
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

  useEffect(() => {
    handleClose();
  }, [props.groupId]);

  const inputTodo = useCallback(
    (event) => {
      setTodoContent(event.target.value);
    },
    [setTodoContent]
  );

  const isBlankTodoContent = todoContent === '';

  const switchOperation = () => {
    if (type === 'todo') {
      return dispatch(createTodoListItem(selectedImplementationDate, selectedDueDate, todoContent));
    } else if (type === 'schedule-todo') {
      return dispatch(createTodoListItem(selectedImplementationDate, selectedDueDate, todoContent));
    } else if (type === 'group-todo' && typeof props.groupId === 'number') {
      return dispatch(
        createGroupTodoListItem(
          props.groupId,
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
              <TodoButton
                label={'画像をアップロード'}
                disabled={false}
                onClick={() => console.log('クリック')}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="実施日"
                  format="yyyy年 MM月dd日"
                  value={selectedImplementationDate}
                  onChange={handleImplementationDateChange}
                  minDate={new Date()}
                  required={true}
                />
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="期限日"
                  format="yyyy年 MM月dd日"
                  value={selectedDueDate}
                  onChange={handleDueDateChange}
                  minDate={selectedImplementationDate}
                  required={true}
                />
              </MuiPickersUtilsProvider>
            </div>
          </Box>

          <div className={classes.buttons}>
            <TodoButton
              label={'Todoを追加'}
              disabled={isBlankTodoContent}
              onClick={() => switchOperation() && handleClose()}
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
