import React from 'react';
import styles from './SwitchTodayOrMonthlyTabs.module.scss';
import { TodayOrMonthly } from '../../../../reducks/shoppingList/types';
import cn from 'classnames';

interface SwitchTodayOrMonthlyTabsProps {
  currentItem: TodayOrMonthly;
  setCurrentItems: React.Dispatch<React.SetStateAction<TodayOrMonthly>>;
  leftItem: JSX.Element;
  rightItem: JSX.Element;
  switchItem: (value: TodayOrMonthly) => void;
}

const SwitchTodayOrMonthlyTabs = (props: SwitchTodayOrMonthlyTabsProps) => {
  const currentBtnClassName = (value: TodayOrMonthly) => {
    return cn(styles.btn, { [styles.crPageBtn]: props.currentItem === value });
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <button className={currentBtnClassName('today')} onClick={() => props.switchItem('today')}>
          今日
        </button>
        <button
          className={currentBtnClassName('monthly')}
          onClick={() => props.switchItem('monthly')}
        >
          月間
        </button>
      </div>
      {props.currentItem === 'today' && props.leftItem}
      {props.currentItem === 'monthly' && props.rightItem}
    </div>
  );
};
export default SwitchTodayOrMonthlyTabs;
