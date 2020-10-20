import React from 'react';
import { TextInput, TodoButton } from '../todo';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
  taskContent: string;
  inputTaskClose: () => void;
  inputTaskContent: (event: React.ChangeEvent<{ value: string }>) => void;
}

const InputTask = (props: InputTaskProps) => {
  const classes = useStyles();
  const isBlankGroupName = props.taskContent === '';

  return (
    <>
      <h3>タスクを編集</h3>
      <TextInput
        id="filled-basic"
        variant="filled"
        required={true}
        rows={1}
        type={'text'}
        value={props.taskContent}
        onChange={props.inputTaskContent}
      />
      <div className={classes.buttons}>
        <TodoButton
          label={props.buttonLabel}
          disabled={isBlankGroupName}
          onClick={() => console.log('仮')}
        />
        <TodoButton label={'キャンセル'} disabled={false} onClick={() => props.inputTaskClose()} />
      </div>
    </>
  );
};

export default InputTask;
