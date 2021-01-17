import React from 'react';
import SwitchItemTabs from '../../../uikit/tabs/SwitchItemTabs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import '../../../shoppingList/Page/MonthlyShoppingListArea/monthly-shopping-list-area.scss';
import InputYears from '../../../uikit/InputYears';
import GroupMonthlyShoppingListByCategoriesComponent from './GroupMonthlyShoppingListByCategoriesComponent/GroupMonthlyShoppingListByCategoriesComponent';
import {
  getGroupMonthlyShoppingList,
  getGroupMonthlyShoppingListByCategories,
} from '../../../../reducks/groupShoppingList/selectors';
import AddGroupShoppingListModal from '../../uikit/Modal/AddGroupShoppingListModal/AddGroupShoppingListModal';
import GroupMonthlyShoppingListComponent from './GroupMonthlyShoppingListComponent/GroupMonthlyShoppingListComponent';

interface GroupMonthlyShoppingListAreaProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}

const GroupMonthlyShoppingListArea = (props: GroupMonthlyShoppingListAreaProps) => {
  const groupMonthlyShoppingList = useSelector(getGroupMonthlyShoppingList);
  const groupMonthlyShoppingListByCategories = useSelector(getGroupMonthlyShoppingListByCategories);

  const { id } = useParams();
  const currentMonth = (`0` + `${props.selectedMonth}`).slice(-2);
  const currentYear = String(props.selectedYear);
  const currentYearMonth = `${props.selectedYear}/${currentMonth}`;

  return (
    <>
      <div className="monthly-shopping-list-area__add-button">
        <AddGroupShoppingListModal currentYearMonth={currentYearMonth} />
      </div>
      <div className="monthly-shopping-list-area__switch-item">
        <div className="monthly-shopping-list-area__switch-item--width">
          <div className="monthly-shopping-list-area__input-years">
            <InputYears
              selectedYear={props.selectedYear}
              selectedMonth={props.selectedMonth}
              setSelectedMonth={props.setSelectedMonth}
              setSelectedYear={props.setSelectedYear}
            />
          </div>
          <SwitchItemTabs
            leftButtonLabel={'日別'}
            rightButtonLabel={'カテゴリ別'}
            leftItem={
              <GroupMonthlyShoppingListComponent
                shoppingList={groupMonthlyShoppingList}
                selectedMonth={props.selectedMonth}
                groupId={Number(id)}
                currentYear={currentYear}
                currentMonth={currentMonth}
                currentYearMonth={currentYearMonth}
              />
            }
            rightItem={
              <GroupMonthlyShoppingListByCategoriesComponent
                shoppingListByCategories={groupMonthlyShoppingListByCategories}
                selectedMonth={props.selectedMonth}
                groupId={Number(id)}
                currentYear={currentYear}
                currentMonth={currentMonth}
                currentYearMonth={currentYearMonth}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default GroupMonthlyShoppingListArea;
