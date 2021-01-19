import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      width: '100%',
    },
  })
);

type TextInputProps = {
  value?: string | number | null;
  id: string;
  label: string;
  type: string;
  required: boolean;
  fullWidth: boolean;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = (props: TextInputProps) => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.form}
      type={props.type}
      value={props.value}
      id={props.id}
      label={props.label}
      required={props.required}
      fullWidth={props.fullWidth}
      onChange={props.onChange}
      disabled={props.disabled}
    />
  );
};
export default TextInput;
