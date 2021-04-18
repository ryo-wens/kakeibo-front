import React, { useState } from 'react';
import { Group } from '../../../../../reducks/groups/types';
import GroupMenuButton from '../../../../../components/header/switchEntity/modules/button/groupMenuButton/GroupMenuButton';

interface GroupMenuButtonContainerProps {
  approvedGroup: Group;
  closeMenu: () => void;
}

const GroupMenuButtonContainer = (props: GroupMenuButtonContainerProps) => {
  const [openMenu, setOpenMenu] = useState<null | SVGElement>(null);

  const handleOpenGroupMenu = (event: React.MouseEvent<SVGElement>) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseGroupMenu = () => {
    setOpenMenu(null);
  };

  return (
    <GroupMenuButton
      openMenu={openMenu}
      approvedGroup={props.approvedGroup}
      handleOpenGroupMenu={handleOpenGroupMenu}
      handleCloseGroupMenu={handleCloseGroupMenu}
    />
  );
};
export default GroupMenuButtonContainer;
