import React, { useState } from 'react';
import { prevSelectMonth, nextSelectMonth } from '../../lib/date';
import { months } from '../../lib/constant';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../../templates/history/history.scss';
import CloseIcon from '@material-ui/icons/Close';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import '../../assets/modules/select-month.scss';
import { useLocation } from 'react-router';
import qs from 'qs';
import { useHistory } from 'react-router-dom';

interface SelectMonthProps {
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  setSubMonth: React.Dispatch<React.SetStateAction<string | null>>;
}

const SelectMonth = (props: SelectMonthProps) => {
  const history = useHistory();
  const searchLocation = useLocation().search;
  const queryParams = qs.parse(searchLocation);
  const [itemMonth, setItemMonth] = useState<number>(props.selectedMonth);
  const [openSelectMonth, setOpenSelectMonth] = useState<boolean>(false);

  const updatePrevMonth = () => {
    const prevMonth = prevSelectMonth(props.selectedMonth);
    const newPrevMonthQuery = { ...queryParams, month: prevMonth.selectedMonth };
    history.push({ search: decodeURIComponent(qs.stringify(newPrevMonthQuery)) });

    setItemMonth(Number(prevMonth.selectedMonth));
    props.setSelectedMonth(Number(prevMonth.selectedMonth));
    props.setSubMonth(prevMonth.selectedMonth);
  };

  const updateNextMonth = () => {
    const nextMonth = nextSelectMonth(props.selectedMonth);
    const newNextMonthQuery = { ...queryParams, month: nextMonth.selectedMonth };
    history.push({ search: decodeURIComponent(qs.stringify(newNextMonthQuery)) });

    setItemMonth(Number(nextMonth.selectedMonth));
    props.setSelectedMonth(Number(nextMonth.selectedMonth));
    props.setSubMonth(nextMonth.selectedMonth);
  };

  const changeItemMonth = (event: React.ChangeEvent<{ value: unknown }>) => {
    setItemMonth(Number(event.target.value));
  };

  const onClickDisplayMonth = () => {
    props.setSelectedMonth(itemMonth);
    props.setSubMonth(itemMonth <= 9 ? '0' + itemMonth : String(itemMonth));
    setOpenSelectMonth(false);
  };

  return (
    <>
      <button
        className="select-month__skip-btn select-month__skip-btn--prev"
        onClick={() => updatePrevMonth()}
      >
        <ArrowLeftIcon />
      </button>
      <button className="select-month__month-btn" onClick={() => setOpenSelectMonth(true)}>
        {props.selectedMonth}月
        <ExpandMoreIcon className="select-years__icon" />
      </button>
      <button
        className="select-month__skip-btn select-month__skip-btn--next"
        onClick={() => updateNextMonth()}
      >
        <ArrowRightIcon />
      </button>
      <div className="select-years__spacer select-years__spacer--small" />

      {openSelectMonth && (
        <div className="select-month__month-selector--position">
          <div className="select-month__month-box">
            <button className="select-month__close-btn" onClick={() => setOpenSelectMonth(false)}>
              <CloseIcon />
            </button>
            <form>
              <select
                className="select-month__month-selector select-month__month-selector--full"
                defaultValue={props.selectedMonth}
                onChange={changeItemMonth}
              >
                {months.map((month, index) => {
                  return (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  );
                })}
              </select>
            </form>
            <div className="select-month__spacer--small" />

            <button className="select-month__display-btn" onClick={() => onClickDisplayMonth()}>
              表示
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default SelectMonth;
