import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      width: '100%',
    },
  })
);

interface SelectSortTypeProps {
  value: string;
  selectSortType: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectSortType = (props: SelectSortTypeProps) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="sortType">並び順</InputLabel>
      <Select id="sortType" value={props.value} onChange={props.selectSortType}>
        <MenuItem value={'asc'}>昇順</MenuItem>
        <MenuItem value={'desc'}>降順</MenuItem>
      </Select>
    </FormControl>
  );
};
export default SelectSortType;
