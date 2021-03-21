import React from 'react';
import { GroupAccountList, GroupAccount } from '../../reducks/groupTransactions/types';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import '../../assets/accounting/payoff.scss';

interface PayOffBodyPros {
  noTransactions: boolean;
  withoutPay: { judgment: boolean };
  groupAccountList: GroupAccountList;
  remainingTotalAmount: number[];
  selectMonth: string | null;
  selectYear: string;
  currentUserId: string;
  displayAccountList: boolean;
  groupUserInfo: () => void;
  editAccountOperation: (account: GroupAccount) => void;
}

const PayOffBody = (props: PayOffBodyPros) => {
  props.groupUserInfo();

  return (
    <div>
      {props.displayAccountList &&
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

                <li className="payoff__account-li payoff__sub-title payoff__sub-title--recipient">
                  受取人
                </li>
                <div className="payoff__spacer-small" />
                {groupAccount.group_accounts_list.map((account) => {
                  return (
                    <div key={account.id}>
                      <div className="payoff__account-form">
                        <li className="payoff__account-li payoff__text-position payoff__check-box">
                          {account.recipient_user_name}
                        </li>
                        <li className="payoff__account-li payoff__text-position payoff__check-box">
                          ￥{account.payment_amount.toLocaleString()}
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
                                        props.editAccountOperation(account);
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
                                        props.editAccountOperation(account);
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
                                        props.editAccountOperation(account);
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
                                        props.editAccountOperation(account);
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
                  残支払金額 ￥ {props.remainingTotalAmount[index].toLocaleString()}
                </li>
              </div>
            </div>
          );
        })}
      {props.noTransactions && (
        <p className="payoff__error-message">今月の支払・受取はありません。</p>
      )}
    </div>
  );
};
export default PayOffBody;
