import React from 'react';
import { TextInput, TodoButton } from '../todo';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { State } from '../../reducks/store/types';

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
  noDifferenceTaskName: boolean;
  operation: (dispatch: Dispatch<Action>, getState: () => State) => Promise<void>;
  taskName: string;
}

const InputTask = (props: InputTaskProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isBlankTaskName = props.taskName === '';

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
          disabled={isBlankTaskName || props.noDifferenceTaskName}
          onClick={() => dispatch(props.operation) && props.inputTaskClose()}
        />
        <TodoButton label={'キャンセル'} disabled={false} onClick={() => props.inputTaskClose()} />
      </div>
    </>
  );
};

export default InputTask;
