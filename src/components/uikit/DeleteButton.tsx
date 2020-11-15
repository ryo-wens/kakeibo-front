import React from 'react';
import '../../assets/modules/delete-btn.scss';

interface DeleteButtonProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
}

const DeleteButton = (props: DeleteButtonProps) => {
  return (
    <button className="delete-btn" disabled={props.disabled} onClick={props.onClick}>
      {props.label}
    </button>
  );
};

export default DeleteButton;
