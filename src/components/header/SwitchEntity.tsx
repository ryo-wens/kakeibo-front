import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CreateGroups, GroupMenuButton } from '../todo';
import { Button, Divider, ListItem, Menu } from '@material-ui/core';
import { Groups } from '../../reducks/groups/types';
import { push } from 'connected-react-router';
import { fetchGroups } from '../../reducks/groups/operations';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    select: {
      color: '#eee',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button: {
      width: 'auto',
      height: '30px',
      padding: '5px 25px 5px 25px',
      color: '#666',
      backgroundColor: '#fff',
    },
    group: {
      display: 'inline-block',
      width: '100%',
      padding: '10px 0px 10px 0px',
      textAlign: 'center',
      color: '#666',
      fontSize: '12px',
    },
    groupListItem: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  })
);

interface SwitchEntityProps {
  approvedGroups: Groups;
  userName: string;
  entityType: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const SwitchEntity = (props: SwitchEntityProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const switchToIndividual = (userName: string) => {
    setAnchorEl(null);
    props.setName(userName);
    dispatch(push('/'));
  };

  const switchToGroup = (groupId: number, groupName: string) => {
    setAnchorEl(null);
    props.setName(groupName);
    dispatch(push(`/group/${groupId}`));
  };

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (!props.approvedGroups.length) {
      dispatch(fetchGroups());
    }
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button className={classes.button} onClick={openMenu}>
        {props.name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <ListItem value={'UserName'} onClick={() => switchToIndividual(props.userName)}>
          {props.userName}
        </ListItem>
        <Divider />
        <span className={classes.group}>グループ</span>
        {props.approvedGroups.map((approvedGroup) => {
          return (
            <div key={approvedGroup.group_id} className={classes.groupListItem}>
              <ListItem
                button={true}
                key={approvedGroup.group_id}
                onClick={() => switchToGroup(approvedGroup.group_id, approvedGroup.group_name)}
              >
                {approvedGroup.group_name}
              </ListItem>
              <GroupMenuButton approvedGroup={approvedGroup} closeMenu={closeMenu} />
            </div>
          );
        })}

        <CreateGroups
          modalTitleLabel={'グループ作成'}
          modalTextFieldLabel={'グループ名'}
          closeMenu={closeMenu}
        />
      </Menu>
    </div>
  );
};

export default SwitchEntity;
