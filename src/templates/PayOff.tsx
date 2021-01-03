import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { push } from 'connected-react-router';
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
} from '../reducks/groupTransactions/selectors';
import { getApprovedGroups } from '../reducks/groups/selectors';
import PayOffBody from '../components/account/PayOffBody';
import { Header } from '../components/header';
import { SelectMonth } from '../components/uikit/';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import '../assets/accounting/payoff.scss';

const PayOff = () => {
  const dispatch = useDispatch();
  const signal: CancelTokenSource = axios.CancelToken.source();
  const { id } = useParams();
  const groupAccountList = useSelector(getGroupAccountList);
  const badRequestMessage = useSelector(getStatusNotFoundMessage);
  const completeJudge = useSelector(getAccountCompleteJudgment);
  const approvedGroup = useSelector(getApprovedGroups);
  const selectYear = useLocation().pathname.split('/')[4];
  const selectMonth = useLocation().pathname.split('/')[5];
  const [selectedMonth, setSelectedMonth] = useState<number>(Number(selectMonth));
  const [subMonth, setSubMonth] = useState<string>(selectMonth);
  const [message, setMessage] = useState<string | undefined>(badRequestMessage);
  const currentSelectMonth = groupAccountList.month.split('-')[1];

  const displayAmount = (amount: number): boolean => {
    return amount !== undefined && currentSelectMonth === subMonth;
  };

  useEffect(() => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupAccount(Number(id), Number(selectYear), subMonth, signal));
    const interval = setInterval(() => {
      dispatch(fetchGroups(signal));
      if (groupAccountList.group_accounts_list) {
        dispatch(fetchGroupAccount(Number(id), Number(selectYear), subMonth, signal));
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
                dispatch(deleteGroupAccount(Number(id), selectYear, subMonth));
                dispatch(push(`/group/${id}/accounting/${selectYear}`));
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
                  dispatch(addGroupAccount(Number(id), selectYear, subMonth));
                  setMessage('');
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
      <Header />
      <main className="section__container">
        <>
          <div className="payoff payoff__box-size">
            <div className="payoff__spacer-big" />
            <div className="payoff__background">
              <button
                className="payoff__back-btn"
                onClick={() => dispatch(push(`/group/${id}/accounting/${selectYear}`))}
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
              <p className="payoff__error-message">
                {currentSelectMonth === subMonth ? '' : message}
              </p>
              {displayAccountButton()}
              <PayOffBody
                groupAccountList={groupAccountList}
                approvedGroup={approvedGroup}
                selectMonth={subMonth}
                selectYear={selectYear}
                completeJudge={completeJudge}
              />
            </div>
          </div>
        </>
      </main>
    </>
  );
};
export default PayOff;
