import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { CreateGroups } from '../todo';
import { Button, Divider, Menu } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { State } from '../../reducks/store/types';
import { Groups } from '../../reducks/groups/types';
import { getApprovedGroups } from '../../reducks/groups/selectors';

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
  })
);

interface SwitchEntityProps {
  entityType: string;
  groupId: number;
  name: string;
  openMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
  switchToIndividual: () => void;
  switchToGroup: (value: number, name: string) => void;
  closeMenu: () => void;
  anchorEl: null | HTMLElement;
}

const SwitchEntity = (props: SwitchEntityProps) => {
  const classes = useStyles();
  const selector = useSelector((state: State) => state);
  const approvedGroups: Groups = getApprovedGroups(selector);

  return (
    <div>
      <Button className={classes.button} onClick={props.openMenu}>
        {props.name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.closeMenu}
      >
        <MenuItem value={'UserName'} onClick={props.switchToIndividual}>
          UserName
        </MenuItem>
        <Divider />
        <span className={classes.group}>グループ</span>
        {approvedGroups.map((approvedGroup) => {
          return (
            <MenuItem
              button={true}
              key={approvedGroup.group_id}
              value={approvedGroup.group_name}
              onClick={() => props.switchToGroup(approvedGroup.group_id, approvedGroup.group_name)}
            >
              {approvedGroup.group_name}
            </MenuItem>
          );
        })}

        <CreateGroups
          modalTitleLabel={'グループ作成'}
          modalTextFieldLabel={'グループ名'}
          closeMenu={props.closeMenu}
        />
      </Menu>
    </div>
  );
};

export default SwitchEntity;
