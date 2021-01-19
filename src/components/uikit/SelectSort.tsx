import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      width: '100%',
    },
  })
);

interface SelectSortProps {
  value: string;
  selectSortItem: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectSort = (props: SelectSortProps) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="paymentUserId">並び替え項目</InputLabel>
      <Select id="paymentUserId" value={props.value} onChange={props.selectSortItem}>
        <MenuItem value={'transaction_date'}>取引日</MenuItem>
        <MenuItem value={'updated_date'}>編集日</MenuItem>
        <MenuItem value={'amount'}>金額</MenuItem>
        <MenuItem value={'shop'}>店名</MenuItem>
        <MenuItem value={'memo'}>メモ</MenuItem>
      </Select>
    </FormControl>
  );
};
export default SelectSort;
