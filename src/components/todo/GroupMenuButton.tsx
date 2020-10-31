import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton } from '@material-ui/core';
import { GenericModal } from '../uikit';
import { EditGroupMembers, EditGroupName } from './index';
import { Group } from '../../reducks/groups/types';

interface MenuButtonProps {
  approvedGroup: Group;
  closeMenu: () => void;
}

const GroupMenuButton = (props: MenuButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const openGroupMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeGroupMenu = () => {
    setAnchorEl(null);
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
          closeMenu={props.closeMenu}
          menuLabel={'グループを退会'}
          modalText={`${props.approvedGroup.group_name}を退会しますか？`}
        />
        <MenuItem onClick={closeGroupMenu}>グループを削除</MenuItem>
      </Menu>
    </>
  );
};

export default GroupMenuButton;
