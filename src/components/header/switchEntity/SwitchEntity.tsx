import React from 'react';
import { Menu } from '@material-ui/core';
import { Groups } from '../../../reducks/groups/types';
import GroupIcon from '@material-ui/icons/Group';
import CheckIcon from '@material-ui/icons/Check';
import styles from './SwitchEntity.module.scss';
import cn from 'classnames';
import GroupListItemContainer from '../../../containers/header/switchEntity/modules/listItem/GroupListItemContainer';
import AddGroupModalContainer from '../../../containers/header/switchEntity/modules/modal/AddGroupModalContainer';

interface SwitchEntityProps {
  approvedGroups: Groups;
  anchorEl: HTMLElement | null;
  name: string;
  openMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
  closeMenu: () => void;
  switchToIndividual: (userName: string) => void;
  switchToGroup: (groupId: number, groupName: string) => void;
}

const SwitchEntity = (props: SwitchEntityProps) => {
  const existsApprovedGroups = props.approvedGroups.length !== 0;

  const checkIconClassName = cn(styles.checkIcon, {
    [styles.transparencyIcon]: props.name !== 'グループ選択なし',
  });

  return (
    <div>
      <GroupIcon className={styles.groupIcon} />
      <button className={styles.button} onClick={props.openMenu}>
        {props.name}
      </button>
      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.closeMenu}
        style={{ top: '45px' }}
      >
        <span className={styles.group}>グループ</span>
        <ul className={styles.groupList}>
          {existsApprovedGroups &&
            props.approvedGroups.map((approvedGroup) => {
              return (
                <GroupListItemContainer
                  approvedGroup={approvedGroup}
                  switchToGroup={props.switchToGroup}
                  closeMenu={props.closeMenu}
                  key={approvedGroup.group_id}
                />
              );
            })}
          <li className={styles.listItem}>
            <CheckIcon className={checkIconClassName} fontSize="inherit" />
            <span onClick={() => props.switchToIndividual('グループ選択なし')}>
              グループ選択なし
            </span>
          </li>
        </ul>
        <AddGroupModalContainer />
      </Menu>
    </div>
  );
};

export default SwitchEntity;
