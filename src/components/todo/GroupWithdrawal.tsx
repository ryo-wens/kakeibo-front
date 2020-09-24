import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import { TodoButton } from './index';
import { Group } from '../../reducks/groups/types';
import { useDispatch, useSelector } from 'react-redux';
import { groupWithdrawal } from '../../reducks/groups/operations';
import { ModalInform } from '../uikit';
import { getModalMessage } from '../../reducks/modal/selectors';
import { State } from '../../reducks/store/types';
import { getApprovedGroups } from '../../reducks/groups/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      display: 'flex',
    },
    paper: {
      width: 400,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface GroupWithdrawalProps {
  approvedGroup: Group;
}

const GroupWithdrawal = (props: GroupWithdrawalProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const [open, setOpen] = useState<boolean>(false);
  const modalMessage = getModalMessage(selector);
  const approvedGroups = getApprovedGroups(selector);

  const groupId = props.approvedGroup.group_id;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const approvedGroupIds = approvedGroups.map((approvedGroup) => {
    return approvedGroup.group_id;
  });

  const nextGroupIds: number[] = approvedGroupIds.filter((approvedGroupId) => {
    return approvedGroupId !== groupId;
  });
  const nextGroupId = nextGroupIds[0];

  const body = (
    <div className={classes.paper}>
      <p>{props.approvedGroup.group_name}を退会しますか？</p>
      <div className={classes.buttons}>
        <TodoButton
          label={'退会'}
          disabled={false}
          onClick={() => {
            dispatch(groupWithdrawal(groupId, nextGroupId)) && handleClose();
          }}
        />
        <TodoButton label={'キャンセル'} disabled={false} onClick={() => handleClose()} />
      </div>
    </div>
  );

  return (
    <>
      <MenuItem onClick={() => handleOpen()}>グループを退会</MenuItem>
      <ModalInform message={modalMessage} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default GroupWithdrawal;
