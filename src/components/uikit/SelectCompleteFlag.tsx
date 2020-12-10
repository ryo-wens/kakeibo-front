import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      width: 'calc(80% - 16px)',
      marginTop: 0,
      marginBottom: 16,
    },
  })
);

interface SelectCompleteFlagProps {
  value: string | boolean;
  selectCompleteFlagChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectCompleteFlag = (props: SelectCompleteFlagProps) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="completeFlag">実施の有無</InputLabel>
      <Select id="completeFlag" value={props.value} onChange={props.selectCompleteFlagChange}>
        <MenuItem value={'all'}>すべて</MenuItem>
        <MenuItem value={'true'}>実施済</MenuItem>
        <MenuItem value={'false'}>未実施</MenuItem>
      </Select>
    </FormControl>
  );
};
export default SelectCompleteFlag;
