import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { years, year } from '../../../lib/constant';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import styles from './SelectYears.module.scss';
import cn from 'classnames';

interface SelectYearsProps {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  skipYearsClassName: string;
}

const SelectYears = (props: SelectYearsProps) => {
  const history = useHistory();
  const searchLocation = useLocation().search;
  const queryParams = qs.parse(searchLocation);
  const { group_id } = useParams<{ group_id: string }>();
  const pathName = useLocation().pathname.split('/')[1];
  const [itemYear, setItemYear] = useState<number>(props.selectedYear);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const prevDisable = props.selectedYear === year - 3;
  const nextDisable = props.selectedYear >= year + 3;
  const budgetsPage = searchLocation === `?yearly&year=${props.selectedYear}`;

  const updatePrevYear = () => {
    const prevYear = props.selectedYear - 1;
    setItemYear(prevYear);
    props.setSelectedYear(prevYear);

    if (!budgetsPage) {
      const newPrevYearQuery = { ...queryParams, '?year': prevYear };

      history.push({ search: decodeURIComponent(qs.stringify(newPrevYearQuery)) });
    } else if (pathName === 'group') {
      history.push({ pathname: `/group/${group_id}/budgets`, search: `?yearly&year=${prevYear}` });
    } else {
      history.push({ pathname: '/budgets', search: `?yearly&year=${prevYear}` });
    }
  };

  const updateNextYear = () => {
    const nextYear = props.selectedYear + 1;
    setItemYear(nextYear);
    props.setSelectedYear(nextYear);

    if (!budgetsPage) {
      const newNextYearQuery = { ...queryParams, '?year': nextYear };

      history.push({
        search: decodeURIComponent(qs.stringify(newNextYearQuery)),
      });
    } else if (pathName === 'group') {
      history.push({ pathname: `/group/${group_id}/budgets`, search: `?yearly&year=${nextYear}` });
    } else {
      history.push({ pathname: '/budgets', search: `?yearly&year=${nextYear}` });
    }
  };

  const changeItemYear = (event: React.ChangeEvent<{ value: unknown }>) => {
    setItemYear(Number(event.target.value));
  };

  const onClickChangeYear = () => {
    if (!budgetsPage) {
      const newNextYearQuery = { ...queryParams, '?year': itemYear };

      history.push({
        search: decodeURIComponent(qs.stringify(newNextYearQuery)),
      });
    } else if (pathName === 'group') {
      history.push({ pathname: `/group/${group_id}/budgets`, search: `?yearly&year=${itemYear}` });
    } else {
      history.push({ pathname: '/budgets', search: `?yearly&year=${itemYear}` });
    }
    props.setSelectedYear(itemYear);
    setSelectOpen(false);
  };

  return (
    <>
      <div className={cn(styles.skipYearsBtn, props.skipYearsClassName)}>
        <button className={styles.prevBtn} onClick={() => updatePrevYear()} disabled={prevDisable}>
          <ArrowLeftIcon />
        </button>
        <button className={styles.jumpYears} onClick={() => setSelectOpen(true)}>
          {props.selectedYear}年
          <span className={styles.jumpYearsIcon}>
            <ExpandMoreIcon />
          </span>
        </button>
        <button className={styles.nextBtn} onClick={() => updateNextYear()} disabled={nextDisable}>
          <ArrowRightIcon />
        </button>
      </div>

      {props.selectedYear !== year && (
        <button
          className={styles.displayThisYearBtn}
          onClick={() => {
            setItemYear(year);
            props.setSelectedYear(year);

            if (!budgetsPage) {
              const currentYearQuery = { ...queryParams, '?year': year };

              history.push({ search: decodeURIComponent(qs.stringify(currentYearQuery)) });
            } else if (pathName === 'group') {
              history.push({
                pathname: `/group/${group_id}/budgets`,
                search: `?yearly&year=${year}`,
              });
            } else {
              history.push({ pathname: '/budgets', search: `?yearly&year=${year}` });
            }
          }}
        >
          今年を表示
        </button>
      )}

      {selectOpen && (
        <div className={styles.selectWrapper}>
          <button className={styles.closeBtn} onClick={() => setSelectOpen(false)}>
            <CloseIcon />
          </button>
          <form>
            <select className={styles.selector} defaultValue={itemYear} onChange={changeItemYear}>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </form>
          <button className={styles.displayBtn} onClick={() => onClickChangeYear()}>
            表示
          </button>
        </div>
      )}
    </>
  );
};
export default SelectYears;
