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
}

const GroupMenuButton = (props: MenuButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <EditGroupName
          modalTitleLabel={'グループ名を編集'}
          modalTextFieldLabel={'グループ名'}
          approvedGroup={props.approvedGroup}
        />
        <EditGroupMembers modalTitleLabel={'メンバーの編集'} approvedGroup={props.approvedGroup} />
        <GenericModal
          menuLabel={'グループを退会'}
          modalText={`${props.approvedGroup.group_name}を退会しますか？`}
          buttonLabel={'退会'}
        />
        <MenuItem onClick={handleClose}>グループを削除</MenuItem>
      </Menu>
    </>
  );
};

export default GroupMenuButton;
