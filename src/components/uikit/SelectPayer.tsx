import React from 'react';
import { ApprovedGroupUsers, Groups } from '../../reducks/groups/types';
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

interface SelectPayerProps {
  value: string;
  required: boolean;
  approvedGroups: Groups;
  groupId: number;
  pathName: string;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectPayer = (props: SelectPayerProps) => {
  const classes = useStyles();

  const paymentUsers = (): ApprovedGroupUsers => {
    let users!: ApprovedGroupUsers;

    for (const group of props.approvedGroups) {
      if (props.groupId === group.group_id) {
        users = group.approved_users_list;
      }
    }
    return users;
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="paymentUserId" required={props.required}>
        支払人
      </InputLabel>
      <Select
        id="paymentUserId"
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      >
        {paymentUsers() !== undefined
          ? paymentUsers().map((paymentUser) => {
              return (
                <MenuItem key={paymentUser.user_id} value={paymentUser.user_id}>
                  {paymentUser.user_name}
                </MenuItem>
              );
            })
          : null}
      </Select>
    </FormControl>
  );
};
export default SelectPayer;
