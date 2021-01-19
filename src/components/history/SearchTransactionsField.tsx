import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import {
  DatePicker,
  GenericButton,
  KindSelectBox,
  SelectBigCategory,
  SelectLimit,
  SelectPayer,
  SelectSort,
  SelectSortType,
  TextInput,
} from '../uikit';
import { searchTransactions } from '../../reducks/transactions/operations';
import { searchGroupTransactions } from '../../reducks/groupTransactions/operations';
import { Groups } from '../../reducks/groups/types';

interface SearchTransactionsFieldProps {
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
  changePayer: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changeSortItem: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changeSortType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectCategory: (bigCategoryId: number) => void;
  selectLimit: (event: React.ChangeEvent<{ value: unknown }>) => void;
  setSearchSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  selectStartDate: Date | null;
  selectEndDate: Date | null;
  lowAmount: string;
  highAmount: string;
  memo: string | null;
  shop: string | null;
  category: string;
  bigCategoryId: number;
  transactionType: string;
  approvedGroup: Groups;
  paymentUserId: string;
  sortItem: string;
  sortType: string;
  limit: string;
}

const SearchTransactionsField = (props: SearchTransactionsFieldProps) => {
  const dispatch = useDispatch();

  const searchRequestData = {
    transaction_type: props.transactionType !== '' ? props.transactionType : null,
    start_date: props.selectStartDate,
    end_date: props.selectEndDate,
    low_amount: props.lowAmount !== '' ? props.lowAmount : null,
    high_amount: props.highAmount !== '' ? props.highAmount : null,
    memo: props.memo !== '' ? props.memo : null,
    shop: props.shop !== '' ? props.shop : null,
    sort: props.sortItem !== '' ? props.sortItem : null,
    sort_type: props.sortType !== '' ? props.sortType : null,
    big_category_id: props.bigCategoryId !== 0 ? props.bigCategoryId : null,
    limit: props.limit !== '' ? props.limit : null,
  };

  const groupSearchRequestData = {
    transaction_type: props.transactionType !== '' ? props.transactionType : null,
    payment_user_id: props.paymentUserId !== '' ? props.paymentUserId : null,
    start_date: props.selectStartDate,
    end_date: props.selectEndDate,
    low_amount: props.lowAmount !== '' ? props.lowAmount : null,
    high_amount: props.highAmount !== '' ? props.highAmount : null,
    memo: props.memo !== '' ? props.memo : null,
    shop: props.shop !== '' ? props.shop : null,
    sort: props.sortItem !== '' ? props.sortItem : null,
    sort_type: props.sortType !== '' ? props.sortType : null,
    big_category_id: props.bigCategoryId !== 0 ? props.bigCategoryId : null,
    limit: props.limit !== '' ? props.limit : null,
  };

  return (
    <div className="search-transaction__back-ground">
      <button className="input-years__btn__close" onClick={props.closeSearch}>
        <CloseIcon />
      </button>
      <div className="search-transaction__select-contents">
        <div className="daily-history__spacer" />
        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">日時の指定</div>
          <div className="search-transaction__parallel-form">
            <DatePicker
              id={'startDate'}
              label={'開始日'}
              onChange={props.selectStartDateChange}
              required={false}
              value={props.selectStartDate}
              disabled={false}
            />
            <span className="search-transaction__icon">〜</span>
            <DatePicker
              id={'endDate'}
              label={'終了日'}
              onChange={props.selectEndDateChange}
              required={false}
              value={props.selectEndDate}
              disabled={false}
            />
          </div>
        </div>

        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">収支</div>
          <KindSelectBox
            onChange={props.selectTransactionsType}
            required={false}
            value={props.transactionType}
            label={'支出 or 収入'}
            disabled={false}
          />
        </div>

        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">カテゴリー</div>
          <SelectBigCategory
            category={props.category}
            onChange={props.changeCategory}
            onClick={props.selectCategory}
            pathName={props.pathName}
          />
        </div>

        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">メモ</div>
          <TextInput
            value={props.memo}
            fullWidth={true}
            id={'memo'}
            label={'メモ'}
            onChange={props.inputMemo}
            required={false}
            type={'text'}
            disabled={false}
          />
        </div>

        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">店名</div>
          <TextInput
            value={props.shop}
            fullWidth={true}
            id={'shop'}
            label={'お店'}
            onChange={props.inputShop}
            required={false}
            type={'text'}
            disabled={false}
          />
        </div>

        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">金額</div>
          <div className="search-transaction__parallel-form">
            <TextInput
              value={props.lowAmount}
              fullWidth={true}
              id={'amount'}
              label={'最低金額'}
              onChange={props.inputLowAmount}
              required={false}
              type={'text'}
              disabled={false}
            />
            <span className="search-transaction__icon">〜</span>
            <TextInput
              value={props.highAmount}
              fullWidth={true}
              id={'amount'}
              label={'最高金額'}
              onChange={props.inputHighAmount}
              required={false}
              type={'text'}
              disabled={false}
            />
          </div>
        </div>

        {props.pathName === 'group' && (
          <>
            <div className="search-transaction__select-contents--value">
              <div className="search-transaction__select-contents--key">支払人</div>
              <SelectPayer
                value={props.paymentUserId}
                required={false}
                approvedGroups={props.approvedGroup}
                groupId={props.groupId}
                pathName={props.pathName}
                onChange={props.changePayer}
                disabled={false}
              />
            </div>
          </>
        )}

        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">並び替え項目</div>
          <SelectSort selectSortItem={props.changeSortItem} value={props.sortItem} />
        </div>

        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">並び順</div>
          <SelectSortType selectSortType={props.changeSortType} value={props.sortType} />
        </div>

        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">取得件数</div>
          <SelectLimit value={props.limit} selectLimit={props.selectLimit} />
        </div>
      </div>
      <div className="daily-history__spacer" />
      <div className="search-transaction__search-button">
        <GenericButton
          disabled={false}
          label={'この条件で絞り込む'}
          onClick={() => {
            if (props.pathName !== 'group') {
              props.setSearchSubmit(true);
              dispatch(searchTransactions(searchRequestData));
            } else {
              props.setSearchSubmit(true);
              dispatch(searchGroupTransactions(props.groupId, groupSearchRequestData));
            }
          }}
        />
      </div>
    </div>
  );
};
export default SearchTransactionsField;
