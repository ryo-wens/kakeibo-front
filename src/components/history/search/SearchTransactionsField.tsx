import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { DatePicker, GenericButton, TextInput } from '../../uikit';
import { Select } from '../../uikit/Select';
import {
  selectLimitList,
  selectSortList,
  selectSortTypeList,
  selectBigCategoryList,
  selectSearchTransactionType,
} from '../../../lib/constant';
import { SelectItemList } from '../../../lib/types';

interface SearchTransactionsFieldProps {
  pathName: string;
  groupId: number;
  resetSearchTransactionsList: () => void;
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
  selectLimit: (event: React.ChangeEvent<{ value: unknown }>) => void;
  setSearchSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  notSpecified: boolean;
  selectStartDate: Date | null;
  selectEndDate: Date | null;
  lowAmount: string;
  highAmount: string;
  memo: string | null;
  shop: string | null;
  category: string;
  bigCategoryId: number;
  transactionType: string;
  paymentUserId: string;
  sortItem: string;
  sortType: string;
  limit: string;
  searchOperation: () => void;
  groupSearchOperation: () => void;
  selectUsersItemList: SelectItemList;
}

const SearchTransactionsField = (props: SearchTransactionsFieldProps) => {
  return (
    <div className="search-transaction__back-ground">
      <button className="input-years__btn__close" onClick={props.resetSearchTransactionsList}>
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
              minDate={new Date('1900-01-01')}
            />
            <span className="search-transaction__icon">〜</span>
            <DatePicker
              id={'endDate'}
              label={'終了日'}
              onChange={props.selectEndDateChange}
              required={false}
              value={props.selectEndDate}
              disabled={false}
              minDate={new Date('1900-01-01')}
            />
          </div>
        </div>

        <div className="search-transaction__spacer--top" />
        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">収支</div>
          <div className="search-transaction__selector">
            <Select
              disabled={false}
              defaultValue={''}
              selectItemList={selectSearchTransactionType}
              changeItem={props.selectTransactionsType}
            />
          </div>
        </div>

        <div className="search-transaction__spacer--top" />
        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">カテゴリー</div>
          <div className="search-transaction__selector">
            <Select
              disabled={false}
              defaultValue={0}
              changeItem={props.changeCategory}
              selectItemList={selectBigCategoryList}
            />
          </div>
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
            <div className="search-transaction__spacer--top" />
            <div className="search-transaction__select-contents--value">
              <div className="search-transaction__select-contents--key">支払人</div>
              <div className="search-transaction__selector">
                <Select
                  disabled={false}
                  defaultValue={''}
                  selectItemList={props.selectUsersItemList}
                  changeItem={props.changePayer}
                />
              </div>
            </div>
          </>
        )}

        <div className="search-transaction__spacer--top" />
        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">並び替え項目</div>
          <div className="search-transaction__selector">
            <Select
              disabled={false}
              defaultValue={'transaction_date'}
              selectItemList={selectSortList}
              changeItem={props.changeSortItem}
            />
          </div>
        </div>

        <div className="search-transaction__spacer--top" />
        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">並び順</div>
          <div className="search-transaction__selector">
            <Select
              disabled={false}
              defaultValue={'desc'}
              selectItemList={selectSortTypeList}
              changeItem={props.changeSortType}
            />
          </div>
        </div>

        <div className="search-transaction__spacer--top" />
        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">取得件数</div>
          <div className="search-transaction__selector">
            <Select
              disabled={false}
              defaultValue={''}
              selectItemList={selectLimitList}
              changeItem={props.selectLimit}
            />
          </div>
        </div>
      </div>

      <div className="daily-history__spacer" />
      <div className="search-transaction__search-button">
        <GenericButton
          disabled={false}
          label={'この条件で検索'}
          onClick={() => {
            if (props.pathName !== 'group') {
              props.setSearchSubmit(true);
              props.searchOperation();
            } else {
              props.setSearchSubmit(true);
              props.groupSearchOperation();
            }
          }}
        />
      </div>
    </div>
  );
};
export default SearchTransactionsField;
