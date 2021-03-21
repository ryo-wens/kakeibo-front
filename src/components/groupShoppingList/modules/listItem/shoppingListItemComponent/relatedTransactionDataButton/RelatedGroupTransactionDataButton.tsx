import React from 'react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import styles from '../../../../../shoppingList/modules/listItem/ShoppingListItemComponent/RelatedTransactionDataButton/RelatedTransactionDataButton.module.scss';
import { bigCategoryColor } from '../../../../../../lib/function';
import { GroupRelatedTransactionData } from '../../../../../../reducks/groupShoppingList/types';
import { Groups } from '../../../../../../reducks/groups/types';
import cn from 'classnames';

interface RelatedGroupTransactionDataButtonProps {
  open: boolean;
  approvedGroups: Groups;
  groupId: number;
  transactionData: GroupRelatedTransactionData;
  associatedCategoryName: string;
  openTransactionData: () => void;
  getPaymentUserName: (approvedGroups: Groups, userId: string, groupId: number) => string;
  categoryDataClassName: string;
  displayTermClassName: string;
}

const RelatedGroupTransactionDataButton = React.forwardRef(
  (
    props: RelatedGroupTransactionDataButtonProps,
    transactionDataRef: React.Ref<HTMLDivElement>
  ) => {
    return (
      <>
        {!props.open ? (
          <button className={styles.isClose} onClick={props.openTransactionData}>
            関連する取引データ
            <KeyboardArrowRightIcon />
          </button>
        ) : (
          <>
            <button className={styles.isOpen}>
              関連する取引データ
              <KeyboardArrowDownIcon />
            </button>
            <div className={styles.form} ref={transactionDataRef as React.Ref<HTMLDivElement>}>
              <dl className={styles.dataList}>
                <dt>購入日</dt>
                <dd>{props.transactionData.transaction_date}</dd>
                <dt>カテゴリー</dt>
                <dd className={cn(styles.categoryData, props.categoryDataClassName)}>
                  <div>
                    <span
                      className={styles.itemValueCategoryColor}
                      style={bigCategoryColor(props.transactionData.big_category_name)}
                    />
                    <span>{props.transactionData.big_category_name}</span>
                  </div>
                  <div>
                    <KeyboardArrowLeftIcon />
                    <span>{props.associatedCategoryName}</span>
                  </div>
                </dd>
                <dt>金額</dt>
                <dd>￥ {props.transactionData.amount}</dd>
                <div className={props.displayTermClassName}>
                  <dt>
                    <span className={styles.term}>支払人</span>
                  </dt>
                  <dd>
                    {props.getPaymentUserName(
                      props.approvedGroups,
                      props.transactionData.payment_user_id,
                      props.groupId
                    )}
                  </dd>
                  <dt>
                    <span className={styles.term}>店名</span>
                  </dt>
                  <dd>{props.transactionData.shop ?? '-'}</dd>
                  <dt>
                    <span className={styles.term}>メモ</span>
                  </dt>
                  <dd>{props.transactionData.memo}</dd>
                </div>
              </dl>
            </div>
          </>
        )}
      </>
    );
  }
);

RelatedGroupTransactionDataButton.displayName = 'RelatedGroupTransactionDataButton';
export default RelatedGroupTransactionDataButton;
