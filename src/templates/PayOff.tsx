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
import { getGroupAccountList } from '../reducks/groupTransactions/selectors';
import { getApprovedGroups } from '../reducks/groups/selectors';
import PayOffBody from '../components/account/PayOffBody';
import { Header } from '../components/header';
import { SelectMonth } from '../components/uikit/';
import '../assets/accounting/payoff.scss';

const PayOff = () => {
  const dispatch = useDispatch();
  const signal: CancelTokenSource = axios.CancelToken.source();
  const { id } = useParams();
  const groupAccountList = useSelector(getGroupAccountList);
  const approvedGroup = useSelector(getApprovedGroups);
  const selectYear = useLocation().pathname.split('/')[4];
  const selectMonth = useLocation().pathname.split('/')[5];
  const [selectedMonth, setSelectedMonth] = useState<number>(Number(selectMonth));
  const [subMonth, setSubMonth] = useState<string>(selectMonth);

  useEffect(() => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupAccount(Number(id), Number(selectYear), subMonth, signal));
    const interval = setInterval(() => {
      dispatch(fetchGroups(signal));
      if (!groupAccountList.group_accounts_list) {
        if (groupAccountList.group_accounts_list !== undefined) {
          dispatch(fetchGroupAccount(Number(id), Number(selectYear), subMonth, signal));
        }
      }
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [subMonth]);

  return (
    <>
      <Header />
      <main className="section__container">
        <>
          <div className="payoff payoff__box-size">
            <div className="payoff__spacer-big" />
            <div className="payoff__background">
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
                  <div className="payoff__group-name__position">
                    {groupAccountList.group_total_payment_amount !== undefined &&
                      groupAccountList.group_total_payment_amount.toLocaleString()}
                  </div>
                </div>
                <div className="payoff__account-form">
                  1人あたり平均支払金額
                  <div className="payoff__group-name__position">
                    {groupAccountList.group_average_payment_amount !== undefined &&
                      groupAccountList.group_average_payment_amount.toLocaleString()}
                  </div>
                </div>
                <div className="payoff__account-form">
                  会計後支払残額
                  <div className="payoff__group-name__position">
                    {groupAccountList.group_remaining_amount !== undefined &&
                      groupAccountList.group_remaining_amount.toLocaleString()}
                  </div>
                </div>
              </div>
              {groupAccountList.group_accounts_list !== undefined &&
              groupAccountList.group_accounts_list.length === 0 ? (
                <div className="payoff__account-btn--position">
                  <button
                    type={'button'}
                    className="payoff__account-btn"
                    onClick={() => {
                      if (
                        window.confirm(
                          `${selectedMonth}月の精算を完了してもよろしいですか？\n※${selectedMonth}月の家計簿追加は行えなくなります。`
                        )
                      ) {
                        dispatch(addGroupAccount(Number(id), Number(selectYear), subMonth));
                      }
                    }}
                  >
                    {selectedMonth}月の精算を完了する
                  </button>
                </div>
              ) : (
                <div className="payoff__account-btn--position">
                  <button
                    type={'button'}
                    className="payoff__account-btn"
                    onClick={() => {
                      if (window.confirm(`${selectMonth}月の精算を削除してもよろしいですか?`)) {
                        dispatch(deleteGroupAccount(Number(id), Number(selectYear), subMonth));
                        dispatch(push(`/group/${id}/accounting`));
                      }
                    }}
                  >
                    {selectMonth}月の精算を削除する
                  </button>
                </div>
              )}
              <PayOffBody groupAccountList={groupAccountList} approvedGroup={approvedGroup} />
            </div>
          </div>
        </>
      </main>
    </>
  );
};
export default PayOff;
