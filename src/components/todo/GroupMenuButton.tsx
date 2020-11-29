import React from 'react';
import Menu from '@material-ui/core/Menu';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton } from '@material-ui/core';
import { GenericModal } from '../uikit';
import { EditGroupMembers, EditGroupName } from './index';
import { Group } from '../../reducks/groups/types';
import { groupWithdrawal } from '../../reducks/groups/operations';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { getPathGroupId } from '../../lib/path';

interface MenuButtonProps {
  approvedGroup: Group;
  closeMenu: () => void;
}

const GroupMenuButton = (props: MenuButtonProps) => {
  const dispatch = useDispatch();
  const pathGroupId = getPathGroupId(window.location.pathname);
  const groupId = props.approvedGroup.group_id;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const openGroupMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
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
    <>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={openGroupMenu}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeGroupMenu}
      >
        <EditGroupName
          approvedGroup={props.approvedGroup}
          closeGroupMenu={closeGroupMenu}
          modalTitleLabel={'グループ名を編集'}
          modalTextFieldLabel={'グループ名'}
        />
        <EditGroupMembers modalTitleLabel={'メンバーの編集'} approvedGroup={props.approvedGroup} />
        <GenericModal
          buttonLabel={'退会'}
          menuLabel={'グループを退会'}
          modalText={`${props.approvedGroup.group_name}を退会しますか？`}
          onClickGroupWithdrawal={onClickGroupWithdrawal}
        />
      </Menu>
    </>
  );
};

export default GroupMenuButton;
