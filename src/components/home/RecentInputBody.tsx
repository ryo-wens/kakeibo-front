import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../reducks/store/types';
import { getLatestTransactions } from '../../reducks/transactions/selectors';
import { InputModal } from '../uikit';
import '../../assets/recent-input.scss';

const RecentInputBody = () => {
  const selector = useSelector((state: State) => state);
  const latestTransactionsList = getLatestTransactions(selector);
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>(undefined);

  const handleOpen = (transactionId: number) => {
    setOpen(true);
    setId(transactionId);
  };

  const handleClose = () => {
    setOpen(false);
    setId(undefined);
  };

  const latestTransaction = () => {
    return latestTransactionsList.map((transaction, index) => {
      const categoryName = {
        mediumCategory:
          transaction.medium_category_name !== null ? transaction.medium_category_name : '',
        customCategory:
          transaction.custom_category_name !== null ? transaction.custom_category_name : '',
      };

      return (
        <div key={index}>
          <dl
            className="recent-input__recent_delimiterLine"
            onClick={() => handleOpen(transaction.id)}
          >
            <dt className="recent-input__recent-text">{transaction.transaction_date}</dt>
            <dt className="recent-input__recent-text">￥ {transaction.amount.toLocaleString()}</dt>
            <dt className="recent-input__recent-text">
              {transaction.medium_category_name === null
                ? transaction.custom_category_name
                : transaction.medium_category_name}
            </dt>
            <dt>{transaction.shop}</dt>
            <dt>{transaction.memo}</dt>
          </dl>
          <InputModal
            key={index}
            amount={transaction.amount}
            categoryName={categoryName}
            id={transaction.id}
            memo={transaction.memo === null ? '' : transaction.memo}
            shop={transaction.shop === null ? '' : transaction.shop}
            open={id === transaction.id && open}
            onClose={handleClose}
            transactionDate={transaction.transaction_date}
            transactionsType={transaction.transaction_type}
          />
        </div>
      );
    });
  };
  return <>{latestTransaction()}</>;
};

export default RecentInputBody;
