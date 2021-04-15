import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import GroupMenuButtonContainer from '../../../../../../containers/header/switchEntity/modules/button/GrouopMenuButtonContainer';
import { Group } from '../../../../../../reducks/groups/types';
import styles from './GroupListItem.module.scss';
import cn from 'classnames';

interface GroupListItemProps {
  groupId: number;
  approvedGroup: Group;
  switchToGroup: (groupId: number, groupName: string) => void;
  closeMenu: () => void;
}

const GroupListItem = (props: GroupListItemProps) => {
  const { groupId, approvedGroup, switchToGroup, closeMenu } = props;

  const checkIconClassName = cn(styles.checkIcon, {
    [styles.transparencyIcon]: groupId !== approvedGroup.group_id,
  });

  return (
    <li className={styles.listItem}>
      <CheckIcon className={checkIconClassName} fontSize="inherit" />
      <span
        className={styles.name}
        onClick={() => switchToGroup(approvedGroup.group_id, approvedGroup.group_name)}
      >
        {approvedGroup.group_name}
      </span>
      <GroupMenuButtonContainer approvedGroup={approvedGroup} closeMenu={closeMenu} />
    </li>
  );
};

export default GroupListItem;
