import React from 'react';
import { CustomBudgetsList } from '../../reducks/budgets/types';
import TextField from '@material-ui/core/TextField';
import GenericButton from '../uikit/GenericButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import GroupCustomBudgetsContainer from '../../containers/budgets/GroupCustomBudgetsContainer';
import './budget.scss';

interface CustomBudgetsProps {
  pathName: string;
  unInput: boolean;
  budgetsYear: number;
  yearsInPersonal: string;
  totalCustomBudget: number;
  customBudgets: CustomBudgetsList;
  setCustomBudgets: React.Dispatch<React.SetStateAction<CustomBudgetsList>>;
  backPageOperation: () => void;
  editCustomBudgetOperation: () => void;
}

const CustomBudgets = (props: CustomBudgetsProps) => {
  return (
    <>
      {props.pathName !== 'group' ? (
        <>
          <div className="budget__spacer budget__spacer--medium" />
          <div className="budget budget__background budget__background__table">
            <div className="budget__back-btn--position">
              <button className="budget__back-btn" onClick={() => props.backPageOperation()}>
                <ChevronLeftIcon />
              </button>
            </div>
            <div className="budget__spacer budget__spacer--medium" />
            <div className="budget__total-budget budget__total-budget__position">
              カスタム予算編集
            </div>
            <div className="budget__total-budget budget__total-budget__space">
              {props.yearsInPersonal}
            </div>
            <div className="budget__spacer budget__spacer--medium" />
            <div className="budget__total-budget budget__total-budget__space">
              総予算 ¥ {props.totalCustomBudget.toLocaleString()}
            </div>
            <div className="budget__spacer budget__spacer--medium" />
            <table className="budget budget__background__table">
              <tbody>
                <tr className="budget__th">
                  <th align="center">カテゴリー</th>
                  <th align="center">先月の支出</th>
                  <th align="center">予算</th>
                </tr>
                {props.customBudgets.map((customBudget, index) => {
                  const onChangeBudget = (event: { target: { value: string } }) => {
                    const newBudgets = [...props.customBudgets];
                    newBudgets[index].budget = (event.target.value as unknown) as number;
                    props.setCustomBudgets(newBudgets);
                  };
                  return (
                    <tr key={customBudget.big_category_id}>
                      <td className="budget__td" scope="row">
                        {customBudget.big_category_name}
                      </td>
                      <td className="budget__td">￥ {customBudget.last_month_expenses}</td>
                      <td className="budget__td" align="center">
                        <TextField
                          size={'small'}
                          id={'budgets'}
                          variant="outlined"
                          type={'number'}
                          value={customBudget.budget}
                          onChange={onChangeBudget}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="budget__submit-btn">
              <GenericButton
                label={'更新する'}
                disabled={props.unInput}
                onClick={() => {
                  props.editCustomBudgetOperation();
                  props.backPageOperation();
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <GroupCustomBudgetsContainer budgetsYear={props.budgetsYear} />
      )}
    </>
  );
};
export default CustomBudgets;
