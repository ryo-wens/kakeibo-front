import React, { useState } from 'react';
import { GroupTransactionsList } from '../../reducks/groupTransactions/types';
import { Groups } from '../../reducks/groups/types';
import { EditTransactionModal } from '../uikit';
import '../../assets/home/recent-input.scss';

interface RecentInputBodyProps {
  groupLatestTransactionsList: GroupTransactionsList;
  approvedGroup: Groups;
}

const GroupRecentInputBody = (props: RecentInputBodyProps) => {
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

  const latestGroupTransaction = () => {
    return props.groupLatestTransactionsList.map((groupTransaction, index) => {
      const {
        id,
        transaction_type,
        transaction_date,
        medium_category_name,
        custom_category_name,
        memo,
        shop,
        amount,
        payment_user_id,
      } = groupTransaction;
      const categoryName = {
        mediumCategory: medium_category_name !== null ? medium_category_name : '',
        customCategory: custom_category_name !== null ? custom_category_name : '',
      };

      return (
        <div key={index}>
          <dl className="recent-input__recent_delimiterLine" onClick={() => handleOpen(id)}>
            <dt className="recent-input__recent-text">{transaction_date}</dt>
            <dt className="recent-input__recent-text">￥ {amount.toLocaleString()}</dt>
            <dt className="recent-input__recent-text">
              {medium_category_name !== null ? medium_category_name : custom_category_name}
            </dt>
            <dt>{shop}</dt>
            <dt>{memo}</dt>
          </dl>
          <EditTransactionModal
            key={index}
            amount={amount}
            categoryName={categoryName}
            id={id}
            memo={memo !== null ? memo : ''}
            shop={shop !== null ? shop : ''}
            open={openId === id && open}
            onClose={handleClose}
            transactionDate={transaction_date}
            transactionsType={transaction_type}
            approvedGroups={props.approvedGroup}
            paymentUserId={payment_user_id}
          />
        </div>
      );
    });
  };
  return <>{latestGroupTransaction()}</>;
};

export default GroupRecentInputBody;
