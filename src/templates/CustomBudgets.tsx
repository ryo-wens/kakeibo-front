import React, { ReactElement, useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainPosition: {
      margin: '0 auto',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    buttonPosition: {
      margin: '0 auto',
      marginLeft: '24.5%',
    },
    buttonSize: {
      width: 360,
      marginTop: 40,
      backgroundColor: '#fff',
    },
    tableSize: {
      width: 250,
      textAlign: 'center',
    },
    tablePosition: {
      margin: '0 auto',
      marginTop: 40,
      alignItems: 'center',
      tableLayout: 'fixed',
      width: '100%',
    },
    tableTop: {
      backgroundColor: '#4db5fa',
      width: 250,
    },
    formControl: {
      display: 'flex',
      margin: '0 auto',
      marginTop: 40,
      minWidth: 120,
      width: 720,
      backgroundColor: '#fff',
    },
    muiListItemRoot: {
      backgroundColor: '#fff',
    },
  })
);

const CustomBudgets = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const date = new Date();
  const [years, setYears] = useState<number>(date.getFullYear());

  const handleDateChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setYears(event.target.value as number);
    },
    [setYears]
  );

  const month = date.getMonth() + 1;
  const startDate = new Date(years, month - 1, 1);
  const startDayCount = startDate.getDate();
  type Day = { date: number };
  type Year = Array<Day>;

  const periodColumn = useMemo(() => {
    const yearly: Year = [];

    for (let i = 0; i < 12; i++) {
      yearly.push({ date: i + 1 });
    }
    return yearly;
  }, [date]);

  const customBudgetsTable = useMemo(() => {
    let budgetsDataList: ReactElement<Year>[] = [];
    periodColumn.map((period, index) => {
      const lastDate = new Date(years, period.date, 0).getDate();
      budgetsDataList = [
        ...budgetsDataList,
        <TableRow key={index}>
          <TableCell className={classes.tableSize} component="th" scope="row">
            {period.date}月
          </TableCell>
          <TableCell className={classes.tableSize}>標準</TableCell>
          <TableCell className={classes.tableSize} align="center">
            {years}-{String('0' + period.date).slice(-2)}-{'0' + startDayCount} 〜 {years}-
            {String('0' + period.date).slice(-2)}-{lastDate}
          </TableCell>
          <TableCell className={classes.tableSize} align="center">
            ￥180,000
          </TableCell>
          <TableCell className={classes.tableSize} align="center">
            <IconButton
              size={'small'}
              onClick={() => dispatch(push(`/custom-budgets/${years}${period.date}`))}
            >
              <CreateIcon color={'primary'} />
            </IconButton>
          </TableCell>
        </TableRow>,
      ];
    });
    return budgetsDataList;
  }, [date]);

  return (
    <div className={classes.mainPosition}>
      <ButtonGroup className={classes.buttonPosition} size="large" aria-label="budgets-kind">
        <Button className={classes.buttonSize} onClick={() => dispatch(push('/standard-budgets'))}>
          標準
        </Button>
        <Button className={classes.buttonSize} onClick={() => dispatch(push('/custom-budgets'))}>
          月ごと
        </Button>
      </ButtonGroup>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="years">年</InputLabel>
        <Select id="years" labelId="yearsList" value={years} onChange={handleDateChange} label="年">
          <MenuItem value={years + 1}>{years + 1}</MenuItem>
          <MenuItem value={years}>{years}</MenuItem>
          <MenuItem value={years - 1}>{years - 1}</MenuItem>
        </Select>
      </FormControl>
      <TableContainer className={classes.tablePosition} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableTop} align="center">
                月
              </TableCell>
              <TableCell className={classes.tableTop} align="center">
                予算の種類
              </TableCell>
              <TableCell className={classes.tableTop} align="center">
                期間
              </TableCell>
              <TableCell className={classes.tableTop} align="center">
                1ヶ月の予算
              </TableCell>
              <TableCell className={classes.tableTop} align="center">
                操作
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{customBudgetsTable}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default CustomBudgets;
