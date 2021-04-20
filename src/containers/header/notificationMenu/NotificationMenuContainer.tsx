import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUnapprovedGroups } from '../../../reducks/groups/selectors';
import { State } from '../../../reducks/store/types';
import { getModalMessage } from '../../../reducks/modal/selectors';
import { Groups } from '../../../reducks/groups/types';
import NotificationMenu from '../../../components/header/notificationMenu/NotificationMenu';

const NotificationMenuContainer = () => {
  const [anchorEl, setAnchorEl] = useState<null | SVGElement>(null);

  const selector = useSelector((state: State) => state);
  const unapprovedGroups: Groups = getUnapprovedGroups(selector);
  const modalMessage = getModalMessage(selector);

  const handleOpenMenu = (event: React.MouseEvent<SVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <NotificationMenu
      unapprovedGroups={unapprovedGroups}
      anchorEl={anchorEl}
      modalMessage={modalMessage}
      handleOpenMenu={handleOpenMenu}
      handleCloseMenu={handleCloseMenu}
    />
  );
};

export default NotificationMenuContainer;
