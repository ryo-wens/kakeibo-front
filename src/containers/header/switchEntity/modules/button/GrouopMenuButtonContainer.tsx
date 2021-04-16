import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Group } from '../../../../../reducks/groups/types';
import { groupWithdrawal } from '../../../../../reducks/groups/operations';
import { getPathGroupId } from '../../../../../lib/path';
import GroupMenuButton from '../../../../../components/header/switchEntity/modules/button/groupMenuButton/GroupMenuButton';

interface GroupMenuButtonContainerProps {
  approvedGroup: Group;
  closeMenu: () => void;
}

const GroupMenuButtonContainer = (props: GroupMenuButtonContainerProps) => {
  const dispatch = useDispatch();
  const pathGroupId = getPathGroupId(window.location.pathname);
  const groupId = props.approvedGroup.group_id;
  const [anchorEl, setAnchorEl] = useState<null | SVGElement>(null);

  const openGroupMenu = (event: React.MouseEvent<SVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeGroupMenu = () => {
    setAnchorEl(null);
  };

  const onClickGroupWithdrawal = () => {
    setAnchorEl(null);
    props.closeMenu();
    dispatch(groupWithdrawal(groupId));
    if (pathGroupId === groupId) {
      dispatch(push('/'));
    }
  };

  return (
    <GroupMenuButton
      anchorEl={anchorEl}
      closeMenu={props.closeMenu}
      approvedGroup={props.approvedGroup}
      openGroupMenu={openGroupMenu}
      closeGroupMenu={closeGroupMenu}
      onClickGroupWithdrawal={onClickGroupWithdrawal}
    />
  );
};
export default GroupMenuButtonContainer;
