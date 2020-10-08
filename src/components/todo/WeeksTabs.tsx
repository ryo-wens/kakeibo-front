import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';

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
  const replicatedSelectedDate = new Date(selectedDate);

  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const selectedWeekDay = selectedDate.getDay();
  const startDate = new Date(
    replicatedSelectedDate.setDate(replicatedSelectedDate.getDate() - selectedWeekDay)
  );

  const week = useMemo(() => {
    const _week = [];
    for (let i = 0; i < 7; i++) {
      const _startDate = new Date(startDate);
      const date = new Date(_startDate.setDate(_startDate.getDate() + i));

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
