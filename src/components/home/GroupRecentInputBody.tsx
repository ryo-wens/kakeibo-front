import React, { useState } from 'react';
import { GroupTransactionsList } from '../../reducks/groupTransactions/types';
import { Groups, Group } from '../../reducks/groups/types';
import { EditTransactionModal } from '../uikit';
import { bigCategoryColor } from '../../lib/function';
import '../../assets/home/recent-input.scss';

interface RecentInputBodyProps {
  groupLatestTransactionsList: GroupTransactionsList;
  approvedGroup: Groups;
  currentGroup: Group;
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

  const payerColor = (payerUserId: string): React.CSSProperties | undefined => {
    let color = '';

    for (const groupUser of props.currentGroup.approved_users_list) {
      if (groupUser.user_id === payerUserId) {
        color = groupUser.color_code;
      }
    }

    return { borderBottom: `2px solid ${color}` };
  };

  const latestGroupTransaction = () => {
    return props.groupLatestTransactionsList.map((groupTransaction, index) => {
      const {
        id,
        transaction_type,
        transaction_date,
        big_category_id,
        medium_category_id,
        custom_category_id,
        big_category_name,
        medium_category_name,
        custom_category_name,
        memo,
        shop,
        amount,
        payment_user_id,
      } = groupTransaction;
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
            <dt className="recent-input__recent-text">
              <span style={payerColor(payment_user_id)}>￥ {amount.toLocaleString()}</span>
            </dt>
            <dt>
              {shop !== null ? (
                <>
                  <span className="recent-input__item-font">店名: </span>
                  {shop}
                </>
              ) : null}
            </dt>
            <dt>
              {memo !== null ? (
                <>
                  <span className="recent-input__item-font">メモ :</span>
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
            memo={memo !== null ? memo : ''}
            shop={shop !== null ? shop : ''}
            open={openId === id && open}
            onClose={handleClose}
            transactionDate={transaction_date}
            transactionsType={transaction_type}
            approvedGroups={props.approvedGroup}
            paymentUserId={payment_user_id}
            bigCategoryId={big_category_id}
            mediumCategoryId={medium_category_id}
            customCategoryId={custom_category_id}
          />
        </div>
      );
    });
  };
  return <>{latestGroupTransaction()}</>;
};

export default GroupRecentInputBody;
