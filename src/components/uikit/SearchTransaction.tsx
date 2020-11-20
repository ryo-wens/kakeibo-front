import React from 'react';
import '../../assets/history/daily-history.scss';
import { DatePicker, CategoryInput, TextInput, KindSelectBox, GenericButton } from './index';

interface SearchTransactionProps {
  pathName: string;
  openSearchFiled: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  selectDateChange: (selectDate: Date | null) => void;
  selectTransactionsType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  inputMemo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputShop: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeCategory: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectCategory: (
    bigCategoryId: number,
    associatedCategoryId: number | null,
    category_type: string
  ) => void;
  selectDate: Date | null;
  amount: string;
  memo: string;
  shop: string;
  category: string;
  bigCategoryId: number;
  mediumCategoryId: number | null;
  customCategoryId: number | null;
  transactionType: string;
}

const SearchTransaction = (props: SearchTransactionProps) => {
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
              value={props.shop}
              fullWidth={true}
              id={'amount'}
              label={'最低金額'}
              onChange={props.inputAmount}
              required={false}
              type={'text'}
            />
          </div>
          <div className="daily-history__input-form">
            <TextInput
              value={props.shop}
              fullWidth={true}
              id={'amount'}
              label={'最高金額'}
              onChange={props.inputAmount}
              required={false}
              type={'text'}
            />
          </div>
          <div>
            <DatePicker
              id={'startDate'}
              label={'開始日'}
              onChange={props.selectDateChange}
              required={false}
              value={props.selectDate}
            />
          </div>
          <div>
            <DatePicker
              id={'endDate'}
              label={'終了日'}
              onChange={props.selectDateChange}
              required={false}
              value={props.selectDate}
            />
          </div>
          <div className="daily-history__search-btn-position">
            <GenericButton
              disabled={false}
              label={'この条件で絞り込む'}
              onClick={props.closeSearch}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default SearchTransaction;
