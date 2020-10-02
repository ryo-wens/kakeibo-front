import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MonthlyHistory from '../components/home/MonthlyHistory';

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
  })
);

const WeeklyHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <div className={classes.root}>
        <ButtonGroup
          className={classes.topButton}
          size="large"
          aria-label="small outlined button group"
        >
          <Button className={classes.topButton}>日ごと</Button>
          <Button className={classes.topButton} onClick={() => dispatch(push('/history-week'))}>
            週ごと
          </Button>
          <Button className={classes.topButton}>月ごと</Button>
        </ButtonGroup>
      </div>
      <div className={classes.tableSize}>
        <MonthlyHistory />
      </div>
    </>
  );
};
export default WeeklyHistory;
