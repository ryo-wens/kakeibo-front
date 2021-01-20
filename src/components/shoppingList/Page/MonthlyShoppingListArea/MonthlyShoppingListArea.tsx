import React, { useEffect } from 'react';
import SwitchItemTabs from '../../../uikit/tabs/SwitchItemTabs';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMonthlyShoppingList,
  fetchMonthlyShoppingListByCategories,
} from '../../../../reducks/shoppingList/operations';
import axios from 'axios';
import { useLocation, useParams } from 'react-router';
import './monthly-shopping-list-area.scss';
import InputYears from '../../../uikit/InputYears';
import { fetchGroups } from '../../../../reducks/groups/operations';
import ShoppingListByDate from '../../uikit/List/ShoppingListByDate/ShoppingListByDate';
import {
  getMonthlyShoppingList,
  getMonthlyShoppingListByCategories,
} from '../../../../reducks/shoppingList/selectors';
import ShoppingListByCategoriesComponent from '../../uikit/List/ShoppingListByCategoriesComponent/ShoppingListByCategoriesComponent';
import {
  fetchGroupMonthlyShoppingList,
  fetchGroupMonthlyShoppingListByCategories,
} from '../../../../reducks/groupShoppingList/operations';
import AddShoppingListModalContainer from '../../../../containers/shoppingList/uikit/Modal/AddShoppingListModalContainer';

interface MonthlyShoppingListAreaProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYearMonth: string;
}

const MonthlyShoppingListArea = (props: MonthlyShoppingListAreaProps) => {
  const dispatch = useDispatch();
  const monthlyShoppingList = useSelector(getMonthlyShoppingList);
  const monthlyShoppingListByCategories = useSelector(getMonthlyShoppingListByCategories);
  const pathName = useLocation().pathname.split('/')[1];
  const { id } = useParams();

  useEffect(() => {
    if (pathName === 'group') {
      const signal = axios.CancelToken.source();
      dispatch(
        fetchGroupMonthlyShoppingList(
          Number(id),
          String(props.selectedYear),
          ('0' + props.selectedMonth).slice(-2),
          signal
        )
      );
      dispatch(
        fetchGroupMonthlyShoppingListByCategories(
          Number(id),
          String(props.selectedYear),
          ('0' + props.selectedMonth).slice(-2),
          signal
        )
      );
      const interval = setInterval(() => {
        dispatch(
          fetchGroupMonthlyShoppingList(
            Number(id),
            String(props.selectedYear),
            ('0' + props.selectedMonth).slice(-2),
            signal
          )
        );
        dispatch(
          fetchGroupMonthlyShoppingListByCategories(
            Number(id),
            String(props.selectedYear),
            ('0' + props.selectedMonth).slice(-2),
            signal
          )
        );
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [String(props.selectedYear), ('0' + props.selectedMonth).slice(-2), id]);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName !== 'group') {
      dispatch(
        fetchMonthlyShoppingList(
          String(props.selectedYear),
          ('0' + props.selectedMonth).slice(-2),
          signal
        )
      );
      dispatch(
        fetchMonthlyShoppingListByCategories(
          String(props.selectedYear),
          ('0' + props.selectedMonth).slice(-2),
          signal
        )
      );
      return () => signal.cancel();
    }
  }, [props.selectedYear, props.selectedMonth]);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchGroups(signal));
    const interval = setInterval(() => {
      dispatch(fetchGroups(signal));
    }, 3000);

    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [props.selectedYear, props.selectedMonth]);

  return (
    <>
      <div className="monthly-shopping-list-area__add-button">
        <AddShoppingListModalContainer />
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
              <ShoppingListByDate
                shoppingListByDate={monthlyShoppingList}
                currentYearMonth={props.currentYearMonth}
                message={`${props.selectedMonth}月の買い物リストは登録されていません。`}
              />
            }
            rightItem={
              <ShoppingListByCategoriesComponent
                shoppingListByCategories={monthlyShoppingListByCategories}
                currentYearMonth={props.currentYearMonth}
                message={`${props.selectedMonth}月の買い物リストは登録されていません。`}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default MonthlyShoppingListArea;
