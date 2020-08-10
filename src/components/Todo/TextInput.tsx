import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textarea: {
      '& > *': {
        margin: theme.spacing(1),
        width: '360px',
      },
    },
  })
);

interface TextInputProps {
  id: string;
  variant: string;
  required: boolean;
  rows: number;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<{ value: string }>) => void;
}

const TextInput = (props: TextInputProps) => {
  const classes = useStyles();

  return (
    <TextField
      required={props.required}
      rows={props.rows}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      className={classes.textarea}
    />
  );
};

export default TextInput;
