import React from 'react';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import './today-shopping-list-area.scss';
import AddShoppingListModalContainer from '../../../../containers/shoppingList/modules/Modal/AddShoppingListModalContainer/AddShoppingListModalContainer';
import TodayShoppingListByDateContainer from '../../../../containers/shoppingList/Page/TodayShoppingListArea/TodayShoppingListByDateContainer/TodayShoppingListByDateContainer';
import TodayShoppingListByCategoriesContainer from '../../../../containers/shoppingList/Page/TodayShoppingListArea/TodayShoppingListByCategoriesContainer/TodayShoppingListByCategoriesContainer';

interface TodayShoppingListAreaProps {
  currentYearMonth: string;
}

const TodayShoppingListArea = (props: TodayShoppingListAreaProps) => {
  return (
    <>
      <div className="today-shopping-list-area__add-button">
        <AddShoppingListModalContainer />
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
