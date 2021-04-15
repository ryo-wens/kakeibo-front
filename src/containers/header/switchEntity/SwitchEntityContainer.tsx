import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import axios from 'axios';
import { fetchGroups } from '../../../reducks/groups/operations';
import { Groups } from '../../../reducks/groups/types';
import SwitchEntity from '../../../components/header/switchEntity/SwitchEntity';
import { useLocation, useParams } from 'react-router';

interface SwitchEntityContainerProps {
  approvedGroups: Groups;
}

const SwitchEntityContainer = (props: SwitchEntityContainerProps) => {
  const { approvedGroups } = props;

  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const pathName = useLocation().pathname.split('/')[1];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    let unmount = false;

    if (pathName !== 'group' && !unmount) {
      setName('グループ選択なし');
    }

    return () => {
      unmount = true;
    };
  }, [pathName]);

  useEffect(() => {
    let unmount = false;
    const signal = axios.CancelToken.source();
    const setGroupName = async () => {
      if (pathName === 'group' && !unmount) {
        if (name === '') {
          await dispatch(fetchGroups(signal));
        }

        let groupName = '';
        for (const group of approvedGroups) {
          if (group.group_id === Number(group_id)) {
            groupName = group.group_name;
          }
        }

        setName(groupName);
      }
    };
    setGroupName();

    return () => {
      unmount = true;
      signal.cancel();
    };
  }, [approvedGroups, pathName, group_id]);

  const switchToIndividual = (userName: string) => {
    setAnchorEl(null);
    setName(userName);
    dispatch(push('/home'));
  };

  const switchToGroup = (groupId: number, groupName: string) => {
    setAnchorEl(null);
    setName(groupName);
    dispatch(push(`/group/${groupId}/home`));
  };

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <SwitchEntity
      approvedGroups={approvedGroups}
      anchorEl={anchorEl}
      name={name}
      openMenu={openMenu}
      closeMenu={closeMenu}
      switchToGroup={switchToGroup}
      switchToIndividual={switchToIndividual}
    />
  );
};
export default SwitchEntityContainer;
