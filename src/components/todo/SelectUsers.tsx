import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Checkbox, ListItemText } from '@material-ui/core';
import { ApprovedGroupUsers, Groups } from '../../reducks/groups/types';
import { useParams } from 'react-router';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      margin: 0,
      minWidth: 120,
      maxWidth: 400,
    },
  })
);

interface SelectUsersProps {
  approvedGroups: Groups;
  setUsersIds: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const SelectUsers = (props: SelectUsersProps) => {
  const classes = useStyles();
  const { id } = useParams();
  const [userNames, setUserNames] = React.useState<string[]>([]);

  const getApprovedUsers = (approvedGroups: Groups) => {
    let users: ApprovedGroupUsers = [];
    const idx = approvedGroups.findIndex((group) => group.group_id === Number(id));
    const approvedGroup = approvedGroups[idx];
    if (approvedGroup.group_id === Number(id)) {
      users = approvedGroup.approved_users_list;
    }
    return users;
  };

  const approvedUsers = getApprovedUsers(props.approvedGroups);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserNames(event.target.value as string[]);
    setCheckedUsersId(event.target.value as string[]);
  };

  const setCheckedUsersId = (checkedName: string[]) => {
    const arrayUsersName = [];
    for (const name of checkedName) {
      const idx = approvedUsers.findIndex((user) => user.user_name === name);
      arrayUsersName.push(approvedUsers[idx].user_id);
    }
    props.setUsersIds(arrayUsersName);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>ユーザー</InputLabel>
        <Select
          id="demo-mutiple-checkbox"
          multiple
          value={userNames}
          onChange={handleChange}
          renderValue={(selected) => (selected as string[]).join(' , ')}
        >
          {approvedUsers.map((user) => (
            <MenuItem key={user.user_id} value={user.user_name}>
              <Checkbox checked={userNames.includes(user.user_name)} color={'primary'} />
              <ListItemText primary={user.user_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
export default SelectUsers;
