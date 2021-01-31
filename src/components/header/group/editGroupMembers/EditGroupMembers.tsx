import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { List, ListItem } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import { Group } from '../../../../reducks/groups/types';
import ListItemText from '@material-ui/core/ListItemText';
import './edit-group-members.scss';

interface EditGroupMembersProps {
  open: boolean;
  userId: string;
  approvedGroup: Group;
  modalTitleLabel: string;
  handleOpen: () => void;
  handleClose: () => void;
  isBlankUserId: boolean;
  sendInvitation: () => void;
  inputUserId: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditGroupMembers = (props: EditGroupMembersProps) => {
  const body = (
    <div className="edit-group-members">
      <div className="edit-group-members__title">
        <h3 id="simple-modal-title">{props.modalTitleLabel}</h3>
        <IconButton onClick={() => props.handleClose()}>
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
      <Paper component="form" className="edit-group-members__search-area">
        <InputBase
          className="edit-group-members_input"
          value={props.userId}
          onChange={props.inputUserId}
          placeholder="メンバーを検索"
        />
      </Paper>
      <div className="add-group-modal__btn">
        <button
          className="add-group-modal__btn--add"
          disabled={props.isBlankUserId}
          onClick={() => props.sendInvitation()}
        >
          招待を送る
        </button>
        <button className="add-group-modal__btn--cancel" onClick={() => props.handleClose()}>
          キャンセル
        </button>
      </div>
    </div>
  );

  return (
    <>
      <MenuItem onClick={() => props.handleOpen()}>メンバーの編集</MenuItem>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};
export default EditGroupMembers;
