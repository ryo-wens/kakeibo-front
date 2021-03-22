import React from 'react';
import { TodayOrMonthly } from '../../../../reducks/shoppingList/types';
import SwitchTodayOrMonthlyTabs from '../../../../components/uikit/tabs/SwitchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabs';

interface SwitchTodayOrMonthlyTabsContainerProps {
  currentItem: TodayOrMonthly;
  setCurrentItems: React.Dispatch<React.SetStateAction<TodayOrMonthly>>;
  leftItem: JSX.Element;
  rightItem: JSX.Element;
}

const SwitchTodayOrMonthlyTabsContainer = (props: SwitchTodayOrMonthlyTabsContainerProps) => {
  const switchItem = (value: TodayOrMonthly) => {
    props.setCurrentItems(value);
  };

  return (
    <SwitchTodayOrMonthlyTabs
      currentItem={props.currentItem}
      setCurrentItems={props.setCurrentItems}
      leftItem={props.leftItem}
      rightItem={props.rightItem}
      switchItem={switchItem}
    />
  );
};
export default SwitchTodayOrMonthlyTabsContainer;
