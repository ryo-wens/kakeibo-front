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

interface SelectDateTypeProps {
  id: string;
  label: string;
  value: string | boolean;
  selectDateTypeChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectSortTypeChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectDateType = (props: SelectDateTypeProps) => {
  const classes = useStyles();

  const selectChange = () => {
    if (props.id === 'dateType') {
      return props.selectDateTypeChange;
    } else if (props.id === 'sortItem') {
      return props.selectSortTypeChange;
    }
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={props.id}>{props.label}</InputLabel>
      <Select id={props.id} value={props.value} onChange={selectChange()}>
        <MenuItem value={'implementation_date'}>実施日</MenuItem>
        <MenuItem value={'due_date'}>締切日</MenuItem>
        <MenuItem value={'posted_date'}>投稿日</MenuItem>
        <MenuItem value={'updated_date'}>更新日</MenuItem>
        {props.id === 'sortItem' && <MenuItem value={'todo_content'}>Todo名</MenuItem>}
      </Select>
    </FormControl>
  );
};
export default SelectDateType;
