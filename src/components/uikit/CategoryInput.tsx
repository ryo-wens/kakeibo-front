import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bigcategory: {
      padding: 8,
    },
    formControl: {
      marginTop: 0,
      marginBottom: 16,
      margin: theme.spacing(1),
      minWidth: 225,
    },
  })
);

const ITEM_HEIGHT = 55;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      width: 225,
    },
  },
};

interface CategoryProps {
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  required: boolean;
}

const CategoryInput = (props: CategoryProps) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="category" required={props.required}>
        カテゴリー
      </InputLabel>
      <Select
        MenuProps={MenuProps}
        value={props.value}
        onChange={props.onChange}
      >
        <MenuItem className={classes.bigcategory} value={'食費'}>
          食費
        </MenuItem>
        <Divider />
        <MenuItem value={'日用品'}>日用品</MenuItem>
        <MenuItem value={'趣味・娯楽'}>趣味・娯楽</MenuItem>
        <MenuItem value={'交際費'}>交際費</MenuItem>
        <MenuItem value={'交通費'}>交通費</MenuItem>
        <MenuItem value={'衣服・美容'}>衣服・美容</MenuItem>
        <MenuItem value={'健康・医療'}>健康・医療</MenuItem>
        <MenuItem value={'通信費'}>通信費</MenuItem>
        <MenuItem value={'住宅'}>住宅</MenuItem>
        <MenuItem value={'水道・光熱費'}>水道・光熱費</MenuItem>
        <MenuItem value={'自動車'}>自動車</MenuItem>
        <MenuItem value={'保険'}>保険</MenuItem>
        <MenuItem value={'税金・社会保険'}>税金・社会保険</MenuItem>
        <MenuItem value={'現金・カード'}>現金・カード</MenuItem>
        <MenuItem value={'その他'}>その他</MenuItem>
      </Select>
    </FormControl>
  );
};
export default CategoryInput;
