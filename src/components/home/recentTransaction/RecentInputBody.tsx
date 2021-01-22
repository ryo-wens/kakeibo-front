import React from 'react';
import { TransactionsList } from '../../../reducks/transactions/types';
import EditTransactionModalContainer from '../../../containers/home/modal/EditTransactionModalContainer';
import { bigCategoryColor } from '../../../lib/function';
import '../../../assets/home/recent-input.scss';

interface RecentInputBodyProps {
  open: boolean;
  openId: number | undefined;
  latestTransactionsList: TransactionsList;
  openModal: (transactionId: number) => void;
  closeModal: () => void;
}

const RecentInputBody = (props: RecentInputBodyProps) => {
  const latestTransaction = () => {
    return props.latestTransactionsList.map((transaction, index) => {
      const categoryName = {
        bigCategory: transaction.big_category_name,
        mediumCategory:
          transaction.medium_category_name !== null ? transaction.medium_category_name : '',
        customCategory:
          transaction.custom_category_name !== null ? transaction.custom_category_name : '',
      };

      return (
        <div key={index}>
          <dl className="recent-input__recent-box" onClick={() => props.openModal(transaction.id)}>
            <dt className="recent-input__recent-text">{transaction.transaction_date}</dt>
            <dt className="recent-input__recent-text">
              <span
                style={bigCategoryColor(transaction.big_category_name)}
                className="recent-input__category-icon"
              />
              {transaction.medium_category_name || transaction.custom_category_name}
            </dt>
            <dt className="recent-input__recent-text">￥ {transaction.amount.toLocaleString()}</dt>
            <dt>
              <span className="recent-input__item-font">店名: </span>{' '}
              {transaction.shop !== null ? transaction.shop : '-'}
            </dt>
            <dt>
              <span className="recent-input__item-font">メモ: </span>
              {transaction.memo !== null ? transaction.memo : '-'}
            </dt>
          </dl>
          <EditTransactionModalContainer
            key={index}
            amount={transaction.amount}
            categoryName={categoryName}
            id={transaction.id}
            memo={transaction.memo !== null ? transaction.memo : ''}
            shop={transaction.shop !== null ? transaction.shop : ''}
            open={props.openId === transaction.id && props.open}
            onClose={props.closeModal}
            transactionDate={transaction.transaction_date}
            transactionsType={transaction.transaction_type}
            bigCategoryId={transaction.big_category_id}
            mediumCategoryId={transaction.medium_category_id}
            customCategoryId={transaction.custom_category_id}
          />
        </div>
      );
    });
  };
  return <>{latestTransaction()}</>;
};

export default RecentInputBody;
