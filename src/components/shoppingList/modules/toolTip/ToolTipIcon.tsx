import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import './tool-tip-icon.scss';

interface ToolTipIconProps {
  message: string;
}

const ToolTipIcon = (props: ToolTipIconProps) => {
  return (
    <>
      <span className="tool-tip-icon">
        <HelpIcon className="tool-tip-icon__icon" />
        <span className="tool-tip-icon__tooltip">{props.message}</span>
      </span>
    </>
  );
};

export default ToolTipIcon;
