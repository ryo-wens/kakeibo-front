import React from 'react';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import '../../../shoppingList/page/TodayShoppingListArea/today-shopping-list-area.scss';
import GroupTodayShoppingListByCategoriesContainer from '../../../../containers/groupShoppingList/page/todayShoppingListArea/todayShoppingListByCategoriesContainer/GroupTodayShoppingListByCategoriesContainer';
import AddGroupShoppingListItemModalContainer from '../../../../containers/groupShoppingList/modules/modal/AddGroupShoppingListItemModalContainer';
import GroupTodayShoppingListByDateContainer from '../../../../containers/groupShoppingList/page/todayShoppingListArea/todayShoppingListByDateContainer/GroupTodayShoppingListByDateContainer';

interface GroupTodayShoppingListAreaProps {
  currentYearMonth: string;
}

const GroupTodayShoppingListArea = (props: GroupTodayShoppingListAreaProps) => {
  return (
    <>
      <div className="today-shopping-list-area__add-button">
        <AddGroupShoppingListItemModalContainer currentYearMonth={props.currentYearMonth} />
      </div>
      <div className="today-shopping-list-area__switch-item">
        <div className="today-shopping-list-area__switch-item--width">
          <SwitchItemTabs
            leftButtonLabel={'日別'}
            rightButtonLabel={'カテゴリ別'}
            leftItem={
              <GroupTodayShoppingListByDateContainer currentYearMonth={props.currentYearMonth} />
            }
            rightItem={
              <GroupTodayShoppingListByCategoriesContainer
                currentYearMonth={props.currentYearMonth}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default GroupTodayShoppingListArea;
