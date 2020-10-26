import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { getFirstDayOfMonth, getLastDayOfMonth, getWeekDay } from '../../lib/date';

const useStyles = makeStyles({
  list: {
    display: 'flex',
    width: '1700px',
    height: '70px',
  },
  listItem: {
    display: 'block',
    height: '70px',

    textAlign: 'center',
    borderBottom: 'solid 1px #999',
  },
  selectedListItem: {
    borderBottom: 'solid 2px #aaaccc',
  },
});

interface MonthTablesProps {
  selectedDate: Date | null;
}

const MonthTables = (props: MonthTablesProps) => {
  const classes = useStyles();
  const dt: Date = props.selectedDate !== null ? props.selectedDate : new Date();
  const selectedDate = new Date(dt);
  const lastDayOfMonth = getLastDayOfMonth(selectedDate);

  const week = useMemo(() => {
    const _week = [];
    for (let i = 0; i < lastDayOfMonth.getDate(); i++) {
      const firstDayOfMonth = getFirstDayOfMonth(selectedDate);
      const date = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() + i));

      _week.push(
        <ListItem button className={classes.listItem} key={i}>
          <ListItemText secondary={getWeekDay(date)} />
          <ListItemText primary={date.getDate()} />
        </ListItem>
      );
    }
    return _week;
  }, [selectedDate]);

  return <List className={classes.list}>{week}</List>;
};

export default MonthTables;
