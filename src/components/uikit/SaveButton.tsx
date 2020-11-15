import React from 'react';
import '../../assets/modules/save-btn.scss';

interface SaveButtonProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
}

const SaveButton = (props: SaveButtonProps) => {
  return (
    <button className="save-btn" disabled={props.disabled} onClick={props.onClick}>
      {props.label}
    </button>
  );
};

export default SaveButton;
