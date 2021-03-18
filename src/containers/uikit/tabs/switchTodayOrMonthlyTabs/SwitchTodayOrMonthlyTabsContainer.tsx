import React from 'react';
import { TodayOrMonthly } from '../../../../reducks/shoppingList/types';
import SwitchTodayOrMonthlyTabs from '../../../../components/uikit/tabs/switchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabs';

interface SwitchTodayOrMonthlyTabsContainerProps {
  currentItem: TodayOrMonthly;
  setCurrentItems: React.Dispatch<React.SetStateAction<TodayOrMonthly>>;
  leftItem: JSX.Element;
  rightItem: JSX.Element;
}

const SwitchTodayOrMonthlyTabsContainer = (props: SwitchTodayOrMonthlyTabsContainerProps) => {
  const currentButtonStyle = (value: TodayOrMonthly) => {
    if (props.currentItem === value) {
      return 'switch-today-or-monthly-tabs__button--focus-color';
    }

    return 'switch-today-or-monthly-tabs__button';
  };

  const switchItem = (value: TodayOrMonthly) => {
    props.setCurrentItems(value);
  };

  return (
    <SwitchTodayOrMonthlyTabs
      currentItem={props.currentItem}
      setCurrentItems={props.setCurrentItems}
      leftItem={props.leftItem}
      rightItem={props.rightItem}
      currentButtonStyle={currentButtonStyle}
      switchItem={switchItem}
    />
  );
};
export default SwitchTodayOrMonthlyTabsContainer;
