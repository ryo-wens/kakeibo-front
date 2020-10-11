import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import CustomBudgetsRow from '../components/budget/CustomBudgetsRow';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { State } from '../reducks/store/types';

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
  const selector = useSelector((state: State) => state);
  const totalBudge = selector.budgets.yearly_budgets_list.yearly_total_budget;
  const [years, setYears] = useState<number>(date.getFullYear());

  const handleDateChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setYears(event.target.value as number);
    },
    [setYears]
  );

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
      <h1>総額 ¥ {totalBudge}</h1>
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
          <TableBody>
            <CustomBudgetsRow years={years} />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default CustomBudgets;
