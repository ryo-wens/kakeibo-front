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
      minWidth: 225,
      width: 'calc(83% - 16px)',
      marginTop: 0,
      marginBottom: 16,
    },
  })
);

interface SelectLimitProps {
  value: string;
  selectLimit: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectLimit = (props: SelectLimitProps) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="limit">取得件数</InputLabel>
      <Select id="limit" value={props.value} onChange={props.selectLimit}>
        <MenuItem value={'10'}>10件</MenuItem>
        <MenuItem value={'30'}>30件</MenuItem>
        <MenuItem value={'50'}>50件</MenuItem>
        <MenuItem value={'100'}>100件</MenuItem>
      </Select>
    </FormControl>
  );
};
export default SelectLimit;
