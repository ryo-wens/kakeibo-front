import React, { ReactElement, useMemo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      paddingLeft: 10,
    },
    tableTop: {
      backgroundColor: '#4db5fa',
    },
    tableCell: {
      border: 'solid 1px #e1e3e3',
    },
    tableMain: {
      minHeight: 300,
      border: 'solid 1px #e1e3e3',
    },
    text: {
      fontSize: 16,
      fontWeight: 700,
      border: 'solid 1px #e1e3e3',
    },
    totalDisplay: {
      textAlign: 'right',
      fontSize: 16,
      fontWeight: 700,
    },
    iconPosition: {
      textAlign: 'center',
    },
  })
);

const MonthlyHistory = () => {
  const classes = useStyles();

  type Day = { date: string };
  type Week = Array<Day>;
  type Weeks = Array<Week>;

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const displayWeeks = useMemo(() => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const endDayCount = endDate.getDate();
    let currentDayOfWeek = startDate.getDay();
    let week: Week = [];
    const prevWeeks: Weeks = [];

    for (let i = 1; i <= endDayCount; i++) {
      week.push({
        date: i + '日',
      });
      if (currentDayOfWeek === 6) {
        prevWeeks.push(week);
        week = [];
        currentDayOfWeek = 0;
      } else if (i === endDayCount) {
        prevWeeks.push(week);
      } else {
        currentDayOfWeek++;
      }
    }
    return prevWeeks;
  }, [date]);

  const rows = useMemo(() => {
    let headerRow: ReactElement[] = [];
    let historyRow: ReactElement[] = [];
    let operationRow: ReactElement[] = [];
    let totalAmountRow: ReactElement[] = [];
    let weekNum = 1;

    displayWeeks.map((displayWeek, index) => {
      headerRow = [
        ...headerRow,
        <TableCell key={index} className={classes.tableCell} align="center">
          {weekNum++}週目
          <br />
          {month + '月' + displayWeek[0].date}~{displayWeek[displayWeek.length - 1].date}
        </TableCell>,
      ];

      historyRow = [
        ...historyRow,
        <TableCell className={classes.tableCell} key={index}></TableCell>,
      ];

      operationRow = [
        ...operationRow,
        <TableCell className={classes.tableCell} key={index} align={'center'}>
          <IconButton color="primary" size={'small'} onClick={() => alert('テスト')}>
            <CreateIcon className={classes.iconPosition} />
          </IconButton>
        </TableCell>,
      ];

      totalAmountRow = [
        ...totalAmountRow,
        <TableCell key={index} className={classes.text}>
          小計
        </TableCell>,
      ];
    });
    return {
      headerRow: headerRow,
      historyRow: historyRow,
      operationRow: operationRow,
      totalAmountRow: totalAmountRow,
    };
  }, [displayWeeks]);

  return (
    <div className="box__monthlyExpense">
      <h2 className={classes.title}>{month}月の支出</h2>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className={classes.tableTop}>
            <TableRow>{rows.headerRow}</TableRow>
          </TableHead>
          <TableBody className={classes.tableMain}>
            <TableRow>{rows.historyRow}</TableRow>
            <TableRow>{rows.operationRow}</TableRow>
            <TableRow>{rows.totalAmountRow}</TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.totalDisplay}>合計：</div>
    </div>
  );
};

export default MonthlyHistory;
