import React from 'react';
import { GroupStandardBudgetsList } from '../../reducks/groupBudgets/types';
import TextField from '@material-ui/core/TextField';
import GenericButton from '../uikit/GenericButton';
import './budget.scss';

interface GroupStandardBudgetsProps {
  unEditBudgets: boolean;
  groupTotalStandardBudget: number;
  groupStandardBudgets: GroupStandardBudgetsList;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setGroupStandardBudgets: React.Dispatch<React.SetStateAction<GroupStandardBudgetsList>>;
  editGroupStandardBudgetOperation: () => void;
}

const GroupStandardBudgets = (props: GroupStandardBudgetsProps) => {
  return (
    <>
      <div className="budget__spacer budget__spacer--medium" />
      <div className="budget budget__background budget__background__table">
        <div className="budget__spacer budget__spacer--medium" />
        <div className="budget__total-budget budget__total-budget__position">標準予算設定</div>
        <div className="budget__total-budget budget__total-budget__space">
          総予算 ¥ {props.groupTotalStandardBudget.toLocaleString()}
        </div>
        <div className="budget__spacer budget__spacer--medium" />
        <table className="budget budget__background__table">
          <tbody>
            <tr className="budget__th">
              <th align="center">カテゴリー</th>
              <th align="center">先月の支出</th>
              <th align="center">予算</th>
            </tr>
            {props.groupStandardBudgets.map((groupBudget, index) => {
              const onChangeBudget = (event: { target: { value: string } }) => {
                const newBudgets = [...props.groupStandardBudgets];
                newBudgets[index].budget = (event.target.value as unknown) as number;
                props.setGroupStandardBudgets(newBudgets);
                props.setEditing(true);
              };
              return (
                <tr key={groupBudget.big_category_id}>
                  <td className="budget__td" scope="row">
                    {groupBudget.big_category_name}
                  </td>
                  <td className="budget__td">
                    ￥ {groupBudget.last_month_expenses.toLocaleString()}
                  </td>
                  <td className="budget__td" align="center">
                    <TextField
                      size={'small'}
                      id={'budgets'}
                      variant="outlined"
                      type={'number'}
                      value={groupBudget.budget}
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
              props.editGroupStandardBudgetOperation();
              props.setEditing(false);
              window.scrollTo(0, 0);
            }}
          />
        </div>
        <div className="budget__spacer budget__spacer--medium" />
      </div>
    </>
  );
};
export default GroupStandardBudgets;
