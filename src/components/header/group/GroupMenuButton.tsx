import React from 'react';
import { Group } from '../../../reducks/groups/types';
import Menu from '@material-ui/core/Menu';
import { IconButton } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { GenericModal } from '../../uikit';
import EditGroupNameContainer from '../../../containers/header/group/EditGroupNameContainer';
import EditGroupMembersContainer from '../../../containers/header/group/EditGroupMembersContainer';

interface MenuButtonProps {
  approvedGroup: Group;
  anchorEl: HTMLElement | null;
  closeMenu: () => void;
  closeGroupMenu: () => void;
  onClickGroupWithdrawal: () => void;
  openGroupMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GroupMenuButton = (props: MenuButtonProps) => {
  return (
    <>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={props.openGroupMenu}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.closeGroupMenu}
      >
        <EditGroupNameContainer
          approvedGroup={props.approvedGroup}
          closeGroupMenu={props.closeGroupMenu}
          modalTitleLabel={'グループ名を編集'}
          modalTextFieldLabel={'グループ名'}
        />
        <EditGroupMembersContainer
          modalTitleLabel={'メンバーの編集'}
          approvedGroup={props.approvedGroup}
        />
        <GenericModal
          buttonLabel={'退会'}
          menuLabel={'グループを退会'}
          modalText={`${props.approvedGroup.group_name}を退会しますか？`}
          onClickGroupWithdrawal={props.onClickGroupWithdrawal}
        />
      </Menu>
    </>
  );
};

export default GroupMenuButton;
