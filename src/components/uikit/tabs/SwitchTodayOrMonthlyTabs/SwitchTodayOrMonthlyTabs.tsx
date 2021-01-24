import React from 'react';
import './switch-today-or-monthly-tabs.scss';
import { TodayOrMonthly } from '../../../../reducks/shoppingList/types';

interface SwitchTodayOrMonthlyTabsProps {
  currentItem: TodayOrMonthly;
  setCurrentItems: React.Dispatch<React.SetStateAction<TodayOrMonthly>>;
  leftItem: JSX.Element;
  rightItem: JSX.Element;
  currentButtonStyle: (value: TodayOrMonthly) => string;
  switchItem: (value: TodayOrMonthly) => void;
}

const SwitchTodayOrMonthlyTabs = (props: SwitchTodayOrMonthlyTabsProps) => {
  return (
    <div>
      <div className="switch-today-or-monthly-tabs">
        <button
          className={props.currentButtonStyle('today')}
          onClick={() => props.switchItem('today')}
        >
          今日
        </button>
        <button
          className={props.currentButtonStyle('monthly')}
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
