import React from 'react';
import { Groups } from '../../reducks/groups/types';
import { GroupAccountList, MonthWithoutSplit } from '../../reducks/groupTransactions/types';
import InputYears from '../../components/modules/inputYears/InputYears';
import PayOffBodyContainer from '../../containers/account/PayOffBodyContainer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import '../../assets/accounting/payoff.scss';
import dayjs from 'dayjs';

interface PayOffProps {
  noTransactions: boolean;
  currentUserId: string;
  subMonth: string | null;
  setSubMonth: React.Dispatch<React.SetStateAction<string | null>>;
  message: string | undefined;
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentSelectMonth: string;
  currentSelectYear: string;
  accountedJude: { jude: boolean };
  approvedGroup: Groups;
  remainingTotalAmount: number[];
  badRequestMessage: string | undefined;
  groupAccountList: GroupAccountList;
  selectedYear: number;
  selectedMonth: number;
  monthWithoutSplitList: MonthWithoutSplit;
  displayAmount: (amount: number) => boolean;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  setCurrentItem: React.Dispatch<React.SetStateAction<boolean>>;
  backPageOperation: () => void;
  addAccountOperation: () => void;
  deleteAccountOperation: () => void;
}

const PayOff = (props: PayOffProps) => {
  const displayAddAccountButton = () => {
    if (!props.accountedJude.jude) {
      if (props.badRequestMessage === '当月は未会計です。') {
        return (
          <div className="payoff__account-btn--position">
            <button
              type={'button'}
              className="payoff__account-btn"
              onClick={() => {
                if (
                  window.confirm(
                    `${props.selectedMonth}月の精算を完了してもよろしいですか？\n※${props.selectedMonth}月の家計簿追加は行えなくなります。`
                  )
                ) {
                  if (props.subMonth != null) {
                    props.addAccountOperation();
                    props.setMessage('');
                  }
                }
              }}
            >
              {props.selectedMonth}月の精算を完了する
            </button>
          </div>
        );
      }
    }
  };

  const displayDeleteAccountButton = () => {
    if (props.accountedJude.jude) {
      return (
        <div className="payoff__account-btn--position">
          <button
            type={'button'}
            className="payoff__account-btn payoff__account-btn__delete"
            onClick={() => {
              if (window.confirm(`${props.selectedMonth}月の精算を削除してもよろしいですか?`)) {
                props.deleteAccountOperation();
                props.setCurrentItem(false);
                props.backPageOperation();
              }
            }}
          >
            {props.selectedMonth}月の精算を削除する
          </button>
        </div>
      );
    }
  };

  return (
    <div className="payoff payoff__box-size">
      <div className="payoff__selector-position">
        <InputYears
          btnClassName={'payoff__child-input-years-btn'}
          currentPage={'account'}
          selectedMonth={props.selectedMonth}
          selectedYear={props.selectedYear}
          setSelectedMonth={props.setSelectedMonth}
          setSelectedYear={props.setSelectedYear}
        />
      </div>
      <div className="payoff__background">
        <button
          className="payoff__back-btn"
          onClick={() => {
            props.setCurrentItem(false);
            props.backPageOperation();
          }}
        >
          <ChevronLeftIcon />
        </button>
        <div className="payoff__account-btn--position" />
        <div className="payoff__spacer-small" />
        {props.currentSelectMonth === dayjs(String(props.selectedMonth)).format('MM') &&
          props.currentSelectYear === String(props.selectedYear) && (
            <div className="payoff__amount-list">
              <div className="payoff__account-form">
                合計支払金額
                <div className="payoff__amount-position">
                  {props.displayAmount(props.groupAccountList.group_total_payment_amount)
                    ? props.groupAccountList.group_total_payment_amount.toLocaleString()
                    : 0}
                </div>
              </div>

              <div className="payoff__account-form">
                1人あたり平均支払金額
                <div className="payoff__amount-position">
                  {props.displayAmount(props.groupAccountList.group_average_payment_amount)
                    ? props.groupAccountList.group_average_payment_amount.toLocaleString()
                    : 0}
                </div>
              </div>

              <div className="payoff__account-form">
                会計後支払残額
                <div className="payoff__amount-position">
                  {props.displayAmount(props.groupAccountList.group_remaining_amount)
                    ? props.groupAccountList.group_remaining_amount.toLocaleString()
                    : 0}
                </div>
              </div>
            </div>
          )}
        <p className="payoff__error-message">
          {props.currentSelectMonth === dayjs(String(props.selectedMonth)).format('MM') &&
          props.accountedJude.jude
            ? ''
            : props.message}
        </p>
        {displayAddAccountButton()}
        <PayOffBodyContainer
          noTransactions={props.noTransactions}
          groupAccountList={props.groupAccountList}
          approvedGroup={props.approvedGroup}
          selectMonth={props.selectedMonth}
          selectYear={String(props.selectedYear)}
          monthWithoutSplit={props.monthWithoutSplitList}
          remainingTotalAmount={props.remainingTotalAmount}
          currentUserId={props.currentUserId}
          currentSelectYear={props.currentSelectYear}
          currentSelectMonth={props.currentSelectMonth}
        />
        {displayDeleteAccountButton()}
      </div>
    </div>
  );
};
export default PayOff;
