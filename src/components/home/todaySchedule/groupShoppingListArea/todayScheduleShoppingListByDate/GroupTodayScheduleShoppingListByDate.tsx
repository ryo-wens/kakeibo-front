import React from 'react';
import '../../shoppingListArea/todayScheduleShoppingListByDate/today-schedule-shopping-list-by-date.scss';
import { GroupShoppingList } from '../../../../../reducks/groupShoppingList/types';
import GroupShoppingListItemComponentContainer from '../../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/GroupShoppingListItemComponentContainer';

interface GroupTodayScheduleShoppingListByDateProps {
  shoppingListByDate: GroupShoppingList;
  currentYear: string;
  currentMonth: string;
  message: string;
}

const GroupTodayScheduleShoppingListByDate = (props: GroupTodayScheduleShoppingListByDateProps) => {
  return (
    <div className="today-schedule-shopping-list-by-date">
      {props.shoppingListByDate.length ? (
        props.shoppingListByDate.map((listItem) => {
          return (
            <div className="today-schedule-shopping-list-by-date__item" key={listItem.id}>
              <GroupShoppingListItemComponentContainer
                listItem={listItem}
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
                purchaseClassName={'today-schedule-shopping-list-by-date__child-purchase'}
                amountClassName={'today-schedule-shopping-list-by-date__child-amount'}
              />
            </div>
          );
        })
      ) : (
        <p className="today-schedule-shopping-list-by-date__message">{props.message}</p>
      )}
    </div>
  );
};

export default GroupTodayScheduleShoppingListByDate;
