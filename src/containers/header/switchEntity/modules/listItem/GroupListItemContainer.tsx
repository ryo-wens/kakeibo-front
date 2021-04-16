import React from 'react';
import { Group } from '../../../../../reducks/groups/types';
import { useParams } from 'react-router';
import GroupListItem from '../../../../../components/header/switchEntity/modules/listItem/groupListItem/GroupListItem';

interface GroupListItemProps {
  approvedGroup: Group;
  switchToGroup: (groupId: number, groupName: string) => void;
  closeMenu: () => void;
}

const GroupListItemContainer = (props: GroupListItemProps) => {
  const { group_id } = useParams<{ group_id: string }>();
  const { approvedGroup, switchToGroup, closeMenu } = props;

  return (
    <GroupListItem
      groupId={Number(group_id)}
      approvedGroup={approvedGroup}
      switchToGroup={switchToGroup}
      closeMenu={closeMenu}
    />
  );
};

export default GroupListItemContainer;
