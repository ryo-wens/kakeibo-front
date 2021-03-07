import React from 'react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import './related-transaction-data-button.scss';
import { RelatedTransactionData } from '../../../../../../reducks/shoppingList/types';
import { bigCategoryColor } from '../../../../../../lib/function';

interface RelatedTransactionDataButtonProps {
  open: boolean;
  transactionData: RelatedTransactionData;
  associatedCategoryName: string;
  openTransactionData: () => void;
  transactionDataListClassName: string;
}

const RelatedTransactionDataButton = React.forwardRef(
  (props: RelatedTransactionDataButtonProps, transactionDataRef: React.Ref<HTMLDivElement>) => {
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
            <span>{props.associatedCategoryName}</span>
          </div>
        ),
      },
      { key: '金額', value: `${props.transactionData.amount} 円` },
      {
        key: '店名',
        value: props.transactionData.shop ?? '-',
      },
      { key: 'メモ', value: props.transactionData.memo },
    ];

    return (
      <>
        {!props.open ? (
          <button
            className="related-transaction-data-button__is-close"
            onClick={() => props.openTransactionData()}
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
            <div
              className="related-transaction-data-button__form"
              ref={transactionDataRef as React.Ref<HTMLDivElement>}
            >
              <dl className={props.transactionDataListClassName}>
                {transactionData.map((item) => {
                  return (
                    <>
                      <dt key={item.key}>{item.key}</dt>
                      <dd>{item.value}</dd>
                    </>
                  );
                })}
              </dl>
            </div>
          </>
        )}
      </>
    );
  }
);

RelatedTransactionDataButton.displayName = 'RelatedTransactionDataButton';
export default RelatedTransactionDataButton;
