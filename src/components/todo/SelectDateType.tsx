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
    },
  })
);

interface SelectDateTypeProps {
  id: string;
  label: string;
  value: string;
  selectChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectDateType = (props: SelectDateTypeProps) => {
  const classes = useStyles();

  const dateTypes = [
    { key: '実施日', value: 'implementation_date' },
    { key: '締切日', value: 'due_date' },
  ];

  const sortItems = [
    { key: '実施日', value: 'implementation_date' },
    { key: '締切日', value: 'due_date' },
    { key: '投稿日', value: 'posted_date' },
    { key: '更新日', value: 'updated_date' },
    { key: 'Todo名', value: 'todo_content' },
  ];

  const selectItems = (items: { key: string; value: string }[]) => {
    return items.map((item) => (
      <MenuItem value={item.value} key={item.key}>
        {item.key}
      </MenuItem>
    ));
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={props.id}>{props.label}</InputLabel>
      <Select id={props.id} value={props.value} onChange={props.selectChange}>
        {props.id === 'dateType' ? selectItems(dateTypes) : selectItems(sortItems)}
      </Select>
    </FormControl>
  );
};
export default SelectDateType;
