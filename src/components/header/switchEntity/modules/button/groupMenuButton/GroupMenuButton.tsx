import React from 'react';
import { Group } from '../../../../../../reducks/groups/types';
import Menu from '@material-ui/core/Menu';
import EditGroupMembersContainer from '../../../../../../containers/header/switchEntity/modules/modal/EditGroupMembersContainer';
import EditIcon from '@material-ui/icons/Edit';
import styles from './GroupMenuButton.module.scss';
import EditGroupNameModalContainer from '../../../../../../containers/header/switchEntity/modules/modal/EditGroupNameModalContainer';
import UnsubscribeGroupModalContainer from '../../../../../../containers/header/switchEntity/modules/modal/UnsubscribeGroupModalContainer';

interface GroupMenuButtonProps {
  openMenu: SVGElement | null;
  approvedGroup: Group;
  handleOpenGroupMenu: (event: React.MouseEvent<SVGElement>) => void;
  handleCloseGroupMenu: () => void;
}

const GroupMenuButton = (props: GroupMenuButtonProps) => {
  return (
    <>
      <EditIcon
        className={styles.editIcon}
        onClick={props.handleOpenGroupMenu}
        fontSize={'small'}
      />
      <Menu
        id="simple-menu"
        anchorEl={props.openMenu}
        keepMounted
        open={Boolean(props.openMenu)}
        onClose={props.handleCloseGroupMenu}
      >
        <EditGroupNameModalContainer
          approvedGroup={props.approvedGroup}
          handleCloseGroupMenu={props.handleCloseGroupMenu}
        />
        <EditGroupMembersContainer
          modalTitleLabel={'メンバーの編集'}
          approvedGroup={props.approvedGroup}
        />
        <UnsubscribeGroupModalContainer approvedGroup={props.approvedGroup} />
      </Menu>
    </>
  );
};

export default GroupMenuButton;
