import React from 'react';
import HeaderContainer from '../../containers/header/HeaderContainer';
import StandardBudgetsContainer from '../../containers/budgets/StandardBudgetsContainer';
import AddCustomBudgetsContainer from '../../containers/budgets/AddCustomBudgetsContainer';
import CustomBudgetsContainer from '../../containers/budgets/CustomBudgetsContainer';
import YearlyBudgetsContainer from '../../containers/templates/budgets/YearlyBudgetsContainer';
import '../../components/budget/budget.scss';
import cn from 'classnames';

interface BudgetsProps {
  query: string;
  routingStandard: () => void;
  routingYearly: () => void;
  budgetsYear: number;
  setBudgetsYear: React.Dispatch<React.SetStateAction<number>>;
}

const Budgets = (props: BudgetsProps) => {
  return (
    <>
      <HeaderContainer />
      <main className="section__container">
        <div className="budget__spacer budget__spacer--medium" />
        {(props.query === '?standard' || props.query === '?yearly') && (
          <div className="budget__switch-type" aria-label="budgets-kind">
            <button
              className={cn('budget__switch-btn', {
                'budget__switch-cr-btn': props.query === '?standard',
              })}
              onClick={() => props.routingStandard()}
            >
              標準予算
            </button>
            <button
              className={cn('budget__switch-btn', {
                'budget__switch-cr-btn': props.query === '?yearly',
              })}
              onClick={() => props.routingYearly()}
            >
              月別カスタム予算
            </button>
          </div>
        )}

        <div className="budget__spacer budget__spacer--medium" />

        {props.query === '?standard' && <StandardBudgetsContainer />}

        {props.query === '?yearly' && (
          <YearlyBudgetsContainer
            budgetsYear={props.budgetsYear}
            setBudgetsYear={props.setBudgetsYear}
          />
        )}

        {props.query === '?edit_custom' && (
          <CustomBudgetsContainer budgetsYear={props.budgetsYear} />
        )}

        {props.query === '?add_custom' && (
          <AddCustomBudgetsContainer budgetsYear={props.budgetsYear} />
        )}
      </main>
    </>
  );
};
export default Budgets;
