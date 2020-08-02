import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

interface TodoButtonProps {
  label: string;
}

const TodoButton = (props: TodoButtonProps) => {
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" color="default" className={classes.button}>
        {props.label}
      </Button>
    </div>
  );
};

export default TodoButton;
