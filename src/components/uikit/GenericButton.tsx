import React from 'react';
import '../../assets/modules/generic-btn.scss';

type GenericButtonProps = {
  label: string;
  onClick: () => void;
  disabled: boolean;
  startIcon?: React.ReactNode;
};

const GenericButton = (props: GenericButtonProps) => {
  return (
    <div>
      <button className="generic-btn" onClick={() => props.onClick()} disabled={props.disabled}>
        {props.label}
      </button>
    </div>
  );
};
export default GenericButton;
