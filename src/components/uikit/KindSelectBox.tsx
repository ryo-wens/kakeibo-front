import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 225,
      width: 'calc(83% - 16px)',
      marginTop: 0,
      marginBottom: 16,
    },
  })
);

interface KindProps {
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  required: boolean;
  label: string;
  disabled: boolean;
}

const KindSelectBox = (props: KindProps) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="kind" required={props.required}>
        {props.label}
      </InputLabel>
      <Select id="kind" value={props.value} onChange={props.onChange} disabled={props.disabled}>
        <MenuItem value={'income'}>収入</MenuItem>
        <MenuItem value={'expense'}>支出</MenuItem>
      </Select>
    </FormControl>
  );
};
export default KindSelectBox;
