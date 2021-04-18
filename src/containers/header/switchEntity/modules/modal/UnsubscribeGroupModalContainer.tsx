import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useLocation } from 'react-router';
import { State } from '../../../../../reducks/store/types';
import { getModalMessage } from '../../../../../reducks/modal/selectors';
import { Group } from '../../../../../reducks/groups/types';
import { fetchGroups, unsubscribeGroup } from '../../../../../reducks/groups/operations';
import UnsubscribeGroupModal from '../../../../../components/header/switchEntity/modules/modal/unsubscribeGroupModal/UnsubscribeGroupModal';

interface UnsubscribeGroupModalContainerProps {
  approvedGroup: Group;
}

const UnsubscribeGroupModalContainer = (props: UnsubscribeGroupModalContainerProps) => {
  const { approvedGroup } = props;

  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const pathName = useLocation().pathname.split('/')[1];

  const [open, setOpen] = useState<boolean>(false);
  const modalMessage = getModalMessage(selector);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleUnsubscribeGroup = async () => {
    try {
      await dispatch(unsubscribeGroup(approvedGroup.group_id));
      await dispatch(fetchGroups());

      if (pathName === 'group') dispatch(push('/home'));
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
  };

  return (
    <UnsubscribeGroupModal
      open={open}
      approvedGroup={approvedGroup}
      modalMessage={modalMessage}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      handleUnsubscribeGroup={handleUnsubscribeGroup}
    />
  );
};

export default UnsubscribeGroupModalContainer;
