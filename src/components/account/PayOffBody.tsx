import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { GroupAccountList, GroupAccounts } from '../../reducks/groupTransactions/types';
import { Groups } from '../../reducks/groups/types';
import { editGroupAccount } from '../../reducks/groupTransactions/operations';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import '../../assets/accounting/payoff.scss';

interface PayOffBodyPros {
  groupAccountList: GroupAccountList;
  accountListByPayer: GroupAccounts;
  approvedGroup: Groups;
  selectMonth: string | null;
  selectYear: string;
  completeJudge: { completeJudge: boolean; completeMonth: string };
}

const PayOffBody = (props: PayOffBodyPros) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const getMonthIndexNumber = 1;
  const [accountList, setAccountList] = useState<GroupAccounts>(props.accountListByPayer);

  const currentSelectMonth = props.groupAccountList.month.split('-')[getMonthIndexNumber];
  const completeMonth = props.completeJudge.completeMonth.split('-')[getMonthIndexNumber];

  const displayAccountList =
    currentSelectMonth === props.selectMonth &&
    props.groupAccountList.group_accounts_list_by_payer !== undefined &&
    !props.completeJudge.completeJudge;

  useEffect(() => {
    setAccountList(props.accountListByPayer);
  }, [props.accountListByPayer]);

  const groupUserInfo = () => {
    let groupUser = { userId: '', userName: '' };
    const groupUserList: { userId: string; userName: string }[] = [];
    for (const group of props.approvedGroup) {
      for (const user of group.approved_users_list) {
        if (user.group_id === Number(id)) {
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
        {displayAccountList &&
          accountList.map((groupAccount) => {
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
                    ￥{groupAccount.payment_amount}
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
                                if (props.selectMonth != null) {
                                  dispatch(
                                    editGroupAccount(
                                      groupAccount,
                                      Number(id),
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

                            if (groupAccount.payment_confirmation) {
                              if (
                                window.confirm(
                                  `${userName.receiptUserName}さんへの支払を取り消してもよろしいですか？`
                                )
                              ) {
                                groupAccount.payment_confirmation = false;
                                if (props.selectMonth != null) {
                                  dispatch(
                                    editGroupAccount(
                                      groupAccount,
                                      Number(id),
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
                                if (props.selectMonth != null) {
                                  dispatch(
                                    editGroupAccount(
                                      groupAccount,
                                      Number(id),
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

                            if (groupAccount.receipt_confirmation) {
                              if (
                                window.confirm(
                                  `${userName.payerUserName}さんからの受取を取り消してもよろしいですか？`
                                )
                              ) {
                                groupAccount.receipt_confirmation = false;
                                if (props.selectMonth != null) {
                                  dispatch(
                                    editGroupAccount(
                                      groupAccount,
                                      Number(id),
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
                <div className="payoff__spacer-small" />
                <li className="payoff__account-li payoff__sub-title payoff__sub-title__color-red">
                  残支払金額 ￥{' '}
                  {groupAccount.payment_confirmation && groupAccount.receipt_confirmation
                    ? 0
                    : groupAccount.payment_amount}
                </li>
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
