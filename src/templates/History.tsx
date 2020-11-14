import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { getPathTemplateName, getPathGroupId } from '../lib/path';
import { year } from '../lib/constant';
import { DailyHistory } from './index';
import { MonthlyHistory, GroupMonthlyHistory } from '../components/home';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import '../assets/history/history.scss';

const History = () => {
  const dispatch = useDispatch();
  const path = window.location.pathname;
  const pathName = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);
  const [selectYears, setSelectYears] = useState<number>(year);

  const handleDateChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setSelectYears(event.target.value as number);
    },
    [setSelectYears]
  );

  return (
    <>
      <div className="history__position">
        <ButtonGroup
          className="history__top-button"
          size="large"
          aria-label="small outlined button group"
        >
          <Button
            className="history__top-button"
            onClick={() => {
              if (pathName !== 'group') {
                dispatch(push('/daily/history'));
              } else {
                dispatch(push(`/group/${groupId}/daily/history`));
              }
            }}
          >
            日ごと
          </Button>
          <Button
            className="history__top-button"
            onClick={() => {
              if (pathName !== 'group') {
                dispatch(push('/weekly/history'));
              } else {
                dispatch(push(`/group/${groupId}/weekly/history`));
              }
            }}
          >
            週ごと
          </Button>
          <Button className="history__top-button">月ごと</Button>
        </ButtonGroup>
        <div className="history__spacer" />
        <FormControl variant="outlined" className="history__selector">
          <InputLabel id="years">年</InputLabel>
          <Select
            id="years"
            labelId="yearsList"
            value={selectYears}
            onChange={handleDateChange}
            label="年"
          >
            <MenuItem value={selectYears + 1}>{selectYears + 1}</MenuItem>
            <MenuItem value={selectYears}>{selectYears}</MenuItem>
            <MenuItem value={selectYears - 1}>{selectYears - 1}</MenuItem>
          </Select>
        </FormControl>
      </div>
      {(() => {
        if (path === '/daily/history' || path === `/group/${groupId}/daily/history`) {
          return (
            <div className="history__table-size">
              <DailyHistory selectYears={selectYears} />
            </div>
          );
        } else if (path === '/weekly/history') {
          return (
            <div className="history__table-size">
              <MonthlyHistory />
            </div>
          );
        } else if (`/group/${groupId}/weekly/history`) {
          return (
            <div className="history__table-size">
              <GroupMonthlyHistory />
            </div>
          );
        }
      })()}
    </>
  );
};
export default History;
