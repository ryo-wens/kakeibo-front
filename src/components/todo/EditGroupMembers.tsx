import React, { useState, useCallback } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { List, ListItem } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import { Group } from '../../reducks/groups/types';
import ListItemText from '@material-ui/core/ListItemText';
import { TodoButton } from './index';
import { useDispatch } from 'react-redux';
import { inviteGroupUsers } from '../../reducks/groups/operations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0px 0px 20px 0px',
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 350,
    },
    buttons: {
      display: 'flex',
    },
    divider: {
      height: 28,
      margin: 4,
    },
    icon: {
      padding: 8,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    paper: {
      width: 400,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    title: {
      height: 50,
      display: 'flex',
      justifyContent: 'space-between',
    },
  })
);

interface EditGroupMembersProps {
  approvedGroup: Group;
  modalTitleLabel: string;
}

const EditGroupMembers = (props: EditGroupMembersProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const groupId = props.approvedGroup.group_id;

  const isBlankUserId = userId === '';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserId('');
  };

  const inputUserId = useCallback(
    (event) => {
      setUserId(event.target.value);
    },
    [setUserId]
  );

  const body = (
    <div className={classes.paper}>
      <div className={classes.title}>
        <h3 id="simple-modal-title">{props.modalTitleLabel}</h3>
        <IconButton onClick={() => handleClose()}>
          <CloseIcon />
        </IconButton>
      </div>
      <p>メンバー</p>
      <List>
        {props.approvedGroup.approved_users_list.map((approvedUser) => {
          return (
            <ListItem key={approvedUser.user_id}>
              <ListItemText primary={approvedUser.user_name} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      {props.approvedGroup.unapproved_users_list.length > 0 && (
        <>
          <p>招待中のメンバー</p>
          <List>
            {props.approvedGroup.unapproved_users_list.map((unapprovedUser) => {
              return (
                <ListItem key={unapprovedUser.user_id}>
                  <ListItemText primary={unapprovedUser.user_name} />
                </ListItem>
              );
            })}
          </List>
          <Divider />
        </>
      )}
      <p>メンバーを招待する</p>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          value={userId}
          onChange={inputUserId}
          placeholder="メンバーを検索"
        />
      </Paper>
      <div className={classes.buttons}>
        <TodoButton
          label={'招待を送る'}
          disabled={isBlankUserId}
          onClick={() => dispatch(inviteGroupUsers(groupId, userId)) && handleClose()}
        />
        <TodoButton label={'キャンセル'} disabled={false} onClick={() => handleClose()} />
      </div>
    </div>
  );

  return (
    <>
      <MenuItem onClick={() => handleOpen()}>メンバーの編集</MenuItem>
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

export default EditGroupMembers;
