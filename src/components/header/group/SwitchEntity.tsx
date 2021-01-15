import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CreateGroups, GroupMenuButton } from './index';
import { Button, ListItem, Menu } from '@material-ui/core';
import { Groups } from '../../../reducks/groups/types';
import { push } from 'connected-react-router';
import { fetchGroups } from '../../../reducks/groups/operations';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import GroupIcon from '@material-ui/icons/Group';
import CheckIcon from '@material-ui/icons/Check';

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
      border: '2px solid',
      backgroundColor: '#fff',
      textTransform: 'none',
    },
    icon: {
      paddingRight: 4,
      verticalAlign: '-10px',
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
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '220px',
    },
    personalItem: {
      cursor: 'pointer',
      width: '180px',
    },
    position: {
      display: 'flex',
    },
    checkIcon: {
      paddingRight: '0px',
      paddingTop: '15px',
    },
    transparencyIcon: {
      paddingRight: '0px',
      paddingTop: '15px',
      opacity: 0,
    },
  })
);

interface SwitchEntityProps {
  approvedGroups: Groups;
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
    dispatch(push('/home'));
  };

  const switchToGroup = (groupId: number, groupName: string) => {
    setAnchorEl(null);
    props.setName(groupName);
    dispatch(push(`/group/${groupId}/home`));
  };

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    const signal = axios.CancelToken.source();

    if (!props.approvedGroups.length) {
      dispatch(fetchGroups(signal));
    }
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <GroupIcon className={classes.icon} />
      <Button className={classes.button} onClick={openMenu}>
        {props.name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        style={{ top: '45px' }}
      >
        <span className={classes.group}>グループ</span>

        <div className={classes.groupListItem}>
          {props.approvedGroups.map((approvedGroup) => {
            return (
              <div key={approvedGroup.group_id} className={classes.position}>
                {props.name === approvedGroup.group_name ? (
                  <CheckIcon className={classes.checkIcon} fontSize="inherit" />
                ) : (
                  <CheckIcon className={classes.transparencyIcon} fontSize="inherit" />
                )}
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
          <div className={classes.position}>
            {props.name === 'グループ選択なし' ? (
              <CheckIcon className={classes.checkIcon} fontSize="inherit" />
            ) : (
              <CheckIcon className={classes.transparencyIcon} fontSize="inherit" />
            )}
            <ListItem
              className={classes.personalItem}
              value={'UserName'}
              onClick={() => switchToIndividual('グループ選択なし')}
            >
              グループ選択なし
            </ListItem>
          </div>
        </div>

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
