import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 100,
    },
  })
);

interface CycleTypeSelectorProps {
  value: 'daily' | 'weekly' | 'monthly' | 'custom';
  selectChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const CycleTypeSelector = (props: CycleTypeSelectorProps) => {
  const classes = useStyles();

  const cycleTypes = [
    { key: '毎日', value: 'daily' },
    { key: '毎週', value: 'weekly' },
    { key: '毎月', value: 'monthly' },
    { key: 'カスタム', value: 'custom' },
  ];

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="shoppingListCycleType">必須</InputLabel>
      <Select id="shoppingListCycleType" value={props.value} onChange={props.selectChange}>
        {cycleTypes.map((item) => (
          <MenuItem value={item.value} key={item.key}>
            {item.key}
          </MenuItem>
        ))}
        ;
      </Select>
    </FormControl>
  );
};
export default CycleTypeSelector;
