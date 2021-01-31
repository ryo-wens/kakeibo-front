import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import axios from 'axios';
import { fetchGroups } from '../../../reducks/groups/operations';
import { Groups } from '../../../reducks/groups/types';
import SwitchEntity from '../../../components/header/group/switchEntity/SwitchEntity';

interface SwitchEntityContainerProps {
  approvedGroups: Groups;
  entityType: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const SwitchEntityContainer = (props: SwitchEntityContainerProps) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const switchToIndividual = (userName: string) => {
    setAnchorEl(null);
    props.setName(userName);
    dispatch(push('/home'));
  };

  const switchToGroup = (groupId: number, groupName: string) => {
    setAnchorEl(null);
    props.setName(groupName);
    dispatch(push(`/group/${groupId}/home`));
  };

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    const signal = axios.CancelToken.source();

    if (!props.approvedGroups.length) {
      dispatch(fetchGroups(signal));
    }
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <SwitchEntity
      approvedGroups={props.approvedGroups}
      entityType={props.entityType}
      anchorEl={anchorEl}
      name={props.name}
      openMenu={openMenu}
      closeMenu={closeMenu}
      switchToGroup={switchToGroup}
      switchToIndividual={switchToIndividual}
    />
  );
};
export default SwitchEntityContainer;
