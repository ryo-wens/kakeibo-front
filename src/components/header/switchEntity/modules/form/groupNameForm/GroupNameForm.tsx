import React from 'react';
import { TextInput } from '../../../../../uikit';
import styles from './GroupNameForm.module.scss';
import ModalFormLayout from '../../../../../uikit/form/formLayout/ModalFormLayout';

interface GroupNameFormProps {
  titleLabel: string;
  buttonLabel: string;
  open: boolean;
  groupName: string;
  handleOpen: () => void;
  handleClose: () => void;
  handleGroupName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleGroup: () => void;
  disabledButton: boolean;
}

const GroupNameForm = (props: GroupNameFormProps) => {
  return (
    <ModalFormLayout titleLabel={props.titleLabel} handleClose={props.handleClose}>
      <div className={styles.textInput}>
        <TextInput
          id="group-name"
          label={'グループ名'}
          value={props.groupName}
          onChange={props.handleGroupName}
          required={true}
          type={'text'}
          fullWidth={false}
          disabled={false}
        />
      </div>
      <div className={styles.operationBtn}>
        <button
          className={styles.operationBtn__add}
          disabled={props.disabledButton}
          onClick={props.handleGroup}
        >
          {props.buttonLabel}
        </button>
        <button className={styles.operationBtn__cancel} onClick={props.handleClose}>
          キャンセル
        </button>
      </div>
    </ModalFormLayout>
  );
};

export default GroupNameForm;
