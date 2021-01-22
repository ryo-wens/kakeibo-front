import React from 'react';
import { GroupTransactionsList } from '../../../../reducks/groupTransactions/types';
import { Groups } from '../../../../reducks/groups/types';
import EditTransactionModalContainer from '../../../../containers/home/modal/EditTransactionModalContainer';
import { bigCategoryColor } from '../../../../lib/function';
import './recent-input.scss';

interface RecentInputBodyProps {
  open: boolean;
  openId: number | undefined;
  approvedGroup: Groups;
  groupLatestTransactionsList: GroupTransactionsList;
  payerColor: (payerUserId: string) => React.CSSProperties;
  openModal: (transactionId: number) => void;
  closeModal: () => void;
}

const GroupRecentInputBody = (props: RecentInputBodyProps) => {
  const latestGroupTransaction = () => {
    return props.groupLatestTransactionsList.map((groupTransaction, index) => {
      const categoryName = {
        bigCategory: groupTransaction.big_category_name,
        mediumCategory:
          groupTransaction.medium_category_name !== null
            ? groupTransaction.medium_category_name
            : '',
        customCategory:
          groupTransaction.custom_category_name !== null
            ? groupTransaction.custom_category_name
            : '',
      };

      return (
        <div key={index}>
          <dl
            className="recent-input__recent-box"
            onClick={() => props.openModal(groupTransaction.id)}
          >
            <dt className="recent-input__recent-text">{groupTransaction.transaction_date}</dt>
            <dt className="recent-input__recent-text">
              <span
                style={bigCategoryColor(groupTransaction.big_category_name)}
                className="recent-input__category-icon"
              />
              {groupTransaction.medium_category_name || groupTransaction.custom_category_name}
            </dt>
            <dt className="recent-input__recent-text">
              <span style={props.payerColor(groupTransaction.payment_user_id)}>
                ￥ {groupTransaction.amount.toLocaleString()}
              </span>
            </dt>
            <dt>
              <span className="recent-input__item-font">店名: </span>
              {groupTransaction.shop !== null ? groupTransaction.shop : '-'}
            </dt>
            <dt>
              <span className="recent-input__item-font">メモ :</span>
              {groupTransaction.memo !== null ? groupTransaction.memo : '-'}
            </dt>
          </dl>
          <EditTransactionModalContainer
            key={index}
            amount={groupTransaction.amount}
            categoryName={categoryName}
            id={groupTransaction.id}
            memo={groupTransaction.memo !== null ? groupTransaction.memo : ''}
            shop={groupTransaction.shop !== null ? groupTransaction.shop : ''}
            open={props.openId === groupTransaction.id && props.open}
            onClose={props.closeModal}
            transactionDate={groupTransaction.transaction_date}
            transactionsType={groupTransaction.transaction_type}
            paymentUserId={groupTransaction.payment_user_id}
            bigCategoryId={groupTransaction.big_category_id}
            mediumCategoryId={groupTransaction.medium_category_id}
            customCategoryId={groupTransaction.custom_category_id}
          />
        </div>
      );
    });
  };
  return <>{latestGroupTransaction()}</>;
};

export default GroupRecentInputBody;
