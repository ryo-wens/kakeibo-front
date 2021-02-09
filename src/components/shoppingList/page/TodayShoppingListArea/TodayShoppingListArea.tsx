import React from 'react';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import './today-shopping-list-area.scss';
import AddShoppingListItemModalContainer from '../../../../containers/shoppingList/modules/Modal/AddShoppingListItemModalContainer';
import TodayShoppingListByDateContainer from '../../../../containers/shoppingList/page/TodayShoppingListArea/TodayShoppingListByDateContainer/TodayShoppingListByDateContainer';
import TodayShoppingListByCategoriesContainer from '../../../../containers/shoppingList/page/TodayShoppingListArea/TodayShoppingListByCategoriesContainer/TodayShoppingListByCategoriesContainer';

interface TodayShoppingListAreaProps {
  currentYearMonth: string;
}

const TodayShoppingListArea = (props: TodayShoppingListAreaProps) => {
  return (
    <>
      <div className="today-shopping-list-area__add-button">
        <AddShoppingListItemModalContainer />
      </div>
      <div className="today-shopping-list-area__switch-item">
        <div className="today-shopping-list-area__switch-item--width">
          <SwitchItemTabs
            leftButtonLabel={'日別'}
            rightButtonLabel={'カテゴリ別'}
            leftItem={
              <TodayShoppingListByDateContainer currentYearMonth={props.currentYearMonth} />
            }
            rightItem={
              <TodayShoppingListByCategoriesContainer currentYearMonth={props.currentYearMonth} />
            }
          />
        </div>
      </div>
    </>
  );
};

export default TodayShoppingListArea;
