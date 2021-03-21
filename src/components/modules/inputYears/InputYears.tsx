import React, { useState } from 'react';
import { months, year, month } from '../../../lib/constant';
import CloseIcon from '@material-ui/icons/Close';
import { nextSelectYears, prevSelectYears } from '../../../lib/date';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import styles from './InputYears.module.scss';
import cn from 'classnames';

interface InputYearsProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  btnClassName: string;
  selectWrapperClassName?: string;
}

const InputYears = (props: InputYearsProps) => {
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
  };

  const updateNextYears = () => {
    const nextYears = nextSelectYears(props.selectedYear, props.selectedMonth);

    props.setSelectedYear(Number(nextYears.selectedYear));
    props.setSelectedMonth(Number(nextYears.selectedMonth));
    setItemYear(Number(nextYears.selectedYear));
    setItemMonth(Number(nextYears.selectedMonth));
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
  };

  const onClickNowYears = () => {
    props.setSelectedYear(year);
    props.setSelectedMonth(month);
    setOpenSelectYears(false);
  };

  return (
    <>
      {!openSelectYears ? (
        <div className={styles.skipDateBtn}>
          <button
            className={cn(styles.prevBtn, props.btnClassName)}
            onClick={() => updatePrevYears()}
          >
            <ArrowLeftIcon />
          </button>
          <button
            className={cn(styles.jumpYears, props.btnClassName)}
            onClick={() => setOpenSelectYears(true)}
          >
            {props.selectedYear} 年 {props.selectedMonth} 月
            <span className={styles.jumpYearsIcon}>
              <ExpandMoreIcon />
            </span>
          </button>
          <button
            className={cn(styles.nextBtn, props.btnClassName)}
            onClick={() => updateNextYears()}
          >
            <ArrowRightIcon />
          </button>
        </div>
      ) : (
        <div className={cn(styles.wrapper, props.selectWrapperClassName)}>
          <button className={styles.closeBtn} onClick={() => setOpenSelectYears(false)}>
            <CloseIcon />
          </button>
          <form className={styles.selectPosition}>
            <select
              defaultValue={props.selectedYear}
              className={styles.select}
              onChange={changeItemYear}
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
              className={styles.select}
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
          <button className={styles.displayBtn} onClick={() => onClickDisplayYears()}>
            表示
          </button>
        </div>
      )}

      {(props.selectedYear !== year || props.selectedMonth !== month) && !openSelectYears && (
        <button className={styles.nowBtn} onClick={() => onClickNowYears()}>
          現在
        </button>
      )}
    </>
  );
};
export default InputYears;
