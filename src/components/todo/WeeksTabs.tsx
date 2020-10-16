import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { getWeekStartDate } from '../../lib/date';

const useStyles = makeStyles({
  list: {
    width: '700px',
    display: 'flex',
  },
  listItem: {
    display: 'block',
    textAlign: 'center',
    borderBottom: 'solid 1px #999',
  },
  selectedListItem: {
    borderBottom: 'solid 2px #aaaccc',
  },
});

interface weeksTabsProps {
  selectedDate: Date | null;
}

const WeeksTabs = (props: weeksTabsProps) => {
  const classes = useStyles();
  const dt: Date = props.selectedDate !== null ? props.selectedDate : new Date();
  const selectedDate = new Date(dt);
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  const week = useMemo(() => {
    const _week = [];
    for (let i = 0; i < 7; i++) {
      const startDate = getWeekStartDate(selectedDate);
      const date = new Date(startDate.setDate(startDate.getDate() + i));

      _week.push(
        <ListItem button className={classes.listItem} key={i}>
          <ListItemText secondary={weekdays[i]} />
          <ListItemText primary={date.getDate()} />
        </ListItem>
      );
    }
    return _week;
  }, [selectedDate]);

  return <List className={classes.list}>{week}</List>;
};

export default WeeksTabs;
