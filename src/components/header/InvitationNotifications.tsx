import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TodoButton } from '../todo';
import { Badge } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import { getUnapprovedGroups } from '../../reducks/groups/selectors';
import { State } from '../../reducks/store/types';
import { inviteGroupParticipate, inviteGroupReject } from '../../reducks/groups/operations';
import { getModalMessage } from '../../reducks/modal/selectors';
import { ModalInform } from '../uikit';
import { Groups } from '../../reducks/groups/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      display: 'flex',
      justifyContent: 'center',
    },
    paper: {
      width: 400,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    invitationList: {
      padding: 10,
      border: 'solid 1px #666',
      borderRadius: 20,
    },
    groupName: {
      margin: '5px 0px',
    },
    notificationsIcon: {
      padding: 0,
      marginRight: 20,
      margin: '0 25px',
      [theme.breakpoints.down('xs')]: {
        marginRight: 10,
      },
    },
  })
);

const InvitationNotifications = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const selector = useSelector((state: State) => state);
  const unapprovedGroups: Groups = getUnapprovedGroups(selector);
  const modalMessage = getModalMessage(selector);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <h3 id="simple-modal-title">通知</h3>
      {unapprovedGroups.length > 0 ? (
        <p>グループから招待されています。</p>
      ) : (
        <p>通知はありません。</p>
      )}
      {unapprovedGroups.length > 0 &&
        unapprovedGroups.map((unapprovedGroup) => {
          const groupId: number = unapprovedGroup.group_id;
          return (
            <div className={classes.invitationList} key={groupId}>
              <ListItemText secondary={'グループ名'} />
              <p className={classes.groupName}>{unapprovedGroup.group_name}</p>
              <div className={classes.buttons}>
                <TodoButton
                  label={'参加'}
                  disabled={false}
                  onClick={() => dispatch(inviteGroupParticipate(groupId)) && handleClose()}
                />
                <TodoButton
                  label={'拒否'}
                  disabled={false}
                  onClick={() => dispatch(inviteGroupReject(groupId)) && handleClose()}
                />
              </div>
            </div>
          );
        })}
    </div>
  );

  return (
    <>
      <IconButton
        className={classes.notificationsIcon}
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={() => handleOpen()}
      >
        <Badge badgeContent={unapprovedGroups.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
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

export default InvitationNotifications;
