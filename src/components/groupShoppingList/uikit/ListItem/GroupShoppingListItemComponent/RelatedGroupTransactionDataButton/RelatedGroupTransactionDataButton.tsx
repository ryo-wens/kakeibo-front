import React, { useEffect, useRef, useState } from 'react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import '../../../../../shoppingList/modules/ListItem/ShoppingListItemComponent/RelatedTransactionDataButton/related-transaction-data-button.scss';
import { bigCategoryColor } from '../../../../../../lib/function';
import { GroupRelatedTransactionData } from '../../../../../../reducks/groupShoppingList/types';
import { Groups } from '../../../../../../reducks/groups/types';

interface RelatedGroupTransactionDataButtonProps {
  transactionData: GroupRelatedTransactionData;
  approvedGroups: Groups;
  groupId: number;
}

const RelatedGroupTransactionDataButton = (props: RelatedGroupTransactionDataButtonProps) => {
  const [open, setOpen] = useState(false);
  const transactionDataRef = useRef<HTMLDivElement>(null);

  const openTransactionData = () => {
    setOpen(true);
  };

  const onClickCloseTransactionData = (event: Event) => {
    if (transactionDataRef.current && !transactionDataRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('click', onClickCloseTransactionData);
      return () => {
        document.removeEventListener('click', onClickCloseTransactionData);
      };
    }
  }, [onClickCloseTransactionData]);

  const displayMediumCategoryOrCustomCategory = (transactionData: GroupRelatedTransactionData) => {
    if (transactionData.medium_category_name !== null) {
      return transactionData.medium_category_name;
    }
    return transactionData.custom_category_name;
  };

  const getPaymentUserName = (approvedGroups: Groups, userId: string, groupId: number) => {
    const group = approvedGroups.filter((group) => group.group_id === groupId);
    const idx = group[0].approved_users_list.findIndex((user) => user.user_id === userId);
    return group[0].approved_users_list[idx].user_name;
  };

  const transactionData = [
    { key: '購入日', value: props.transactionData.transaction_date },
    {
      key: 'カテゴリー',
      value: (
        <div className="related-transaction-data-button__item-value-category">
          <span
            className="related-transaction-data-button__item-value-category-color"
            style={bigCategoryColor(props.transactionData.big_category_name)}
          />
          <span>{props.transactionData.big_category_name}</span>
          <KeyboardArrowLeftIcon />
          <span>{displayMediumCategoryOrCustomCategory(props.transactionData)}</span>
        </div>
      ),
    },
    { key: '金額', value: `${props.transactionData.amount} 円` },
    {
      key: '支払人',
      value: getPaymentUserName(
        props.approvedGroups,
        props.transactionData.payment_user_id,
        props.groupId
      ),
    },
    { key: '店名', value: props.transactionData.shop === null ? '-' : props.transactionData.shop },
    { key: 'メモ', value: props.transactionData.memo },
  ];

  return (
    <>
      {!open ? (
        <button
          className="related-transaction-data-button__is-close"
          onClick={() => openTransactionData()}
        >
          関連する取引データ
          <KeyboardArrowRightIcon />
        </button>
      ) : (
        <>
          <button className="related-transaction-data-button__is-open">
            関連する取引データ
            <KeyboardArrowDownIcon />
          </button>
          <div className="related-transaction-data-button__form" ref={transactionDataRef}>
            {transactionData.map((item) => {
              return (
                <div className="related-transaction-data-button__item" key={item.key}>
                  <span className="related-transaction-data-button__item--key">{item.key}</span>
                  <span className="related-transaction-data-button__item--value">{item.value}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default RelatedGroupTransactionDataButton;
