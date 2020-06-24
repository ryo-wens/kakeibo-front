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
    },
  })
);

type CategoryProps = {
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
};

const CategoryInput = (props: CategoryProps) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="category">カテゴリー</InputLabel>
      <Select value={props.value} onChange={props.onChange}>
        <MenuItem value=""></MenuItem>
        <MenuItem value={'食費'}>食費</MenuItem>
        <MenuItem value={'日用雑貨品'}>日用雑貨品</MenuItem>
        <MenuItem value={'交通費'}>交通費</MenuItem>
        <MenuItem value={'医療費'}>医療費</MenuItem>
        <MenuItem value={'水道、光熱費'}>水道、光熱費</MenuItem>
        <MenuItem value={'家賃、住宅ローン'}>家賃、住宅ローン</MenuItem>
        <MenuItem value={'その他'}>その他</MenuItem>
      </Select>
    </FormControl>
  );
};
export default CategoryInput;
