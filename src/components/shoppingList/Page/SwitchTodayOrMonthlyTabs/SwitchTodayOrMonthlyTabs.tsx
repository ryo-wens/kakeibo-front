import React, { useState } from 'react';
import './switch-today-or-monthly-tabs.scss';

interface SwitchTodayOrMonthlyTabsProps {
  leftItem: JSX.Element;
  rightItem: JSX.Element;
}

const SwitchTodayOrMonthlyTabs = (props: SwitchTodayOrMonthlyTabsProps) => {
  const [currentItems, setCurrentItems] = useState<number>(0);

  const currentButtonStyle = (value: number) => {
    if (currentItems === value) {
      return {
        color: '#fff',
        backgroundColor: '#5D6C89',
      };
    }
  };

  const switchItem = (value: number) => {
    setCurrentItems(value);
  };

  return (
    <div>
      <div className="switch-today-or-monthly-tabs">
        <button onClick={() => switchItem(0)} style={currentButtonStyle(0)}>
          今日
        </button>
        <button onClick={() => switchItem(1)} style={currentButtonStyle(1)}>
          月間予定
        </button>
      </div>
      {currentItems === 0 && props.leftItem}
      {currentItems === 1 && props.rightItem}
    </div>
  );
};
export default SwitchTodayOrMonthlyTabs;
