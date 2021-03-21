import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { months, year, month } from '../../lib/constant';
import '../../templates/history/history.scss';
import CloseIcon from '@material-ui/icons/Close';
import { nextSelectYears, prevSelectYears } from '../../lib/date';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

interface InputYearsProps {
  currentPage: string;
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}

const InputYears = (props: InputYearsProps) => {
  const history = useHistory();
  const [itemYear, setItemYear] = useState<number>(props.selectedYear);
  const [itemMonth, setItemMonth] = useState<number>(props.selectedMonth);
  const [openSelectYears, setOpenSelectYears] = useState<boolean>(false);
  const years = [
    props.selectedYear - 3,
    props.selectedYear - 2,
    props.selectedYear - 1,
    props.selectedYear,
    props.selectedYear + 1,
    props.selectedYear + 2,
    props.selectedYear + 3,
  ];

  const updatePrevYears = () => {
    const prevYears = prevSelectYears(props.selectedYear, props.selectedMonth);

    props.setSelectedYear(Number(prevYears.selectedYear));
    props.setSelectedMonth(Number(prevYears.selectedMonth));
    setItemYear(Number(prevYears.selectedYear));
    setItemMonth(Number(prevYears.selectedMonth));

    if (props.currentPage === 'account') {
      history.push({ search: `?year=${prevYears.selectedYear}&month=${prevYears.selectedMonth}` });
    }

    if (props.currentPage === 'history/?daily') {
      history.push({
        search: `?daily&year=${prevYears.selectedYear}&month=${prevYears.selectedMonth}`,
      });
    } else if (props.currentPage === 'history/?weekly') {
      history.push({
        search: `?weekly&year=${prevYears.selectedYear}&month=${prevYears.selectedMonth}`,
      });
    }
  };

  const updateNextYears = () => {
    const nextYears = nextSelectYears(props.selectedYear, props.selectedMonth);

    props.setSelectedYear(Number(nextYears.selectedYear));
    props.setSelectedMonth(Number(nextYears.selectedMonth));
    setItemYear(Number(nextYears.selectedYear));
    setItemMonth(Number(nextYears.selectedMonth));

    if (props.currentPage === 'account') {
      history.push({ search: `?year=${nextYears.selectedYear}&month=${nextYears.selectedMonth}` });
    }

    if (props.currentPage === 'history/?daily') {
      history.push({
        search: `?daily&year=${nextYears.selectedYear}&month=${nextYears.selectedMonth}`,
      });
    } else if (props.currentPage === 'history/?weekly') {
      history.push({
        search: `?weekly&year=${nextYears.selectedYear}&month=${nextYears.selectedMonth}`,
      });
    }
  };

  const changeItemYear = (event: React.ChangeEvent<{ value: unknown }>) => {
    setItemYear(Number(event.target.value));
  };

  const changeItemMonth = (event: React.ChangeEvent<{ value: unknown }>) => {
    setItemMonth(Number(event.target.value));
  };

  const onClickDisplayYears = () => {
    props.setSelectedYear(itemYear);
    props.setSelectedMonth(itemMonth);
    setOpenSelectYears(false);

    if (props.currentPage === 'account') {
      history.push({ search: `?year=${itemYear}&month=${moment(itemMonth, 'MM').format('MM')}` });
    }

    if (props.currentPage === 'history/?daily') {
      history.push({
        search: `?daily&year=${itemYear}&month=${moment(itemMonth, 'MM').format('MM')}`,
      });
    } else if (props.currentPage === 'history/?weekly') {
      history.push({
        search: `?weekly&year=${itemYear}&month=${moment(itemMonth, 'MM').format('MM')}`,
      });
    }
  };

  const onClickNowYears = () => {
    props.setSelectedYear(year);
    props.setSelectedMonth(month);
    setOpenSelectYears(false);

    if (props.currentPage === 'account') {
      history.push({ search: `?year=${year}&month=${moment(month, 'MM').format('MM')}` });
    }

    if (props.currentPage === 'history/?daily') {
      history.push({
        search: `?daily&year=${year}&month=${moment(month, 'MM').format('MM')}`,
      });
    } else if (props.currentPage === 'history/?weekly') {
      history.push({
        search: `?weekly&year=${year}&month=${moment(month, 'MM').format('MM')}`,
      });
    }
  };

  return (
    <>
      {!openSelectYears ? (
        <div className="history history__top-button">
          <button className="history__prev-btn" onClick={() => updatePrevYears()}>
            <ArrowLeftIcon />
          </button>
          <button className="input-years__btn__jump-years" onClick={() => setOpenSelectYears(true)}>
            {props.selectedYear} 年 {props.selectedMonth} 月
            <ExpandMoreIcon className="input-years__icon" />
          </button>
          <button className="history__next-btn" onClick={() => updateNextYears()}>
            <ArrowRightIcon />
          </button>
        </div>
      ) : (
        <div className="input-years">
          <button className="input-years__btn__close" onClick={() => setOpenSelectYears(false)}>
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
            <button className="input-years__btn__display" onClick={() => onClickDisplayYears()}>
              表示
            </button>
          </div>
        </div>
      )}

      {(props.selectedYear !== year || props.selectedMonth !== month) && (
        <>
          <div className="history__spacer" />
          <button
            className="input-years__now-btn input-years__btn__display"
            onClick={() => onClickNowYears()}
          >
            現在を表示
          </button>
        </>
      )}
    </>
  );
};
export default InputYears;
