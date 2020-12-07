import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../reducks/store/types';
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
  const selector = useSelector((state: State) => state);
  const approvedGroup = getApprovedGroups(selector);
  const userId = getUserId(selector);
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
              お店
            </td>
            <td className="daily-history__th" align="center">
              メモ
            </td>
          </tr>
          {(() => {
            if (!props.groupSearchTransactionsList.length) {
              return props.groupTransactionsList.map((groupTransaction) => {
                const {
                  id,
                  transaction_type,
                  transaction_date,
                  big_category_name,
                  medium_category_name,
                  custom_category_name,
                  amount,
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
                      {shop}
                    </td>
                    <td className="daily-history__td" align="center">
                      {memo}
                    </td>
                  </tr>
                );
              });
            } else {
              return props.groupSearchTransactionsList.map((groupSearchTransaction) => {
                const {
                  id,
                  transaction_type,
                  transaction_date,
                  big_category_name,
                  medium_category_name,
                  custom_category_name,
                  amount,
                  shop,
                  memo,
                } = groupSearchTransaction;

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
                      {shop}
                    </td>
                    <td className="daily-history__td" align="center">
                      {memo}
                    </td>
                  </tr>
                );
              });
            }
          })()}
        </tbody>
      </table>
    </>
  );
};
export default GroupDailyHistoryBody;
