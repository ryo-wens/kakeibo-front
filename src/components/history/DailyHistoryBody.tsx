import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../reducks/store/types';
import { TransactionsList } from '../../reducks/transactions/types';
import EditTransactionModal from '../../components/uikit/EditTransactionModal';
import { fetchCategories } from '../../reducks/categories/operations';
import { getIncomeCategories, getExpenseCategories } from '../../reducks/categories/selectors';
import { getPathTemplateName } from '../../lib/path';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import '../../assets/history/daily-history.scss';

interface DailyHistoryBodyProps {
  transactionsList: TransactionsList;
  searchTransactionsList: TransactionsList;
  selectYears: number;
  selectMonth: number;
}
const DailyHistoryBody = (props: DailyHistoryBodyProps) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const incomeCategories = getIncomeCategories(selector);
  const expenseCategories = getExpenseCategories(selector);
  const pathName = getPathTemplateName(window.location.pathname);
  const [open, setOpen] = useState<boolean>(false);
  const [openId, setOpnId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (pathName !== 'group' && !incomeCategories.length && !expenseCategories.length)
      dispatch(fetchCategories());
  }, [pathName]);

  const handleOpen = (transactionId: number) => {
    setOpen(true);
    setOpnId(transactionId);
  };

  const handleClose = () => {
    setOpen(false);
    setOpnId(undefined);
  };

  return (
    <>
      <table className="daily-history">
        <tbody>
          <tr>
            <td className="daily-history__th" align="center">
              編集
            </td>
            <td className="daily-history__th" align="center">
              日付
            </td>
            <td className="daily-history__th" align="center">
              カテゴリ
            </td>
            <td className="daily-history__th" align="center">
              金額
            </td>
            <td className="daily-history__th" align="center">
              お店
            </td>
            <td className="daily-history__th" align="center">
              メモ
            </td>
          </tr>
          {(() => {
            if (!props.searchTransactionsList.length) {
              return props.transactionsList.map((transaction) => {
                const {
                  id,
                  transaction_type,
                  transaction_date,
                  medium_category_name,
                  custom_category_name,
                  amount,
                  shop,
                  memo,
                } = transaction;

                const categoryName = {
                  mediumCategory: medium_category_name !== null ? medium_category_name : '',
                  customCategory: custom_category_name !== null ? custom_category_name : '',
                };

                return (
                  <tr key={id} className="daily-history__tr">
                    <td className="daily-history__td" align="center">
                      <IconButton onClick={() => handleOpen(id)}>
                        <CreateIcon color="primary" />
                      </IconButton>
                      <EditTransactionModal
                        id={id}
                        onClose={handleClose}
                        open={openId === id && open}
                        amount={amount}
                        memo={memo !== null ? memo : ''}
                        shop={shop !== null ? shop : ''}
                        categoryName={categoryName}
                        transactionDate={transaction_date}
                        transactionsType={transaction_type}
                      />
                    </td>
                    <td className="daily-history__td" align="center">
                      {transaction_date}
                    </td>
                    <td className="daily-history__td" align="center">
                      {medium_category_name || custom_category_name}
                    </td>
                    <td className="daily-history__td" align="center">
                      {amount}
                    </td>
                    <td className="daily-history__td" align="center">
                      {shop}
                    </td>
                    <td className="daily-history__td" align="center">
                      {memo}
                    </td>
                  </tr>
                );
              });
            } else {
              return props.searchTransactionsList.map((searchTransaction) => {
                const {
                  id,
                  transaction_type,
                  transaction_date,
                  medium_category_name,
                  custom_category_name,
                  amount,
                  shop,
                  memo,
                } = searchTransaction;

                const categoryName = {
                  mediumCategory: medium_category_name !== null ? medium_category_name : '',
                  customCategory: custom_category_name !== null ? custom_category_name : '',
                };

                return (
                  <tr key={id} className="daily-history__tr">
                    <td className="daily-history__td" align="center">
                      <IconButton onClick={() => handleOpen(id)}>
                        <CreateIcon color="primary" />
                      </IconButton>
                      <EditTransactionModal
                        id={id}
                        onClose={handleClose}
                        open={openId === id && open}
                        amount={amount}
                        memo={memo !== null ? memo : ''}
                        shop={shop !== null ? shop : ''}
                        categoryName={categoryName}
                        transactionDate={transaction_date}
                        transactionsType={transaction_type}
                      />
                    </td>
                    <td className="daily-history__td" align="center">
                      {transaction_date}
                    </td>
                    <td className="daily-history__td" align="center">
                      {medium_category_name || custom_category_name}
                    </td>
                    <td className="daily-history__td" align="center">
                      {amount}
                    </td>
                    <td className="daily-history__td" align="center">
                      {shop}
                    </td>
                    <td className="daily-history__td" align="center">
                      {memo}
                    </td>
                  </tr>
                );
              });
            }
          })()}
        </tbody>
      </table>
    </>
  );
};
export default DailyHistoryBody;
