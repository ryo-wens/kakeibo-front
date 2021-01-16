import React, { useEffect } from 'react';
import SwitchItemTabs from '../../../uikit/tabs/SwitchItemTabs';
import { useDispatch } from 'react-redux';
import axios, { CancelTokenSource } from 'axios';
import { useParams } from 'react-router';
import '../../../shoppingList/Page/MonthlyShoppingListArea/monthly-shopping-list-area.scss';
import InputYears from '../../../uikit/InputYears';
import { fetchGroups } from '../../../../reducks/groups/operations';
import {
  fetchGroupMonthlyShoppingList,
  fetchGroupMonthlyShoppingListByCategories,
} from '../../../../reducks/groupShoppingList/operations';

interface GroupMonthlyShoppingListAreaProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYearMonth: string;
}

const GroupMonthlyShoppingListArea = (props: GroupMonthlyShoppingListAreaProps) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const fetchData = (groupId: number, year: string, month: string, signal: CancelTokenSource) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupMonthlyShoppingList(id, year, month, signal));
    dispatch(fetchGroupMonthlyShoppingListByCategories(id, year, month, signal));
  };

  useEffect(() => {
    const signal = axios.CancelToken.source();
    fetchData(
      Number(id),
      String(props.selectedYear),
      ('0' + props.selectedMonth).slice(-2),
      signal
    );
    const interval = setInterval(() => {
      fetchData(
        Number(id),
        String(props.selectedYear),
        ('0' + props.selectedMonth).slice(-2),
        signal
      );
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [props.selectedYear, props.selectedMonth, id]);

  return (
    <>
      <div className="monthly-shopping-list-area__add-button"></div>
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
          {/*仮実装として、div タグを props として、渡しています。*/}
          <SwitchItemTabs
            leftButtonLabel={'日別'}
            rightButtonLabel={'カテゴリ別'}
            leftItem={<div />}
            rightItem={<div />}
          />
        </div>
      </div>
    </>
  );
};

export default GroupMonthlyShoppingListArea;
