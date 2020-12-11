import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { getGroupAccountList } from '../reducks/groupTransactions/selectors';
import { getApprovedGroups } from '../reducks/groups/selectors';
import { State } from '../reducks/store/types';
import { getPathGroupId } from '../lib/path';
import { customMonth } from '../lib/constant';
import axios, { CancelTokenSource } from 'axios';
import PayOffBody from '../components/account/PayOffBody';
import { Header } from '../components/header';
import '../assets/accounting/payoff.scss';

const PayOff = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const groupAccountList = getGroupAccountList(selector);
  const approvedGroup = getApprovedGroups(selector);
  const groupId = getPathGroupId(window.location.pathname);

  const groupName = approvedGroup.map((group) => {
    if (groupId === group.group_id) {
      return group.group_name;
    }
  });

  useEffect(() => {
    const signal: CancelTokenSource = axios.CancelToken.source();

    const interval = setInterval(() => {
      dispatch(fetchGroups(signal));
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [groupId]);

  return (
    <>
      <Header />
      <main className="section__container">
        <>
          <div className="payoff payoff__box-size">
            <div className="payoff__spacer-big" />
            <div className="payoff payoff__group-name">
              {groupName} {customMonth}月精算
            </div>
            <div className="payoff__spacer-small" />
            <div className="payoff__amount-list">
              <div className="payoff__account-form">
                合計支払金額
                <div className="payoff__group-name__position">
                  {groupAccountList.group_total_payment_amount.toLocaleString()}
                </div>
              </div>
              <div className="payoff__account-form">
                1人あたり平均支払金額
                <div className="payoff__group-name__position">
                  {groupAccountList.group_average_payment_amount.toLocaleString()}
                </div>
              </div>
              <div className="payoff__account-form">
                会計後支払残額
                <div className="payoff__group-name__position">
                  {groupAccountList.group_remaining_amount.toLocaleString()}
                </div>
              </div>
            </div>

            <PayOffBody groupAccountList={groupAccountList} approvedGroup={approvedGroup} />
          </div>
        </>
      </main>
    </>
  );
};
export default PayOff;
