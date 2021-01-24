import React from 'react';
import { TransactionsList } from '../../reducks/transactions/types';
import EditTransactionModalContainer from '../../containers/home/modal/EditTransactionModalContainer';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import '../../templates/history/daily/daily-history.scss';

interface DailyHistoryBodyProps {
  open: boolean;
  openId: number | undefined;
  transactionsList: TransactionsList;
  searchTransactionsList: TransactionsList;
  openModal: (transactionId: number) => void;
  closeModal: () => void;
}
const DailyHistoryBody = (props: DailyHistoryBodyProps) => {
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
          {props.transactionsList.map((transaction) => {
            const categoryName = {
              bigCategory: transaction.big_category_name,
              mediumCategory:
                transaction.medium_category_name !== null ? transaction.medium_category_name : '',
              customCategory:
                transaction.custom_category_name !== null ? transaction.custom_category_name : '',
            };

            return (
              <tr key={transaction.id} className="daily-history__tr">
                <td className="daily-history__td" align="center">
                  <IconButton onClick={() => props.openModal(transaction.id)}>
                    <CreateIcon color="primary" />
                  </IconButton>
                  <EditTransactionModalContainer
                    id={transaction.id}
                    onClose={props.closeModal}
                    open={props.openId === transaction.id && props.open}
                    amount={transaction.amount}
                    memo={transaction.memo !== null ? transaction.memo : ''}
                    shop={transaction.shop !== null ? transaction.shop : ''}
                    categoryName={categoryName}
                    transactionDate={transaction.transaction_date}
                    transactionsType={transaction.transaction_type}
                    bigCategoryId={transaction.big_category_id}
                    mediumCategoryId={transaction.medium_category_id}
                    customCategoryId={transaction.custom_category_id}
                  />
                </td>
                <td className="daily-history__td" align="center">
                  {transaction.transaction_date}
                </td>
                <td className="daily-history__td" align="center">
                  {transaction.medium_category_name || transaction.custom_category_name}
                </td>
                <td className="daily-history__td" align="center">
                  {transaction.amount}
                </td>
                <td className="daily-history__td" align="center">
                  {transaction.shop}
                </td>
                <td className="daily-history__td" align="center">
                  {transaction.memo}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default DailyHistoryBody;
