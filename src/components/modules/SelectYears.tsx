import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { years, year } from '../../lib/constant';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import '../../assets/modules/select-years.scss';

interface SelectYearsProps {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
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
    props.setSelectedYear(itemYear);
    setSelectOpen(false);
  };

  return (
    <>
      <button
        className="select-month__skip-btn select-month__skip-btn--prev"
        onClick={() => updatePrevYear()}
        disabled={prevDisable}
      >
        <ArrowLeftIcon />
      </button>
      <button
        className="select-years__selector select-years__selector--main select-years__selector__year-btn"
        onClick={() => setSelectOpen(true)}
      >
        {props.selectedYear}年
        <ExpandMoreIcon className="select-years__icon" />
      </button>
      <button
        className="select-month__skip-btn select-month__skip-btn--next"
        onClick={() => updateNextYear()}
        disabled={nextDisable}
      >
        <ArrowRightIcon />
      </button>
      <div className="select-years__spacer select-years__spacer--small" />

      {props.selectedYear !== year && (
        <button
          className="select-years__display-btn select-years__display-btn--small"
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
        <div className="select-years__selector-position">
          <div className="select-years__select-box">
            <button className="select-years__close-btn" onClick={() => setSelectOpen(false)}>
              <CloseIcon />
            </button>
            <form>
              <select
                className="select-years__selector select-years__selector-sub"
                defaultValue={itemYear}
                onChange={changeItemYear}
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </form>
            <div className="select-years__spacer select-years__spacer--small" />
            <button className="select-years__display-btn" onClick={() => onClickChangeYear()}>
              表示
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default SelectYears;
