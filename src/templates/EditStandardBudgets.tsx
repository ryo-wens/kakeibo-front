import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStandardBudgets,
  addCustomBudgets,
  copyStandardBudgets,
} from '../reducks/budgets/operations';
import { State } from '../reducks/store/types';
import { CustomBudgetsList } from '../reducks/budgets/types';
import { getCustomBudgets } from '../reducks/budgets/selectors';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { push } from 'connected-react-router';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import GenericButton from '../components/uikit/GenericButton';
import {
  getPathTemplateName,
  getPathGroupId,
  getGroupPathYear,
  getGroupPathMonth,
  getPathYear,
  getPathMonth,
} from '../lib/path';
import EditGroupStandardBudgets from '../components/budget/EditGroupStandardBudgets';
import { fetchGroups } from '../reducks/groups/operations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0 auto',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    tablePosition: {
      margin: '0 auto',
      marginTop: 40,
      alignItems: 'center',
      tableLayout: 'fixed',
      width: '100%',
    },
    tableSize: {
      width: 250,
      textAlign: 'center',
    },
    buttonSize: {
      width: 360,
      marginTop: 40,
      backgroundColor: '#fff',
      margin: '0 auto',
    },
    buttonGroupPosition: {
      margin: '0 auto',
      marginLeft: '7%',
    },
    updateButton: {
      textAlign: 'center',
    },
    tableTop: {
      backgroundColor: '#4db5fa',
    },
    tableMain: {
      border: 'solid 1px #e1e3e3',
    },
  })
);

const EditStandardBudgets = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectYear = getPathYear(window.location.pathname);
  const selectMonth = getPathMonth(window.location.pathname);
  const pathName = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);
  const yearInGroup = getGroupPathYear(window.location.pathname);
  const monthInGroup = getGroupPathMonth(window.location.pathname);
  const selector = useSelector((state: State) => state);
  const customBudgetsList = getCustomBudgets(selector);
  const [customBudgets, setCustomBudgets] = useState<CustomBudgetsList>([]);
  const yearsInPersonal = `${selectYear}年${selectMonth}月`;
  const yearsInGroup = `${yearInGroup}年${monthInGroup}月`;
  const unInputBudgets = customBudgets === customBudgetsList;

  useEffect(() => {
    if (pathName !== 'group') {
      dispatch(fetchGroups());
      const interval = setInterval(() => {
        dispatch(fetchGroups());
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [pathName]);

  useEffect(() => {
    async function fetch() {
      if (pathName !== 'group') {
        await dispatch(fetchStandardBudgets());
        dispatch(copyStandardBudgets());
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    setCustomBudgets(customBudgetsList);
  }, [customBudgetsList]);

  return (
    <div className={classes.root}>
      <ButtonGroup className={classes.buttonGroupPosition} size="large" aria-label="budgets-kind">
        <Button
          className={classes.buttonSize}
          onClick={() => {
            if (pathName !== 'group') {
              dispatch(push('/standard/budgets'));
            } else {
              dispatch(push(`/group/${groupId}/standard/budgets`));
            }
          }}
        >
          標準
        </Button>
        <Button
          className={classes.buttonSize}
          onClick={() => {
            if (pathName !== 'group') {
              dispatch(push('/yearly/budgets'));
            } else {
              dispatch(push(`/group/${groupId}/yearly/budgets`));
            }
          }}
        >
          月ごと
        </Button>
      </ButtonGroup>
      <h1>{pathName !== 'group' ? yearsInPersonal : yearsInGroup}</h1>
      {(() => {
        if (pathName !== 'group') {
          return (
            <>
              <TableContainer className={classes.tablePosition} component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableTop} align="center">
                        カテゴリー
                      </TableCell>
                      <TableCell className={classes.tableTop} align="center">
                        先月の支出
                      </TableCell>
                      <TableCell className={classes.tableTop} align="center">
                        予算
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customBudgets.map((customBudget, index) => {
                      const onChangeBudget = (event: { target: { value: string } }) => {
                        const newBudgets = [...customBudgets];
                        newBudgets[index].budget = (event.target.value as unknown) as number;
                        setCustomBudgets(newBudgets);
                      };
                      return (
                        <TableRow key={customBudget.big_category_id}>
                          <TableCell className={classes.tableSize} component="th" scope="row">
                            {customBudget.big_category_name}
                          </TableCell>
                          <TableCell className={classes.tableSize}>￥10,000</TableCell>
                          <TableCell className={classes.tableSize} align="center">
                            <TextField
                              size={'small'}
                              id={'budgets'}
                              variant="outlined"
                              type={'number'}
                              value={customBudget.budget}
                              onChange={onChangeBudget}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className={classes.updateButton}>
                <GenericButton
                  label={'更新する'}
                  disabled={unInputBudgets}
                  onClick={() =>
                    dispatch(
                      addCustomBudgets(
                        selectYear,
                        selectMonth,
                        customBudgets.map((budget) => {
                          let { big_category_name, ...rest } = budget; // eslint-disable-line
                          rest = {
                            big_category_id: rest.big_category_id,
                            budget: Number(rest.budget),
                          };
                          return rest;
                        })
                      )
                    ) && dispatch(push('/yearly/budgets'))
                  }
                />
              </div>
            </>
          );
        } else {
          return <EditGroupStandardBudgets />;
        }
      })()}
    </div>
  );
};

export default EditStandardBudgets;
