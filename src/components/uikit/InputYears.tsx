import React, { useCallback } from 'react';
import { years, months } from '../../lib/constant';
import CloseIcon from '@material-ui/icons/Close';
import '../../assets/modules/input-years.scss';

interface InputYearsProps {
  handleSelectYearsClose: () => void;
  selectedYear: number;
  selectedMonth: number;
  setItemYear: React.Dispatch<React.SetStateAction<number>>;
  setItemMonth: React.Dispatch<React.SetStateAction<number>>;
  onClickDisplayYears: () => void;
}

const InputYears = (props: InputYearsProps) => {
  const changeItemYear = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      props.setItemYear(Number(event.target.value));
    },
    [props.setItemYear]
  );

  const changeItemMonth = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      props.setItemMonth(Number(event.target.value));
    },
    [props.setItemMonth]
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
          <button className="input-years__btn__display" onClick={() => props.onClickDisplayYears()}>
            表示
          </button>
        </div>
      </div>
    </>
  );
};
export default InputYears;
