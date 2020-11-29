import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTransactionsList } from '../../reducks/transactions/operations';
import { fetchGroupTransactionsList } from '../../reducks/groupTransactions/operations';
import { years, months } from '../../lib/constant';
import { getPathTemplateName, getPathGroupId } from '../../lib/path';
import CloseIcon from '@material-ui/icons/Close';
import '../../assets/modules/input-years.scss';
import { SelectYears } from '../../lib/date';

interface InputYearsProps {
  handleSelectYearsClose: () => void;
  selectedYear: number;
  selectedMonth: number;
  updateSelectYear: (year: number) => void;
  updateSelectMonth: (month: number) => void;
}

const InputYears = (props: InputYearsProps) => {
  const dispatch = useDispatch();
  const pathName = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);
  const [itemYear, setItemYear] = useState<number>(props.selectedYear);
  const [itemMonth, setItemMonth] = useState<number>(props.selectedMonth);

  const changeItemYear = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setItemYear(Number(event.target.value));
    },
    [setItemYear]
  );

  const changeItemMonth = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setItemMonth(Number(event.target.value));
    },
    [setItemMonth]
  );

  return (
    <>
      <div className="input-years">
        <button className="input-years__btn__close" onClick={props.handleSelectYearsClose}>
          <CloseIcon />
        </button>
        <form className="input-years__select-position">
          <select
            defaultValue={props.selectedYear}
            onChange={changeItemYear}
            className="input-years__select"
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
          年
          <select
            defaultValue={props.selectedMonth}
            className="input-years__select"
            onChange={changeItemMonth}
          >
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
          月
        </form>
        <div className="input-years__btn">
          <button
            className="input-years__btn__display"
            onClick={() => {
              const selectYears: SelectYears = {
                selectedYear: String(itemYear),
                selectedMonth: itemMonth <= 9 ? '0' + itemMonth : String(itemMonth),
              };
              if (pathName !== 'group') {
                dispatch(fetchTransactionsList(selectYears));
                props.updateSelectYear(itemYear);
                props.updateSelectMonth(itemMonth);
                props.handleSelectYearsClose();
              } else {
                const selectYears: SelectYears = {
                  selectedYear: String(itemYear),
                  selectedMonth: itemMonth <= 9 ? '0' + itemMonth : String(itemMonth),
                };
                dispatch(fetchGroupTransactionsList(groupId, selectYears));
                props.updateSelectYear(itemYear);
                props.updateSelectMonth(itemMonth);
                props.handleSelectYearsClose();
              }
            }}
          >
            表示
          </button>
        </div>
      </div>
    </>
  );
};
export default InputYears;
