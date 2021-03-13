import React, { useState } from 'react';
import './switch-item-tabs.scss';
import cn from 'classnames';

interface SwitchItemTabsProps {
  leftButtonLabel: string;
  rightButtonLabel: string;
  leftItem: JSX.Element;
  rightItem: JSX.Element;
  tabsBtnClassName?: string;
}

const SwitchItemTabs = (props: SwitchItemTabsProps) => {
  const [currentItems, setCurrentItems] = useState<number>(0);

  const currentButtonStyle = (value: number) => {
    if (currentItems === value) {
      return {
        background: 'linear-gradient(90deg, rgba(245,117,109,1) 0%, rgba(238,62,91,1) 45%)',
        color: '#fff',
      };
    }
  };

  const switchItem = (value: number) => {
    setCurrentItems(value);
  };

  return (
    <div>
      <div className={cn('switch-item-tabs__buttons', props.tabsBtnClassName)}>
        <button onClick={() => switchItem(0)} style={currentButtonStyle(0)}>
          {props.leftButtonLabel}
        </button>
        <button onClick={() => switchItem(1)} style={currentButtonStyle(1)}>
          {props.rightButtonLabel}
        </button>
      </div>
      {currentItems === 0 && props.leftItem}
      {currentItems === 1 && props.rightItem}
    </div>
  );
};
export default SwitchItemTabs;
