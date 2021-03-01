import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { ApprovedGroupUsers, Groups } from '../../reducks/groups/types';
import { GroupAccountList, MonthWithoutSplit } from '../../reducks/groupTransactions/types';
import PayOffBody from '../../components/account/PayOffBody';
import { editGroupAccount } from '../../reducks/groupTransactions/operations';
import axios from 'axios';

interface PayOffBodyContainerProps {
  selectYear: string;
  selectMonth: string | null;
  currentUserId: string;
  approvedGroup: Groups;
  remainingTotalAmount: number[];
  groupAccountList: GroupAccountList;
  monthWithoutSplit: MonthWithoutSplit;
}

const PayOffBodyContainer = (props: PayOffBodyContainerProps) => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const getMonthIndexNumber = 1;
  const currentSelectMonth = props.groupAccountList.month.split('-')[getMonthIndexNumber];

  const withoutPay = {
    judgment: false,
  };

  for (const month of props.monthWithoutSplit.withoutMonth) {
    if (month === props.selectMonth) {
      withoutPay.judgment = true;
    }
  }

  const displayAccountList =
    currentSelectMonth === props.selectMonth &&
    props.groupAccountList.group_accounts_list_by_payer !== undefined &&
    !withoutPay.judgment;

  const groupUserInfo = () => {
    const approvedUsersList: { usersList: ApprovedGroupUsers } = {
      usersList: [],
    };

    for (const group of props.approvedGroup) {
      if (group.group_id === Number(group_id)) {
        approvedUsersList.usersList = group.approved_users_list;
      }
    }

    for (const accountByPayer of props.groupAccountList.group_accounts_list_by_payer) {
      for (const user of approvedUsersList.usersList) {
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

  return (
    <PayOffBody
      withoutPay={withoutPay}
      currentUserId={props.currentUserId}
      groupAccountList={props.groupAccountList}
      remainingTotalAmount={props.remainingTotalAmount}
      selectMonth={props.selectYear}
      selectYear={props.selectYear}
      displayAccountList={displayAccountList}
      groupUserInfo={groupUserInfo}
      editAccountOperation={(account) => {
        const signal = axios.CancelToken.source();
        dispatch(
          editGroupAccount(
            account,
            Number(group_id),
            props.selectYear,
            String(props.selectMonth),
            signal
          )
        );
      }}
    />
  );
};
export default PayOffBodyContainer;
