import React, { useState } from 'react';
import './switch-today-or-monthly-tabs.scss';
import { TodayOrMonthly } from '../../../../reducks/shoppingList/types';

interface SwitchTodayOrMonthlyTabsProps {
  leftItem: JSX.Element;
  rightItem: JSX.Element;
}

const SwitchTodayOrMonthlyTabs = (props: SwitchTodayOrMonthlyTabsProps) => {
  const [currentItems, setCurrentItems] = useState<TodayOrMonthly>('today');

  const currentButtonStyle = (value: TodayOrMonthly) => {
    if (currentItems === value) {
      return {
        color: '#fff',
        backgroundColor: '#5D6C89',
      };
    }
  };

  const switchItem = (value: TodayOrMonthly) => {
    setCurrentItems(value);
  };

  return (
    <div>
      <div className="switch-today-or-monthly-tabs">
        <button onClick={() => switchItem('today')} style={currentButtonStyle('today')}>
          今日
        </button>
        <button onClick={() => switchItem('monthly')} style={currentButtonStyle('monthly')}>
          月間予定
        </button>
      </div>
      {currentItems === 'today' && props.leftItem}
      {currentItems === 'monthly' && props.rightItem}
    </div>
  );
};
export default SwitchTodayOrMonthlyTabs;
