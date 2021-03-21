import React, { useState } from 'react';
import styles from './SwitchItemTabs.module.scss';
import cn from 'classnames';

interface SwitchItemTabsProps {
  leftButtonLabel: string;
  rightButtonLabel: string;
  leftItem: JSX.Element;
  rightItem: JSX.Element;
  tabsBtnClassName?: string;
}

const SwitchItemTabs = (props: SwitchItemTabsProps) => {
  const [currentItem, setCurrentItem] = useState<number>(0);

  const switchItem = (value: number) => {
    setCurrentItem(value);
  };

  return (
    <div>
      <div className={cn(styles.wrapper, props.tabsBtnClassName)}>
        <button
          className={cn(styles.btn, { [styles.crBtn]: currentItem === 0 })}
          onClick={() => switchItem(0)}
        >
          {props.leftButtonLabel}
        </button>
        <button
          className={cn(styles.btn, { [styles.crBtn]: currentItem === 1 })}
          onClick={() => switchItem(1)}
        >
          {props.rightButtonLabel}
        </button>
      </div>
      {currentItem === 0 && props.leftItem}
      {currentItem === 1 && props.rightItem}
    </div>
  );
};
export default SwitchItemTabs;
