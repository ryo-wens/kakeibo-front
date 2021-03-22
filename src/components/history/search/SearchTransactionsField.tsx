import React from 'react';
import { Groups } from '../../../reducks/groups/types';
import CloseIcon from '@material-ui/icons/Close';
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
} from '../../uikit';

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
  approvedGroup: Groups;
  paymentUserId: string;
  sortItem: string;
  sortType: string;
  limit: string;
  searchOperation: () => void;
  groupSearchOperation: () => void;
}

const SearchTransactionsField = (props: SearchTransactionsFieldProps) => {
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
            <KindSelectBox
              onChange={props.selectTransactionsType}
              required={false}
              value={props.transactionType}
              disabled={false}
              currentPage={'search'}
            />
          </div>
        </div>

        <div className="search-transaction__spacer--top" />
        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">カテゴリー</div>
          <div className="search-transaction__selector">
            <SelectBigCategory category={props.category} onChange={props.changeCategory} />
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
                <SelectPayer
                  value={props.paymentUserId}
                  required={false}
                  approvedGroups={props.approvedGroup}
                  groupId={props.groupId}
                  pathName={props.pathName}
                  onChange={props.changePayer}
                  disabled={false}
                  notSpecified={props.notSpecified}
                />
              </div>
            </div>
          </>
        )}

        <div className="search-transaction__spacer--top" />
        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">並び替え項目</div>
          <div className="search-transaction__selector">
            <SelectSort selectSortItem={props.changeSortItem} value={props.sortItem} />
          </div>
        </div>

        <div className="search-transaction__spacer--top" />
        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">並び順</div>
          <div className="search-transaction__selector">
            <SelectSortType selectSortType={props.changeSortType} value={props.sortType} />
          </div>
        </div>

        <div className="search-transaction__spacer--top" />
        <div className="search-transaction__select-contents--value">
          <div className="search-transaction__select-contents--key">取得件数</div>
          <div className="search-transaction__selector">
            <SelectLimit value={props.limit} selectLimit={props.selectLimit} />
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
