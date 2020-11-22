import React from 'react';
import { useDispatch } from 'react-redux';
import { searchTransactions } from '../../reducks/transactions/operations';
import { searchGroupTransactions } from '../../reducks/groupTransactions/operations';
import '../../assets/history/daily-history.scss';
import { DatePicker, CategoryInput, TextInput, KindSelectBox, GenericButton } from './index';

interface SearchTransactionProps {
  pathName: string;
  groupId: number;
  openSearchFiled: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  selectStartDateChange: (selectStartDate: Date | null) => void;
  selectEndDateChange: (selectEndDate: Date | null) => void;
  selectTransactionsType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  inputMemo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputLowAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputHighAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputShop: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeCategory: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectCategory: (
    bigCategoryId: number,
    associatedCategoryId: number | null,
    category_type: string
  ) => void;
  selectStartDate: Date | null;
  selectEndDate: Date | null;
  lowAmount: string;
  highAmount: string;
  memo: string | null;
  shop: string | null;
  category: string;
  bigCategoryId: number;
  mediumCategoryId: number | null;
  customCategoryId: number | null;
  transactionType: string;
}

const SearchTransaction = (props: SearchTransactionProps) => {
  const dispatch = useDispatch();

  const searchRequestData = {
    transaction_type: props.transactionType !== '' ? props.transactionType : null,
    start_date: props.selectStartDate,
    end_date: props.selectEndDate,
    low_amount: props.lowAmount !== '' ? props.lowAmount : null,
    high_amount: props.highAmount !== '' ? props.highAmount : null,
    memo: props.memo !== '' ? props.memo : null,
    shop: props.shop !== '' ? props.shop : null,
    big_category_id: 2,
  };

  const groupSearchRequestData = {
    transaction_type: props.transactionType !== '' ? props.transactionType : null,
    start_date: props.selectStartDate,
    end_date: props.selectEndDate,
    low_amount: props.lowAmount !== '' ? props.lowAmount : null,
    high_amount: props.highAmount !== '' ? props.highAmount : null,
    memo: props.memo !== '' ? props.memo : null,
    shop: props.shop !== '' ? props.shop : null,
    big_category_id: 2,
  };

  return (
    <>
      <button className="daily-history__search-btn" onClick={props.openSearch}>
        検索
      </button>
      {props.openSearchFiled && (
        <div className="daily-history__search-position daily-history__background">
          <div>
            <KindSelectBox
              onChange={props.selectTransactionsType}
              required={false}
              value={props.transactionType}
              label={'支出or収入'}
            />
          </div>
          <div className="daily-history__input-form">
            <TextInput
              value={props.memo}
              fullWidth={true}
              id={'memo'}
              label={'メモ'}
              onChange={props.inputMemo}
              required={false}
              type={'text'}
            />
          </div>
          <div className="daily-history__input-form">
            <TextInput
              value={props.shop}
              fullWidth={true}
              id={'shop'}
              label={'お店'}
              onChange={props.inputShop}
              required={false}
              type={'text'}
            />
          </div>
          <div className="daily-history__input-form">
            <CategoryInput
              kind={props.transactionType}
              onChange={props.changeCategory}
              onClick={props.selectCategory}
              required={false}
              value={props.category}
            />
          </div>
          <div>
            <TextInput
              value={props.lowAmount}
              fullWidth={true}
              id={'amount'}
              label={'最低金額'}
              onChange={props.inputLowAmount}
              required={false}
              type={'text'}
            />
          </div>
          <div className="daily-history__input-form">
            <TextInput
              value={props.highAmount}
              fullWidth={true}
              id={'amount'}
              label={'最高金額'}
              onChange={props.inputHighAmount}
              required={false}
              type={'text'}
            />
          </div>
          <div>
            <DatePicker
              id={'startDate'}
              label={'開始日'}
              onChange={props.selectStartDateChange}
              required={false}
              value={props.selectStartDate}
            />
          </div>
          <div>
            <DatePicker
              id={'endDate'}
              label={'終了日'}
              onChange={props.selectEndDateChange}
              required={false}
              value={props.selectEndDate}
            />
          </div>
          <div className="daily-history__search-btn-position">
            <GenericButton
              disabled={false}
              label={'この条件で絞り込む'}
              onClick={() => {
                if (props.pathName !== 'group') {
                  dispatch(searchTransactions(searchRequestData)) && props.closeSearch();
                } else {
                  dispatch(searchGroupTransactions(props.groupId, groupSearchRequestData)) &&
                    props.closeSearch();
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default SearchTransaction;
