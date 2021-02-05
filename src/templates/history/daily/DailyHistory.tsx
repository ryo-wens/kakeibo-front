import React from 'react';
import { Groups } from '../../../reducks/groups/types';
import { TransactionsList } from '../../../reducks/transactions/types';
import { GroupTransactionsList } from '../../../reducks/groupTransactions/types';
import SearchTransactionContainer from '../../../containers/history/search/SearchTransactionContainer';
import DailyHistoryBodyContainer from '../../../containers/history/daily/DailyHistoryBodyContainer';
import GroupDailyHistoryBodyContainer from '../../../containers/history/daily/GroupDailyHistoryBodyContainer';
import { noTransactionMessage } from '../../../lib/constant';
import './daily-history.scss';

interface DailyHistoryProps {
  group_id: number;
  pathName: string;
  submit: boolean;
  selectYear: number;
  selectMonth: number;
  openSearchField: boolean;
  selectStartDate: Date | null;
  selectEndDate: Date | null;
  transactionType: string;
  category: string;
  bigCategoryId: number;
  lowAmount: string;
  highAmount: string;
  paymentUserId: string;
  shop: string;
  memo: string;
  sortItem: string;
  sortType: string;
  limit: string;
  notSpecified: boolean;
  displayPersonalTransactions: boolean;
  displayGroupTransactions: boolean;
  approvedGroup: Groups;
  transactionsList: TransactionsList;
  groupTransactionsList: GroupTransactionsList;
  searchTransactionsList: TransactionsList;
  groupSearchTransactionsList: GroupTransactionsList;
  searchFieldOpen: () => void;
  searchFieldClose: () => void;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  selectStartDateChange: (selectStartDate: Date | null) => void;
  selectEndDateChange: (selectEndDate: Date | null) => void;
  inputMemo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputShop: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputLowAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputHighAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeCategory: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectTransactionType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changePayer: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changeSortItem: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changeSortType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectLimit: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const DailyHistory = (props: DailyHistoryProps) => {
  return (
    <>
      <div className="daily-history daily-history__background">
        <SearchTransactionContainer
          closeSearch={props.searchFieldClose}
          openSearch={props.searchFieldOpen}
          openSearchFiled={props.openSearchField}
          notSpecified={props.notSpecified}
          pathName={props.pathName}
          inputMemo={props.inputMemo}
          inputShop={props.inputShop}
          selectTransactionsType={props.selectTransactionType}
          memo={props.memo}
          shop={props.shop}
          transactionType={props.transactionType}
          category={props.category}
          changeCategory={props.changeCategory}
          bigCategoryId={props.bigCategoryId}
          selectStartDate={props.selectStartDate}
          selectEndDate={props.selectEndDate}
          highAmount={props.highAmount}
          lowAmount={props.lowAmount}
          selectStartDateChange={props.selectStartDateChange}
          selectEndDateChange={props.selectEndDateChange}
          inputHighAmount={props.inputHighAmount}
          inputLowAmount={props.inputLowAmount}
          groupId={props.group_id}
          approvedGroup={props.approvedGroup}
          paymentUserId={props.paymentUserId}
          changePayer={props.changePayer}
          changeSortItem={props.changeSortItem}
          changeSortType={props.changeSortType}
          sortItem={props.sortItem}
          sortType={props.sortType}
          limit={props.limit}
          selectLimit={props.selectLimit}
          submit={props.submit}
          setSearchSubmit={props.setSubmit}
        />
        <div className="daily-history__spacer" />
        {props.displayPersonalTransactions && (
          <>
            {!props.transactionsList.length && <h3>{noTransactionMessage}</h3>}
            <DailyHistoryBodyContainer transactionsList={props.transactionsList} />
          </>
        )}

        {props.displayGroupTransactions && (
          <>
            {!props.groupTransactionsList.length && <h3>{noTransactionMessage}</h3>}
            <GroupDailyHistoryBodyContainer groupTransactionsList={props.groupTransactionsList} />
          </>
        )}
      </div>
    </>
  );
};
export default DailyHistory;
