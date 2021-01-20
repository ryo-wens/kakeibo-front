import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { GroupAccountList } from '../../reducks/groupTransactions/types';
import { Groups, ApprovedGroupUsers } from '../../reducks/groups/types';
import { editGroupAccount } from '../../reducks/groupTransactions/operations';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import '../../assets/accounting/payoff.scss';

interface PayOffBodyPros {
  groupAccountList: GroupAccountList;
  remainingTotalAmount: number[];
  approvedGroup: Groups;
  selectMonth: string | null;
  selectYear: string;
  currentUserId: string;
  completeJudge: { completeJudge: boolean; completeMonth: string };
}

const PayOffBody = (props: PayOffBodyPros) => {
  const dispatch = useDispatch();
  const { group_id } = useParams();
  const getMonthIndexNumber = 1;
  const currentSelectMonth = props.groupAccountList.month.split('-')[getMonthIndexNumber];
  const completeMonth = props.completeJudge.completeMonth.split('-')[getMonthIndexNumber];

  const displayAccountList =
    currentSelectMonth === props.selectMonth &&
    props.groupAccountList.group_accounts_list_by_payer !== undefined &&
    !props.completeJudge.completeJudge;

  const groupUserInfo = () => {
    let approvedUsersList: ApprovedGroupUsers = [];

    for (const group of props.approvedGroup) {
      if (group.group_id === Number(group_id)) {
        approvedUsersList = group.approved_users_list;
      }
    }

    for (const accountByPayer of props.groupAccountList.group_accounts_list_by_payer) {
      for (const user of approvedUsersList) {
        if (user.user_id === accountByPayer.payer_user_id) {
          accountByPayer.payer_user_name = user.user_name;
        }

        for (const account of accountByPayer.group_accounts_list) {
          if (user.user_id === account.recipient_user_id) {
            account.recipient_user_name = user.user_name;
          }
        }
      }
    }
  };
  groupUserInfo();

  return (
    <>
      <div>
        {displayAccountList &&
          props.groupAccountList.group_accounts_list_by_payer.map((groupAccount, index) => {
            return (
              <div className="payoff__recipient-field" key={index}>
                <div className="payoff__background">
                  <li className="payoff__account-li payoff__sub-title">支払人</li>
                  <div className="payoff__spacer-small" />
                  <li className="payoff__account-li payoff__check-box">
                    {groupAccount.payer_user_name}
                  </li>
                  <div className="payoff__delimiterLine" />
                  <li className="payoff__account-li payoff__sub-title ">受取人</li>
                  <div className="payoff__spacer-small" />
                  {groupAccount.group_accounts_list.map((account) => {
                    return (
                      <div key={account.id}>
                        <div className="payoff__account-form">
                          <li className="payoff__account-li payoff__text-position payoff__check-box">
                            {account.recipient_user_name}
                          </li>
                          <li className="payoff__account-li payoff__text-position payoff__check-box">
                            ￥{account.payment_amount}
                          </li>
                          <li className="payoff__account-li payoff__check-box">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  className="payoff__check-box"
                                  color="primary"
                                  checked={account.payment_confirmation}
                                  disabled={
                                    props.currentUserId !== account.payer_user_id ||
                                    account.receipt_confirmation
                                  }
                                  onClick={() => {
                                    if (!account.payment_confirmation) {
                                      if (
                                        window.confirm(
                                          `${account.recipient_user_name}さんへの支払を完了してもよろしいですか？`
                                        )
                                      ) {
                                        account.payment_confirmation = true;
                                        if (props.selectMonth != null) {
                                          dispatch(
                                            editGroupAccount(
                                              account,
                                              Number(group_id),
                                              props.selectYear,
                                              props.selectMonth
                                            )
                                          );
                                        }
                                        return null;
                                      } else {
                                        return null;
                                      }
                                    }

                                    if (account.payment_confirmation) {
                                      if (
                                        window.confirm(
                                          `${account.recipient_user_name}さんへの支払を取り消してもよろしいですか？`
                                        )
                                      ) {
                                        account.payment_confirmation = false;
                                        if (props.selectMonth != null) {
                                          dispatch(
                                            editGroupAccount(
                                              account,
                                              Number(group_id),
                                              props.selectYear,
                                              props.selectMonth
                                            )
                                          );
                                        }
                                        return null;
                                      } else {
                                        return null;
                                      }
                                    }
                                  }}
                                />
                              }
                              label={'支払完了'}
                            />
                          </li>
                          <li className="payoff__account-li payoff__check-box">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  color="primary"
                                  checked={account.receipt_confirmation}
                                  disabled={
                                    props.currentUserId !== account.recipient_user_id ||
                                    !account.payment_confirmation
                                  }
                                  onClick={() => {
                                    if (!account.receipt_confirmation) {
                                      if (
                                        window.confirm(
                                          `${groupAccount.payer_user_name}さんからの受取を完了してもよろしいですか？`
                                        )
                                      ) {
                                        account.receipt_confirmation = true;
                                        if (props.selectMonth != null) {
                                          dispatch(
                                            editGroupAccount(
                                              account,
                                              Number(group_id),
                                              props.selectYear,
                                              props.selectMonth
                                            )
                                          );
                                        }
                                        return null;
                                      } else {
                                        return null;
                                      }
                                    }

                                    if (account.receipt_confirmation) {
                                      if (
                                        window.confirm(
                                          `${groupAccount.payer_user_name}さんからの受取を取り消してもよろしいですか？`
                                        )
                                      ) {
                                        account.receipt_confirmation = false;
                                        if (props.selectMonth != null) {
                                          dispatch(
                                            editGroupAccount(
                                              account,
                                              Number(group_id),
                                              props.selectYear,
                                              props.selectMonth
                                            )
                                          );
                                        }
                                      } else {
                                        return null;
                                      }
                                    }
                                  }}
                                />
                              }
                              label={'受取完了'}
                            />
                          </li>
                        </div>
                      </div>
                    );
                  })}
                  <div className="payoff__spacer-small" />
                  <li className="payoff__account-li payoff__sub-title payoff__sub-title__color-red">
                    残支払金額 ￥ {props.remainingTotalAmount[index]}
                  </li>
                </div>
              </div>
            );
          })}
        {completeMonth === props.selectMonth && (
          <p className="payoff__error-message">今月の支払・受取はありません。</p>
        )}
      </div>
    </>
  );
};
export default PayOffBody;
