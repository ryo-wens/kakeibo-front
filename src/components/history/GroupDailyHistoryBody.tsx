import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { GroupTransactionsList } from '../../reducks/groupTransactions/types';
import EditTransactionModal from '../../components/uikit/EditTransactionModal';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { getUserId } from '../../reducks/users/selectors';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import '../../assets/history/daily-history.scss';

interface GroupDailyHistoryBodyProps {
  groupTransactionsList: GroupTransactionsList;
  groupSearchTransactionsList: GroupTransactionsList;
  selectYears: number;
  selectMonth: number;
}
const GroupDailyHistoryBody = (props: GroupDailyHistoryBodyProps) => {
  const approvedGroup = useSelector(getApprovedGroups);
  const userId = useSelector(getUserId);
  const [open, setOpen] = useState<boolean>(false);
  const [openId, setOpnId] = useState<number | undefined>(undefined);

  const handleOpen = (transactionId: number) => {
    setOpen(true);
    setOpnId(transactionId);
  };

  const handleClose = () => {
    setOpen(false);
    setOpnId(undefined);
  };

  const payerUser = (payerId: string) => {
    let payer = '';

    for (const group of approvedGroup) {
      for (const user of group.approved_users_list) {
        if (user.user_id === payerId) {
          payer = user.user_name;
        }
      }
    }

    return payer;
  };

  return (
    <>
      <table className="daily-history">
        <tbody>
          <tr>
            <td className="daily-history__th" align="center">
              編集
            </td>
            <td className="daily-history__th" align="center">
              日付
            </td>
            <td className="daily-history__th" align="center">
              カテゴリ
            </td>
            <td className="daily-history__th" align="center">
              金額
            </td>
            <td className="daily-history__th" align="center">
              支払人
            </td>
            <td className="daily-history__th" align="center">
              お店
            </td>
            <td className="daily-history__th" align="center">
              メモ
            </td>
          </tr>
          {props.groupTransactionsList.map((groupTransaction) => {
            const {
              id,
              transaction_type,
              transaction_date,
              big_category_id,
              medium_category_id,
              custom_category_id,
              big_category_name,
              medium_category_name,
              custom_category_name,
              amount,
              payment_user_id,
              shop,
              memo,
            } = groupTransaction;

            const categoryName = {
              bigCategory: big_category_name,
              mediumCategory: medium_category_name !== null ? medium_category_name : '',
              customCategory: custom_category_name !== null ? custom_category_name : '',
            };

            return (
              <tr key={id} className="daily-history__tr">
                <td className="daily-history__td" align="center">
                  <IconButton onClick={() => handleOpen(id)}>
                    <CreateIcon color="primary" />
                  </IconButton>
                  <EditTransactionModal
                    id={id}
                    onClose={handleClose}
                    open={openId === id && open}
                    amount={amount}
                    memo={memo !== null ? memo : ''}
                    shop={shop !== null ? shop : ''}
                    categoryName={categoryName}
                    transactionDate={transaction_date}
                    transactionsType={transaction_type}
                    approvedGroups={approvedGroup}
                    paymentUserId={userId}
                    bigCategoryId={big_category_id}
                    mediumCategoryId={medium_category_id}
                    customCategoryId={custom_category_id}
                  />
                </td>
                <td className="daily-history__td" align="center">
                  {transaction_date}
                </td>
                <td className="daily-history__td" align="center">
                  {medium_category_name || custom_category_name}
                </td>
                <td className="daily-history__td" align="center">
                  {amount}
                </td>
                <td className="daily-history__td" align="center">
                  {payerUser(payment_user_id)}
                </td>
                <td className="daily-history__td" align="center">
                  {shop}
                </td>
                <td className="daily-history__td" align="center">
                  {memo}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default GroupDailyHistoryBody;
