import React from 'react';
import { StandardBudgets } from './index';

const SelectMonthBudgets = () => {
  const pathname = window.location.pathname;
  const paths = pathname.split('/');
  const date = parseInt(paths[paths.length - 1], 10);
  const selectYear = String(date.toString().substring(0, 4));
  const selectMonth = String(date.toString().substring(4, 6));

  return (
    <>
      <h3>
        {selectYear}年{selectMonth}月
      </h3>
      <StandardBudgets />
    </>
  );
};
export default SelectMonthBudgets;
