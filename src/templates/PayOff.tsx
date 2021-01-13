import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios, { CancelTokenSource } from 'axios';
import { fetchGroups } from '../reducks/groups/operations';
import {
  fetchGroupAccount,
  addGroupAccount,
  deleteGroupAccount,
} from '../reducks/groupTransactions/operations';
import {
  getGroupAccountList,
  getStatusNotFoundMessage,
  getAccountCompleteJudgment,
  getRemainingTotalAmount,
} from '../reducks/groupTransactions/selectors';
import { getUserId } from '../reducks/users/selectors';
import { getApprovedGroups } from '../reducks/groups/selectors';
import PayOffBody from '../components/account/PayOffBody';
import { SelectMonth } from '../components/uikit/';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import '../assets/accounting/payoff.scss';

interface PayOffProps {
  setCurrentItem: React.Dispatch<React.SetStateAction<boolean>>;
  selectedYear: number;
}

const PayOff = (props: PayOffProps) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const signal: CancelTokenSource = axios.CancelToken.source();
  const groupAccountList = useSelector(getGroupAccountList);
  const badRequestMessage = useSelector(getStatusNotFoundMessage);
  const completeJudge = useSelector(getAccountCompleteJudgment);
  const approvedGroup = useSelector(getApprovedGroups);
  const remainingTotalAmount = useSelector(getRemainingTotalAmount);
  const currentUserId = useSelector(getUserId);
  const searchLocation = useLocation().search;
  const getQuery = () => {
    return new URLSearchParams(searchLocation);
  };
  const query = getQuery();
  const selectMonth = query.get('month');
  const [selectedMonth, setSelectedMonth] = useState<number>(Number(selectMonth));
  const [subMonth, setSubMonth] = useState<string | null>(selectMonth);
  const [message, setMessage] = useState<string | undefined>(badRequestMessage);
  const getMonthIndexNumber = 1;
  const currentSelectMonth = groupAccountList.month.split('-')[getMonthIndexNumber];

  const displayAmount = (amount: number): boolean => {
    return amount !== undefined && currentSelectMonth === subMonth;
  };

  useEffect(() => {
    dispatch(fetchGroups(signal));
    if (subMonth != null) {
      dispatch(fetchGroupAccount(Number(id), props.selectedYear, subMonth, signal));
    }
    const interval = setInterval(() => {
      dispatch(fetchGroups(signal));
      if (groupAccountList.group_accounts_list_by_payer) {
        if (subMonth != null) {
          dispatch(fetchGroupAccount(Number(id), props.selectedYear, subMonth, signal));
        }
      }
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [subMonth]);

  useEffect(() => {
    setMessage(badRequestMessage);
  }, [badRequestMessage]);

  const displayAccountButton = (): JSX.Element[] => {
    let accountBtn: JSX.Element[] = [];

    if (currentSelectMonth === subMonth) {
      accountBtn = [
        <div key={2} className="payoff__account-btn--position">
          <button
            type={'button'}
            className="payoff__account-btn"
            onClick={() => {
              if (window.confirm(`${selectedMonth}月の精算を削除してもよろしいですか?`)) {
                dispatch(deleteGroupAccount(Number(id), String(props.selectedYear), subMonth));
                props.setCurrentItem(false);
                history.replace(`/group/${id}/accounting?year=${props.selectedYear}`);
              }
            }}
          >
            {selectedMonth}月の精算を削除する
          </button>
        </div>,
      ];
    } else if (badRequestMessage === '当月は未会計です。') {
      if (!completeJudge.completeMonth) {
        accountBtn = [
          <div key={1} className="payoff__account-btn--position">
            <button
              type={'button'}
              className="payoff__account-btn"
              onClick={() => {
                if (
                  window.confirm(
                    `${selectedMonth}月の精算を完了してもよろしいですか？\n※${selectedMonth}月の家計簿追加は行えなくなります。`
                  )
                ) {
                  if (subMonth != null) {
                    dispatch(addGroupAccount(Number(id), String(props.selectedYear), subMonth));
                    setMessage('');
                  }
                }
              }}
            >
              {selectedMonth}月の精算を完了する
            </button>
          </div>,
        ];
      }
    }

    return accountBtn;
  };

  return (
    <>
      <>
        <div className="payoff payoff__box-size">
          <div className="payoff__spacer-big" />
          <div className="payoff__background">
            <button
              className="payoff__back-btn"
              onClick={() => {
                props.setCurrentItem(false);
                history.replace(`/group/${id}/accounting?year=${props.selectedYear}`);
              }}
            >
              <ChevronLeftIcon />
            </button>
            <div className="payoff__account-btn--position">
              <SelectMonth
                selectedMonth={Number(selectedMonth)}
                setSelectedMonth={setSelectedMonth}
                setSubMonth={setSubMonth}
              />
            </div>
            <div className="payoff__spacer-small" />
            {currentSelectMonth === subMonth && (
              <div className="payoff__amount-list">
                <div className="payoff__account-form">
                  合計支払金額
                  <div className="payoff__amount-position">
                    {displayAmount(groupAccountList.group_total_payment_amount)
                      ? groupAccountList.group_total_payment_amount.toLocaleString()
                      : 0}
                  </div>
                </div>
                <div className="payoff__account-form">
                  1人あたり平均支払金額
                  <div className="payoff__amount-position">
                    {displayAmount(groupAccountList.group_average_payment_amount)
                      ? groupAccountList.group_average_payment_amount.toLocaleString()
                      : 0}
                  </div>
                </div>
                <div className="payoff__account-form">
                  会計後支払残額
                  <div className="payoff__amount-position">
                    {displayAmount(groupAccountList.group_remaining_amount)
                      ? groupAccountList.group_remaining_amount.toLocaleString()
                      : 0}
                  </div>
                </div>
              </div>
            )}
            <p className="payoff__error-message">
              {currentSelectMonth === subMonth ? '' : message}
            </p>
            {displayAccountButton()}
            <PayOffBody
              groupAccountList={groupAccountList}
              approvedGroup={approvedGroup}
              selectMonth={subMonth}
              selectYear={String(props.selectedYear)}
              completeJudge={completeJudge}
              remainingTotalAmount={remainingTotalAmount}
              currentUserId={currentUserId}
            />
          </div>
        </div>
      </>
    </>
  );
};
export default PayOff;
