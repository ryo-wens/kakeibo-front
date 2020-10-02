import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    full: {
      marginBottom: 16,
    },
    half: {
      marginLeft: 8,
      marginRight: 8,
      marginBottom: 16,
      minWidth: 130,
      width: 'calc(83% - 16px)',
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
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = (props: TextInputProps) => {
  const classes = useStyles();
  const textStyle = props.fullWidth ? classes.full : classes.half;
  return (
    <TextField
      className={textStyle}
      type={props.type}
      value={props.value}
      id={props.id}
      label={props.label}
      required={props.required}
      fullWidth={props.fullWidth}
      onChange={props.onChange}
    />
  );
};
export default TextInput;
