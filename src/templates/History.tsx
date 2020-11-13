import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { getPathTemplateName, getPathGroupId } from '../lib/path';
import { year } from '../lib/constant';
import { DailyHistory } from './index';
import { MonthlyHistory, GroupMonthlyHistory } from '../components/home';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: '0 auto',
      marginTop: 50,
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    topButton: {
      backgroundColor: '#fff',
      width: 660,
    },
    tableSize: {
      margin: '0 auto',
      width: '80%',
    },
    formControl: {
      display: 'flex',
      margin: '0 auto',
      marginTop: 40,
      minWidth: 120,
      width: 660,
      backgroundColor: '#fff',
    },
  })
);

const History = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
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
      <div className={classes.root}>
        <ButtonGroup
          className={classes.topButton}
          size="large"
          aria-label="small outlined button group"
        >
          <Button
            className={classes.topButton}
            onClick={() => {
              if (pathName !== 'group') {
                dispatch(push('/daily/history'));
              }
            }}
          >
            日ごと
          </Button>
          <Button
            className={classes.topButton}
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
          <Button className={classes.topButton}>月ごと</Button>
        </ButtonGroup>
        <FormControl variant="outlined" className={classes.formControl}>
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
        if (path === '/daily/history') {
          return <DailyHistory />;
        } else if (path === '/weekly/history') {
          return (
            <div className={classes.tableSize}>
              <MonthlyHistory />
            </div>
          );
        } else if (`/group/${groupId}/weekly/history`) {
          return (
            <div className={classes.tableSize}>
              <GroupMonthlyHistory />
            </div>
          );
        }
      })()}
    </>
  );
};
export default History;
