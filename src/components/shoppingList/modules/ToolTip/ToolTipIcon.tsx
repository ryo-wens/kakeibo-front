import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import './tool-tip-icon.scss';

const ToolTipIcon = () => {
  return (
    <>
      <span className="tool-tip-icon">
        <HelpIcon className="tool-tip-icon__icon" />
        <span className="tool-tip-icon__tooltip">
          購入完了時のチェックをつけると、 自動的に家計簿に追加されるようになります。
        </span>
      </span>
    </>
  );
};

export default ToolTipIcon;
