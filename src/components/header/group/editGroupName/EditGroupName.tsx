import React from 'react';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import { Group } from '../../../../reducks/groups/types';
import { TextInput } from '../../../uikit';
import './edit-group-name.scss';

interface EditGroupNameProps {
  approvedGroup: Group;
  groupName: string;
  open: boolean;
  modalTitleLabel: string;
  modalTextFieldLabel: string;
  initialGroupName: string;
  isBlankGroupName: boolean;
  closeGroupMenu: () => void;
  openModal: (initialGroupName: string) => void;
  closeModal: () => void;
  onClickSaveButton: () => void;
  inputGroupName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditGroupName = (props: EditGroupNameProps) => {
  const body = (
    <div className="edit-group-name">
      <h3 id="simple-modal-title">{props.modalTitleLabel}</h3>
      <p>{props.modalTextFieldLabel}</p>
      <TextInput
        id="group-name"
        label={''}
        value={props.groupName}
        onChange={props.inputGroupName}
        required={true}
        type={'text'}
        fullWidth={false}
        disabled={false}
      />
      <div className="add-group-modal__btn">
        <button
          className="add-group-modal__btn--add"
          disabled={props.isBlankGroupName}
          onClick={() => props.onClickSaveButton()}
        >
          保存
        </button>
        <button className="add-group-modal__btn--cancel" onClick={() => props.closeModal()}>
          キャンセル
        </button>
      </div>
    </div>
  );

  return (
    <>
      <MenuItem onClick={() => props.openModal(props.initialGroupName)}>グループ名の編集</MenuItem>
      <Modal
        open={props.open}
        onClose={props.closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default EditGroupName;
