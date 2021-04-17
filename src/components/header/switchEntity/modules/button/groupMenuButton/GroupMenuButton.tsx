import React from 'react';
import { Group } from '../../../../../../reducks/groups/types';
import Menu from '@material-ui/core/Menu';
import { GenericModal } from '../../../../../uikit';
import EditGroupNameContainer from '../../../../../../containers/header/switchEntity/modules/modal/EditGroupNameModalContainer';
import EditGroupMembersContainer from '../../../../../../containers/header/switchEntity/modules/modal/EditGroupMembersContainer';
import EditIcon from '@material-ui/icons/Edit';
import styles from './GroupMenuButton.module.scss';

interface GroupMenuButtonProps {
  approvedGroup: Group;
  anchorEl: SVGElement | null;
  closeMenu: () => void;
  closeGroupMenu: () => void;
  onClickGroupWithdrawal: () => void;
  openGroupMenu: (event: React.MouseEvent<SVGElement>) => void;
}

const GroupMenuButton = (props: GroupMenuButtonProps) => {
  return (
    <>
      <EditIcon className={styles.editIcon} onClick={props.openGroupMenu} fontSize={'small'} />
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
