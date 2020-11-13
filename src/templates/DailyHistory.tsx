import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../reducks/transactions/selectors';
import { fetchTransactionsList } from '../reducks/transactions/operations';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import { State } from '../reducks/store/types';
import { year, customMonth } from '../lib/constant';
import { getPathTemplateName } from '../lib/path';
import { DailyHistoryBody } from '../components/history/index';
import '../assets/history/daily-history.scss';

const DailyHistory = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const transactionsList = getTransactions(selector);
  const pathName = getPathTemplateName(window.location.pathname);

  useEffect(() => {
    dispatch(fetchTransactionsList(String(year), customMonth));
  }, []);

  return (
    <div className="daily-history daily-history__background">
      <TableContainer component={Paper} className="daily-history">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="daily-history__th" align="center">
                集計
              </TableCell>
              <TableCell className="daily-history__th" align="center">
                日付
              </TableCell>
              <TableCell className="daily-history__th" align="center">
                カテゴリ
              </TableCell>
              <TableCell className="daily-history__th" align="center">
                金額
              </TableCell>
              <TableCell className="daily-history__th" align="center">
                お店
              </TableCell>
              <TableCell className="daily-history__th" align="center">
                メモ
              </TableCell>
              <TableCell className="daily-history__th" align="center">
                編集
              </TableCell>
            </TableRow>
          </TableHead>
          {pathName !== 'group' ? <DailyHistoryBody transactionsList={transactionsList} /> : {}}
        </Table>
      </TableContainer>
    </div>
  );
};
export default DailyHistory;
