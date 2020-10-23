import React from 'react';
import { TextInput, TodoButton } from '../todo';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { addTaskItem } from '../../reducks/groupTasks/operations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      display: 'flex',
    },
    paper: {
      width: 400,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface InputTaskProps {
  buttonLabel: string;
  groupId: number;
  inputTaskClose: () => void;
  inputTaskName: (event: React.ChangeEvent<{ value: string }>) => void;
  taskName: string;
}

const InputTask = (props: InputTaskProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isBlankGroupName = props.taskName === '';

  return (
    <>
      <TextInput
        id="filled-basic"
        variant="filled"
        required={true}
        rows={1}
        type={'text'}
        value={props.taskName}
        onChange={props.inputTaskName}
      />
      <div className={classes.buttons}>
        <TodoButton
          label={props.buttonLabel}
          disabled={isBlankGroupName}
          onClick={() => dispatch(addTaskItem(props.groupId, props.taskName))}
        />
        <TodoButton label={'キャンセル'} disabled={false} onClick={() => props.inputTaskClose()} />
      </div>
    </>
  );
};

export default InputTask;
