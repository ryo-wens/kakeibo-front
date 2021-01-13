import React from 'react';
import './switch-today-or-monthly-tabs.scss';
import { TodayOrMonthly } from '../../../../reducks/shoppingList/types';

interface SwitchTodayOrMonthlyTabsProps {
  currentItems: TodayOrMonthly;
  setCurrentItems: React.Dispatch<React.SetStateAction<TodayOrMonthly>>;
  leftItem: JSX.Element;
  rightItem: JSX.Element;
}

const SwitchTodayOrMonthlyTabs = (props: SwitchTodayOrMonthlyTabsProps) => {
  const currentButtonStyle = (value: TodayOrMonthly) => {
    if (props.currentItems === value) {
      return {
        color: '#fff',
        backgroundColor: '#5D6C89',
      };
    }
  };

  const switchItem = (value: TodayOrMonthly) => {
    props.setCurrentItems(value);
  };

  return (
    <div>
      <div className="switch-today-or-monthly-tabs">
        <button onClick={() => switchItem('today')} style={currentButtonStyle('today')}>
          今日
        </button>
        <button onClick={() => switchItem('monthly')} style={currentButtonStyle('monthly')}>
          月間
        </button>
      </div>
      {props.currentItems === 'today' && props.leftItem}
      {props.currentItems === 'monthly' && props.rightItem}
    </div>
  );
};
export default SwitchTodayOrMonthlyTabs;
