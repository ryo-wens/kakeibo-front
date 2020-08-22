import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { TodoButton } from './index';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textarea: {
      '& > *': {
        margin: theme.spacing(1),
        width: '60ch',
      },
    },
    box: {
      width: '60ch',
      borderColor: '#ccc',
    },
    buttons: {
      display: 'flex',
    },
  })
);

const TaskTextFields = () => {
  const classes = useStyles();

  return (
    <form noValidate autoComplete="off">
      <Box border={1} className={classes.box}>
        <TextField className={classes.textarea} id="filled-basic" variant="filled" />
        <div className={classes.buttons} style={{ justifyContent: 'flex-end' }}>
          <TodoButton
            label={'画像をアップロード'}
            disabled={false}
            onClick={() => console.log('クリック')}
          />
          <TodoButton label={'期限'} disabled={false} onClick={() => console.log('クリック')} />
        </div>
      </Box>

      <div className={classes.buttons}>
        <TodoButton
          label={'タスクを追加'}
          disabled={false}
          onClick={() => console.log('クリック')}
        />
        <TodoButton label={'キャンセル'} disabled={false} onClick={() => console.log('クリック')} />
      </div>
    </form>
  );
};

export default TaskTextFields;
