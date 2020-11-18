import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { getStandardBudgets } from '../reducks/budgets/selectors';
import { fetchStandardBudgets, editStandardBudgets } from '../reducks/budgets/operations';
import { StandardBudgetsList } from '../reducks/budgets/types';
import { State } from '../reducks/store/types';
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
import TextField from '@material-ui/core/TextField';
import GenericButton from '../components/uikit/GenericButton';
import { getPathTemplateName, getPathGroupId } from '../lib/path';
import GroupStandardBudgets from '../components/budget/GroupStandardBudgets';

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
    centerPosition: {
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

const StandardBudgets = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const standardBudgets = getStandardBudgets(selector);
  const [budgets, setBudgets] = useState<StandardBudgetsList>([]);
  const [updateMessage, setUpdateMessage] = useState<boolean>(false);
  const pathName = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);
  const unEditBudgets = budgets === standardBudgets;

  useEffect(() => {
    if (!standardBudgets.length && pathName !== 'group') {
      dispatch(fetchStandardBudgets());
    }
  }, []);

  useEffect(() => {
    setBudgets(standardBudgets);
  }, [standardBudgets]);

  return (
    <div className={classes.root}>
      <ButtonGroup className={classes.buttonGroupPosition} size="large" aria-label="budgets-kind">
        <Button
          className={classes.buttonSize}
          onClick={() => {
            {
              pathName !== 'group'
                ? dispatch(push('/standard/budgets'))
                : dispatch(push(`/group/${groupId}/standard/budgets`));
            }
          }}
        >
          標準予算
        </Button>
        <Button
          className={classes.buttonSize}
          onClick={() => {
            pathName !== 'group'
              ? dispatch(push('/yearly/budgets'))
              : dispatch(push(`/group/${groupId}/yearly/budgets`));
          }}
        >
          月別カスタム予算
        </Button>
      </ButtonGroup>
      <h2 className={classes.centerPosition}>{updateMessage ? '標準予算を更新しました' : null}</h2>
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
                    {budgets.map((budget, index) => {
                      const onChangeBudget = (event: { target: { value: string } }) => {
                        const newBudgets = [...budgets];
                        newBudgets[index].budget = (event.target.value as unknown) as number;
                        setBudgets(newBudgets);
                      };
                      return (
                        <TableRow key={budget.big_category_id}>
                          <TableCell className={classes.tableSize} component="th" scope="row">
                            {budget.big_category_name}
                          </TableCell>
                          <TableCell className={classes.tableSize}>￥10,000</TableCell>
                          <TableCell className={classes.tableSize} align="center">
                            <TextField
                              size={'small'}
                              id={'budgets'}
                              variant="outlined"
                              type={'number'}
                              value={budget.budget}
                              onChange={onChangeBudget}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className={classes.centerPosition}>
                <GenericButton
                  label={'更新する'}
                  disabled={unEditBudgets}
                  onClick={() => {
                    dispatch(
                      editStandardBudgets(
                        budgets.map((budget) => {
                          let { big_category_name, ...rest } = budget; // eslint-disable-line
                          rest = {
                            big_category_id: rest.big_category_id,
                            budget: Number(rest.budget),
                          };
                          return rest;
                        })
                      )
                    ) && setUpdateMessage(true);
                  }}
                />
              </div>
            </>
          );
        } else {
          return <GroupStandardBudgets />;
        }
      })()}
    </div>
  );
};
export default StandardBudgets;
