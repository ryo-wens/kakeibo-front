import React from 'react';
import { StandardBudgetsList } from '../../reducks/budgets/types';
import TextField from '@material-ui/core/TextField';
import GenericButton from '../uikit/GenericButton';
import GroupStandardBudgetsContainer from '../../containers/budgets/GroupStandardBudgetsContainer';
import './budget.scss';

interface StandardBudgetsProps {
  pathName: string;
  unEditBudgets: boolean;
  totalStandardBudget: number;
  budgets: StandardBudgetsList;
  setBudgets: React.Dispatch<React.SetStateAction<StandardBudgetsList>>;
  editStandardBudgetOperation: () => void;
}

const StandardBudgets = (props: StandardBudgetsProps) => {
  return (
    <>
      {props.pathName !== 'group' ? (
        <>
          <div className="budget budget__background ">
            <div className="budget__spacer budget__spacer--medium" />
            <div className="budget__total-budget budget__total-budget__position">標準予算設定</div>
            <div className="budget__total-budget budget__total-budget__space">
              総予算 ¥ {props.totalStandardBudget.toLocaleString()}
            </div>
            <div className="budget__spacer budget__spacer--medium" />
            <table className="budget budget__background__table">
              <tbody>
                <tr className="budget__th">
                  <th align="center">カテゴリー</th>
                  <th align="center">先月の支出</th>
                  <th align="center">予算</th>
                </tr>
                {props.budgets.map((budget, index) => {
                  const onChangeBudget = (event: { target: { value: string } }) => {
                    const newBudgets = [...props.budgets];
                    newBudgets[index].budget = (event.target.value as unknown) as number;
                    props.setBudgets(newBudgets);
                  };
                  return (
                    <tr key={budget.big_category_id}>
                      <td className="budget__td" scope="row">
                        {budget.big_category_name}
                      </td>
                      <td className="budget__td">
                        ￥ {budget.last_month_expenses.toLocaleString()}
                      </td>
                      <td className="budget__td" align="center">
                        <TextField
                          size={'small'}
                          id={'budgets'}
                          variant="outlined"
                          type={'number'}
                          value={budget.budget}
                          onChange={onChangeBudget}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="budget__spacer budget__spacer--medium" />
            <div className="budget__submit-btn">
              <GenericButton
                label={'更新する'}
                disabled={props.unEditBudgets}
                onClick={() => {
                  props.editStandardBudgetOperation();
                  window.scrollTo(0, 0);
                }}
              />
            </div>
            <div className="budget__spacer budget__spacer--medium" />
          </div>
        </>
      ) : (
        <GroupStandardBudgetsContainer />
      )}
    </>
  );
};
export default StandardBudgets;
