import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getGroupWeeklyTransaction } from '../../../reducks/groupTransactions/selectors';
import { getApprovedGroups } from '../../../reducks/groups/selectors';
import { useParams } from 'react-router';
import { currentWeekNumber, incomeTransactionType } from '../../../lib/constant';
import GroupWeeklyHistory from '../../../components/history/weekly/GroupWeeklyHistory';

interface GroupWeeklyHistoryContainerProps {
  year: number;
  month: number;
}

const GroupWeeklyHistoryContainer = (props: GroupWeeklyHistoryContainerProps) => {
  const { group_id } = useParams();
  const path = window.location.pathname;
  const approvedGroup = useSelector(getApprovedGroups);
  const expenseGroupTransactionsList = useSelector(getGroupWeeklyTransaction);
  const currentGroupId = approvedGroup.findIndex((group) => group.group_id === Number(group_id));
  const currentGroup = approvedGroup[currentGroupId];
  const [open, setOpen] = useState<boolean>(false);
  const [openId, setOpenId] = useState<number | undefined>(undefined);

  const openModal = (transactionId: number) => {
    setOpen(true);
    setOpenId(transactionId);
  };

  const closeModal = () => {
    setOpen(false);
    setOpenId(undefined);
  };

  const subTotalAmounts = (startDate: number, endDate: number) => {
    let oneWeekSubTotal = 0;

    for (const groupTransaction of expenseGroupTransactionsList) {
      if (groupTransaction.transaction_type !== incomeTransactionType) {
        const transactionDay = Number(groupTransaction.transaction_date.slice(8, 10));
        if (startDate <= transactionDay && transactionDay <= endDate) {
          oneWeekSubTotal += groupTransaction.amount;
        }
      }
    }

    return oneWeekSubTotal;
  };

  const currentWeekBorder = (weekNum: number) => {
    const style = {
      border: '',
    };

    if (weekNum === currentWeekNumber) {
      style.border = 'solid 2px #E2750F';
    }

    return style;
  };

  const payerUnderLineColor = (payerUserId: string): React.CSSProperties => {
    const amountStyle = {
      color: '',
    };

    if (currentGroup && currentGroup.approved_users_list) {
      const approvedUser = currentGroup.approved_users_list.find(
        (user) => user.user_id === payerUserId
      );

      if (approvedUser) {
        amountStyle.color = approvedUser.color_code;
      }
    }

    return { borderBottom: `2px solid ${amountStyle.color}` };
  };

  const totalAmount = () => {
    let amount = 0;

    for (const groupTransaction of expenseGroupTransactionsList) {
      if (groupTransaction.transaction_type !== incomeTransactionType) {
        amount += groupTransaction.amount;
      }
    }
    return amount;
  };

  return (
    <GroupWeeklyHistory
      path={path}
      year={props.year}
      month={props.month}
      open={open}
      openId={openId}
      approvedGroup={approvedGroup}
      groupId={Number(group_id)}
      currentGroup={currentGroup}
      expenseGroupTransactionsList={expenseGroupTransactionsList}
      openModal={openModal}
      closeModal={closeModal}
      totalAmount={totalAmount}
      subTotalAmounts={subTotalAmounts}
      currentWeekBorder={currentWeekBorder}
      payerUnderLineColor={payerUnderLineColor}
    />
  );
};
export default GroupWeeklyHistoryContainer;
