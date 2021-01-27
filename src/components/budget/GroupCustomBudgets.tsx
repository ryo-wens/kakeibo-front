import React from 'react';
import { GroupCustomBudgetsList } from '../../reducks/groupBudgets/types';
import TextField from '@material-ui/core/TextField';
import GenericButton from '../uikit/GenericButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import './budget.scss';

interface GroupCustomBudgetsProps {
  yearsInGroup: string;
  unEditCustomBudget: boolean;
  groupTotalCustomBudget: number;
  groupCustomBudgets: GroupCustomBudgetsList;
  setGroupCustomBudgets: React.Dispatch<React.SetStateAction<GroupCustomBudgetsList>>;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  backPageOperation: () => void;
  editGroupCustomBudgetOperation: () => void;
}

const GroupCustomBudgets = (props: GroupCustomBudgetsProps) => {
  return (
    <>
      <div className="budget__spacer budget__spacer--medium" />
      <div className="budget budget__background budget__background__table">
        <div className="budget__back-btn--position">
          <button className="budget__back-btn" onClick={() => props.backPageOperation()}>
            <ChevronLeftIcon />
          </button>
        </div>
        <div className="budget__spacer budget__spacer--medium" />
        <div className="budget__total-budget budget__total-budget__position">カスタム予算編集</div>
        <div className="budget__total-budget budget__total-budget__space">{props.yearsInGroup}</div>
        <div className="budget__total-budget budget__total-budget__space">
          総予算 ¥ {props.groupTotalCustomBudget.toLocaleString()}
        </div>
        <div className="budget__spacer budget__spacer--medium" />
        <table className="budget budget__background__table">
          <tbody>
            <tr className="budget__th">
              <th align="center">カテゴリー</th>
              <th align="center">先月の支出</th>
              <th align="center">予算</th>
            </tr>
            {props.groupCustomBudgets.map((groupCustomBudget, index) => {
              const onChangeBudget = (event: { target: { value: string } }) => {
                const newBudgets = [...props.groupCustomBudgets];
                newBudgets[index].budget = (event.target.value as unknown) as number;
                props.setGroupCustomBudgets(newBudgets);
                props.setEditing(true);
              };
              return (
                <tr key={groupCustomBudget.big_category_id}>
                  <td className="budget__td" scope="row">
                    {groupCustomBudget.big_category_name}
                  </td>
                  <td className="budget__td">￥ {groupCustomBudget.last_month_expenses}</td>
                  <td className="budget__td" align="center">
                    <TextField
                      size={'small'}
                      id={'budgets'}
                      variant="outlined"
                      type={'number'}
                      value={groupCustomBudget.budget}
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
            disabled={props.unEditCustomBudget}
            onClick={() => {
              props.editGroupCustomBudgetOperation();
              props.backPageOperation();
            }}
          />
        </div>
      </div>
    </>
  );
};
export default GroupCustomBudgets;
