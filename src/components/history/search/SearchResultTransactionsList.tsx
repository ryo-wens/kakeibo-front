import React from 'react';
import { TransactionsList } from '../../../reducks/transactions/types';
import EditTransactionModalContainer from '../../../containers/home/modal/EditTransactionModalContainer';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import '../../../templates/history/daily/daily-history.scss';

interface SearchResultTransactionsListProps {
  open: boolean;
  openId: number | undefined;
  searchResults: boolean;
  searchTransaction: TransactionsList;
  closeModal: () => void;
  openModal: (transactionId: number) => void;
  submit: boolean;
  searchRequestData: {
    transaction_type: string | null;
    start_date: Date | null;
    end_date: Date | null;
    low_amount: string | null;
    high_amount: string | null;
    memo: string | null;
    shop: string | null;
    sort: string | null;
    sort_type: string | null;
    big_category_id: number | null;
    limit: string | null;
  };
}
const SearchResultTransactionsList = (props: SearchResultTransactionsListProps) => {
  return props.searchResults ? (
    <div className="daily-history__message">検索ワードに一致する履歴はありませんでした。</div>
  ) : (
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
        {props.searchTransaction.map((transaction) => {
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
                  submitSearch={props.submit}
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
                  searchRequestData={props.searchRequestData}
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
  );
};
export default SearchResultTransactionsList;
