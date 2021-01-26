import React from 'react';
import { Header } from '../../components/header';
import StandardBudgetsContainer from '../../containers/budgets/StandardBudgetsContainer';
import YearlyBudgetsContainer from '../../containers/templates/budgets/YearlyBudgetsContainer';
import '../../components/budget/budget.scss';

interface BudgetsProps {
  query: string;
  routingStandard: () => void;
  routingYearly: () => void;
  currentStandardColor: () => { color: string; background: string };
  currentYearlyColor: () => { color: string; background: string };
}

const Budgets = (props: BudgetsProps) => {
  return (
    <>
      <Header />
      <main className="section__container">
        <div className="budget__spacer budget__spacer--medium" />
        <div className="switch-item-tabs__buttons budget__switch-type" aria-label="budgets-kind">
          <button style={props.currentStandardColor()} onClick={() => props.routingStandard()}>
            標準予算
          </button>
          <button style={props.currentYearlyColor()} onClick={() => props.routingYearly()}>
            月別カスタム予算
          </button>
        </div>
        <div className="budget__spacer budget__spacer--medium" />

        {props.query === '?standard' && <StandardBudgetsContainer />}

        {props.query === '?yearly' && <YearlyBudgetsContainer />}
      </main>
    </>
  );
};
export default Budgets;
