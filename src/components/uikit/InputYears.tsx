import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchTransactionsList } from '../../reducks/transactions/operations';
import { fetchGroupTransactionsList } from '../../reducks/groupTransactions/operations';
import { year, month, years, months } from '../../lib/constant';
import { getPathTemplateName, getPathGroupId } from '../../lib/path';
import CloseIcon from '@material-ui/icons/Close';
import '../../assets/modules/input-years.scss';

interface InputYearsProps {
  handleSelectYearsClose: () => void;
  selectedYear: number[];
  selectedMonth: number;
  changeSelectedYear: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changeSelectedMonth: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const InputYears = (props: InputYearsProps) => {
  const dispatch = useDispatch();
  const pathName = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);

  return (
    <>
      <div className="input-years">
        <button className="input-years__btn__close" onClick={props.handleSelectYearsClose}>
          <CloseIcon />
        </button>
        <form className="input-years__select-position">
          <select
            defaultValue={year}
            onChange={props.changeSelectedYear}
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
            defaultValue={month}
            className="input-years__select"
            onChange={props.changeSelectedMonth}
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
              if (pathName !== 'group') {
                dispatch(
                  fetchTransactionsList(
                    String(props.selectedYear),
                    ('0' + props.selectedMonth).slice(-2)
                  )
                ) && props.handleSelectYearsClose();
              } else {
                dispatch(
                  fetchGroupTransactionsList(
                    Number(props.selectedYear),
                    String(props.selectedMonth),
                    groupId
                  )
                );
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
