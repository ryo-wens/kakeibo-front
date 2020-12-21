import React, { useState } from 'react';
import { TransactionsList } from '../../reducks/transactions/types';
import { EditTransactionModal } from '../uikit';
import { bigCategoryColor } from '../../lib/function';
import '../../assets/home/recent-input.scss';

interface RecentInputBodyProps {
  latestTransactionsList: TransactionsList;
}

const RecentInputBody = (props: RecentInputBodyProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openId, setOpenId] = useState<number | undefined>(undefined);

  const handleOpen = (transactionId: number) => {
    setOpen(true);
    setOpenId(transactionId);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenId(undefined);
  };

  const latestTransaction = () => {
    return props.latestTransactionsList.map((transaction, index) => {
      const {
        id,
        transaction_type,
        transaction_date,
        big_category_name,
        medium_category_name,
        custom_category_name,
        amount,
        memo,
        shop,
      } = transaction;

      const categoryName = {
        bigCategory: big_category_name,
        mediumCategory: medium_category_name !== null ? medium_category_name : '',
        customCategory: custom_category_name !== null ? custom_category_name : '',
      };

      return (
        <div key={index}>
          <dl className="recent-input__recent-box" onClick={() => handleOpen(id)}>
            <dt className="recent-input__recent-text">{transaction_date}</dt>
            <dt className="recent-input__recent-text">
              <span
                style={bigCategoryColor(big_category_name)}
                className="recent-input__category-icon"
              />
              {medium_category_name || custom_category_name}
            </dt>
            <dt className="recent-input__recent-text">￥ {amount.toLocaleString()}</dt>
            <dt>
              {shop !== null ? (
                <>
                  <span className="recent-input__item-font">店名: </span> {shop}
                </>
              ) : null}
            </dt>
            <dt>
              {memo !== null ? (
                <>
                  <span className="recent-input__item-font">メモ: </span>
                  {memo}
                </>
              ) : null}
            </dt>
          </dl>
          <EditTransactionModal
            key={index}
            amount={amount}
            categoryName={categoryName}
            id={id}
            memo={transaction.memo !== null ? memo : ''}
            shop={transaction.shop !== null ? shop : ''}
            open={openId === transaction.id && open}
            onClose={handleClose}
            transactionDate={transaction_date}
            transactionsType={transaction_type}
          />
        </div>
      );
    });
  };
  return <>{latestTransaction()}</>;
};

export default RecentInputBody;
