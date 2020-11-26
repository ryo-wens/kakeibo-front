import React from 'react';
import { useDispatch } from 'react-redux';
import { searchTransactions } from '../../reducks/transactions/operations';
import { searchGroupTransactions } from '../../reducks/groupTransactions/operations';
import { Groups } from '../../reducks/groups/types';
import '../../assets/history/daily-history.scss';
import {
  DatePicker,
  SelectBigCategory,
  TextInput,
  KindSelectBox,
  GenericButton,
  SelectPayer,
  SelectSortType,
  SelectSort,
  SelectLimit,
} from './index';
import CloseIcon from '@material-ui/icons/Close';

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
  changePayer: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectSortItem: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectSortType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectCategory: (bigCategoryId: number) => void;
  selectLimit: (event: React.ChangeEvent<{ value: unknown }>) => void;
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
    <>
      <button
        className="daily-history__search-btn"
        onClick={!props.openSearchFiled ? props.openSearch : props.closeSearch}
      >
        検索
      </button>
      {props.openSearchFiled && (
        <div className="daily-history__background">
          <button className="input-years__btn__close" onClick={props.closeSearch}>
            <CloseIcon />
          </button>
          <div className="daily-history__search-position">
            <div className="daily-history__spacer" />
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
            <div>
              <KindSelectBox
                onChange={props.selectTransactionsType}
                required={false}
                value={props.transactionType}
                label={'支出 or 収入'}
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
            <div className="daily-history__input-form">
              <SelectBigCategory
                category={props.category}
                onChange={props.changeCategory}
                onClick={props.selectCategory}
                pathName={props.pathName}
              />
            </div>
            <div className="daily-history__input-form">
              <SelectSort selectSortItem={props.selectSortItem} value={props.sortItem} />
            </div>
            <div className="daily-history__input-form">
              <SelectSortType selectSortType={props.selectSortType} value={props.sortType} />
            </div>
            <div className="daily-history__input-form">
              <SelectLimit value={props.limit} selectLimit={props.selectLimit} />
            </div>
            <div className="daily-history__input-form">
              {props.pathName === 'group' && (
                <SelectPayer
                  value={props.paymentUserId}
                  required={false}
                  approvedGroups={props.approvedGroup}
                  groupId={props.groupId}
                  pathName={props.pathName}
                  onChange={props.changePayer}
                />
              )}
            </div>
            <div className="daily-history__spacer" />
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
        </div>
      )}
    </>
  );
};
export default SearchTransaction;
