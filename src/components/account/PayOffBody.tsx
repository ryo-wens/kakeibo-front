import React from 'react';
import { useDispatch } from 'react-redux';
import { GroupAccountList } from '../../reducks/groupTransactions/types';
import { Groups } from '../../reducks/groups/types';
import '../../assets/accounting/payoff.scss';
import { getPathGroupId } from '../../lib/path';
import {
  addGroupAccount,
  editGroupAccount,
  deleteGroupAccount,
} from '../../reducks/groupTransactions/operations';
import { customMonth, year } from '../../lib/constant';
import { Checkbox, FormControlLabel } from '@material-ui/core';

interface PayOffBodyPros {
  groupAccountList: GroupAccountList;
  approvedGroup: Groups;
}

const PayOffBody = (props: PayOffBodyPros) => {
  const dispatch = useDispatch();
  const groupId = getPathGroupId(window.location.pathname);

  const groupUserInfo = () => {
    let groupUser = { userId: '', userName: '' };
    const groupUserList: { userId: string; userName: string }[] = [];
    for (const group of props.approvedGroup) {
      for (const user of group.approved_users_list) {
        if (user.group_id === groupId) {
          groupUser = {
            userId: user.user_id,
            userName: user.user_name,
          };
          groupUserList.push(groupUser);
        }
      }
    }

    return groupUserList;
  };

  return (
    <>
      <div>
        <button
          onClick={() => {
            dispatch(addGroupAccount(groupId, year, customMonth));
          }}
          type={'button'}
          className="payoff__account-btn"
        >
          会計する
        </button>
        <button
          onClick={() => {
            if (window.confirm(`${customMonth}月の精算データを削除してもよろしいですか？`))
              dispatch(deleteGroupAccount(groupId, year, customMonth));
          }}
          type={'button'}
          className="payoff__account-btn"
        >
          会計削除
        </button>

        <div>
          {props.groupAccountList.group_accounts_list.map((groupAccount) => {
            const transactionUserName = () => {
              const userName = {
                payerUserName: '',
                receiptUserName: '',
              };
              for (const userInfo of groupUserInfo()) {
                if (groupAccount.payer_user_id === userInfo.userId) {
                  userName.payerUserName = userInfo.userName;
                }

                if (groupAccount.recipient_user_id === userInfo.userId) {
                  userName.receiptUserName = userInfo.userName;
                }
              }

              return userName;
            };

            const userName = transactionUserName();

            return (
              <div className="payoff__background" key={groupAccount.id}>
                <li className="payoff__account-li payoff__sub-title">支払人</li>
                <div className="payoff__spacer-small" />
                <li className="payoff__account-li">{userName.payerUserName}</li>
                <div className="payoff__delimiterLine" />

                <li className="payoff__account-li payoff__sub-title">受取人</li>
                <div className="payoff__spacer-small" />
                <div className="payoff__account-form">
                  <li className="payoff__account-li payoff__text-position">
                    {userName.receiptUserName}
                  </li>
                  <li className="payoff__account-li payoff__text-position">
                    ￥{groupAccount.payment_amount.toLocaleString()}
                  </li>
                  <li className="payoff__account-li ">
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={groupAccount.payment_confirmation}
                          onClick={() => {
                            if (!groupAccount.payment_confirmation) {
                              if (
                                window.confirm(
                                  `${userName.receiptUserName}さんへの支払を完了してもよろしいですか？`
                                )
                              ) {
                                groupAccount.payment_confirmation = true;
                                dispatch(
                                  editGroupAccount(
                                    props.groupAccountList,
                                    groupId,
                                    year,
                                    customMonth
                                  )
                                );
                                return null;
                              } else {
                                return null;
                              }
                            }

                            if (groupAccount.payment_confirmation) {
                              if (
                                window.confirm(
                                  `${userName.receiptUserName}さんへの支払を取り消してもよろしいですか？`
                                )
                              ) {
                                groupAccount.payment_confirmation = false;
                                dispatch(
                                  editGroupAccount(
                                    props.groupAccountList,
                                    groupId,
                                    year,
                                    customMonth
                                  )
                                );
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
                  <li className="payoff__account-li ">
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={groupAccount.receipt_confirmation}
                          onClick={() => {
                            if (!groupAccount.receipt_confirmation) {
                              if (
                                window.confirm(
                                  `${userName.payerUserName}さんからの受取を完了してもよろしいですか？`
                                )
                              ) {
                                groupAccount.receipt_confirmation = true;
                                dispatch(
                                  editGroupAccount(
                                    props.groupAccountList,
                                    groupId,
                                    year,
                                    customMonth
                                  )
                                );
                                return null;
                              } else {
                                return null;
                              }
                            }

                            if (groupAccount.receipt_confirmation) {
                              if (
                                window.confirm(
                                  `${userName.payerUserName}さんからの受取を取り消してもよろしいですか？`
                                )
                              ) {
                                groupAccount.receipt_confirmation = false;
                                dispatch(
                                  editGroupAccount(
                                    props.groupAccountList,
                                    groupId,
                                    year,
                                    customMonth
                                  )
                                );
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
                <div className="payoff__spacer-small" />
                <li className="payoff__account-li payoff__sub-title payoff__sub-title__color-red">
                  残支払金額 ￥ {groupAccount.payment_amount}
                </li>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default PayOffBody;
