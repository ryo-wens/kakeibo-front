import React from 'react';
import { Groups } from '../../reducks/groups/types';
import { GroupAccountList, MonthWithoutSplit } from '../../reducks/groupTransactions/types';
import { SelectMonth } from '../../components/uikit';
import PayOffBodyContainer from '../../containers/account/PayOffBodyContainer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import '../../assets/accounting/payoff.scss';

interface PayOffProps {
  currentUserId: string;
  subMonth: string | null;
  setSubMonth: React.Dispatch<React.SetStateAction<string | null>>;
  message: string | undefined;
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentSelectMonth: string;
  accountedJude: { jude: boolean };
  approvedGroup: Groups;
  remainingTotalAmount: number[];
  badRequestMessage: string | undefined;
  groupAccountList: GroupAccountList;
  selectedYear: number;
  selectedMonth: number;
  monthWithoutSplitList: MonthWithoutSplit;
  displayAmount: (amount: number) => boolean;
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
            className="payoff__account-btn"
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
      <div className="payoff__spacer-big" />
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
        <div className="payoff__account-btn--position">
          <SelectMonth
            selectedMonth={Number(props.selectedMonth)}
            setSelectedMonth={props.setSelectedMonth}
            setSubMonth={props.setSubMonth}
          />
        </div>
        <div className="payoff__spacer-small" />
        {props.currentSelectMonth === props.subMonth && (
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
          {props.currentSelectMonth === props.subMonth ? '' : props.message}
        </p>
        {displayAddAccountButton()}
        {displayDeleteAccountButton()}

        <PayOffBodyContainer
          groupAccountList={props.groupAccountList}
          approvedGroup={props.approvedGroup}
          selectMonth={props.subMonth}
          selectYear={String(props.selectedYear)}
          monthWithoutSplit={props.monthWithoutSplitList}
          remainingTotalAmount={props.remainingTotalAmount}
          currentUserId={props.currentUserId}
        />
      </div>
    </div>
  );
};
export default PayOff;
