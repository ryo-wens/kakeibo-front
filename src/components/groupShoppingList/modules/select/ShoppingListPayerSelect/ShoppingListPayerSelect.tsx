import React from 'react';
import { Groups } from '../../../../../reducks/groups/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
      width: 'calc(83% - 16px)',
      marginTop: 0,
      marginBottom: 16,
    },
  })
);

interface ShoppingListPayerSelectProps {
  value: string;
  approvedGroups: Groups;
  groupId: number;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const ShoppingListPayerSelect = (props: ShoppingListPayerSelectProps) => {
  const classes = useStyles();

  const group = props.approvedGroups.filter((group) => group.group_id === props.groupId);

  return (
    <FormControl className={classes.formControl}>
      <Select id="paymentUserId" value={props.value} onChange={props.onChange} displayEmpty>
        <MenuItem value="">選択なし</MenuItem>
        {group[0].approved_users_list.map((user) => {
          return (
            <MenuItem key={user.user_id} value={user.user_id}>
              {user.user_name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
export default ShoppingListPayerSelect;
