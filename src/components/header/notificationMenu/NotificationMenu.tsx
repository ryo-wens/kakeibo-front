import React from 'react';
import { Badge, Menu } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { ModalInform } from '../../uikit';
import { Groups } from '../../../reducks/groups/types';
import styles from './NotificationMenu.module.scss';
import JoinInvitationGroupModalContainer from '../../../containers/header/notificationMenu/joinInvitationGroupModal/JoinInvitationGroupModalContainer';

interface NotificationMenuProps {
  unapprovedGroups: Groups;
  anchorEl: null | SVGElement;
  modalMessage: string;
  handleOpenMenu: (event: React.MouseEvent<SVGElement>) => void;
  handleCloseMenu: () => void;
}

const NotificationMenu = (props: NotificationMenuProps) => {
  const { unapprovedGroups, anchorEl, modalMessage, handleOpenMenu, handleCloseMenu } = props;

  const existUnapprovedGroups = unapprovedGroups.length > 0;

  return (
    <>
      <Badge badgeContent={unapprovedGroups.length} color="secondary">
        <NotificationsIcon className={styles.icon} onClick={handleOpenMenu} />
      </Badge>
      <ModalInform message={modalMessage} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        style={{ top: '40px', left: '-110px' }}
        PaperProps={{
          style: {
            width: 250,
          },
        }}
        MenuListProps={{ disablePadding: true }}
      >
        <li className={styles.notification}>通知</li>
        {existUnapprovedGroups &&
          unapprovedGroups.map((unapprovedGroup) => {
            return (
              <JoinInvitationGroupModalContainer
                key={unapprovedGroup.group_id}
                unapprovedGroup={unapprovedGroup}
              />
            );
          })}
        {!existUnapprovedGroups && (
          <li>
            <p className={styles.message}>通知はありません</p>
          </li>
        )}
      </Menu>
    </>
  );
};

export default NotificationMenu;
