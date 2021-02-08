import React from 'react';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import { useSelector } from 'react-redux';
import { date } from '../../../../lib/constant';
import { useParams } from 'react-router';
import '../../../shoppingList/page/TodayShoppingListArea/today-shopping-list-area.scss';
import GroupTodayShoppingListComponent from './GroupTodayShoppingListComponent/GroupTodayShoppingListComponent';
import {
  getGroupTodayShoppingList,
  getGroupTodayShoppingListByCategories,
} from '../../../../reducks/groupShoppingList/selectors';
import GroupTodayShoppingListByCategoriesComponent from './GroupTodayShoppingListByCategoriesComponent/GroupTodayShoppingListByCategoriesComponent';
import AddGroupShoppingListItemModalContainer from '../../../../containers/groupShoppingList/modules/modal/AddGroupShoppingListItemModalContainer';

interface GroupTodayShoppingListAreaProps {
  currentYearMonth: string;
}

const GroupTodayShoppingListArea = (props: GroupTodayShoppingListAreaProps) => {
  const groupTodayShoppingList = useSelector(getGroupTodayShoppingList);
  const groupTodayShoppingListByCategories = useSelector(getGroupTodayShoppingListByCategories);

  const { group_id } = useParams();
  const todayYear = String(date.getFullYear());
  const todayMonth: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const todayDate: string = ('0' + date.getDate()).slice(-2);

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
              <GroupTodayShoppingListComponent
                shoppingList={groupTodayShoppingList}
                currentYearMonth={props.currentYearMonth}
                groupId={Number(group_id)}
                year={todayYear}
                month={todayMonth}
                date={todayDate}
              />
            }
            rightItem={
              <GroupTodayShoppingListByCategoriesComponent
                shoppingListByCategories={groupTodayShoppingListByCategories}
                currentYearMonth={props.currentYearMonth}
                groupId={Number(group_id)}
                year={todayYear}
                month={todayMonth}
                date={todayDate}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default GroupTodayShoppingListArea;
