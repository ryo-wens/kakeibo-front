import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import { TodoButton } from './index';
import { Group } from '../../reducks/groups/types';

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
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <p>{props.approvedGroup.group_name}を退会しますか？</p>
      <div className={classes.buttons}>
        <TodoButton label={'退会'} disabled={false} onClick={() => handleClose()} />
        <TodoButton label={'キャンセル'} disabled={false} onClick={() => handleClose()} />
      </div>
    </div>
  );

  return (
    <>
      <MenuItem onClick={() => handleOpen()}>グループを退会</MenuItem>
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

