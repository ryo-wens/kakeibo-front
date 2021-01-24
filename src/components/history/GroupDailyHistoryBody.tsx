import React from 'react';
import { GroupTransactionsList } from '../../reducks/groupTransactions/types';
import EditTransactionModalContainer from '../../containers/home/modal/EditTransactionModalContainer';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import '../../templates/history/daily/daily-history.scss';

interface GroupDailyHistoryBodyProps {
  userId: string;
  open: boolean;
  openId: number | undefined;
  groupTransactionsList: GroupTransactionsList;
  openModal: (transactionId: number) => void;
  closeModal: () => void;
  payerUser: (payerId: string) => string;
}

const GroupDailyHistoryBody = (props: GroupDailyHistoryBodyProps) => {
  return (
    <>
      {props.groupTransactionsList.length !== 0 && (
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
              const categoryName = {
                bigCategory: groupTransaction.big_category_name,
                mediumCategory:
                  groupTransaction.medium_category_name !== null
                    ? groupTransaction.medium_category_name
                    : '',
                customCategory:
                  groupTransaction.custom_category_name !== null
                    ? groupTransaction.custom_category_name
                    : '',
              };

              return (
                <tr key={groupTransaction.id} className="daily-history__tr">
                  <td className="daily-history__td" align="center">
                    <IconButton onClick={() => props.openModal(groupTransaction.id)}>
                      <CreateIcon color="primary" />
                    </IconButton>
                    <EditTransactionModalContainer
                      id={groupTransaction.id}
                      onClose={props.closeModal}
                      open={props.openId === groupTransaction.id && props.open}
                      amount={groupTransaction.amount}
                      memo={groupTransaction.memo !== null ? groupTransaction.memo : ''}
                      shop={groupTransaction.shop !== null ? groupTransaction.shop : ''}
                      categoryName={categoryName}
                      transactionDate={groupTransaction.transaction_date}
                      transactionsType={groupTransaction.transaction_type}
                      paymentUserId={props.userId}
                      bigCategoryId={groupTransaction.big_category_id}
                      mediumCategoryId={groupTransaction.medium_category_id}
                      customCategoryId={groupTransaction.custom_category_id}
                    />
                  </td>
                  <td className="daily-history__td" align="center">
                    {groupTransaction.transaction_date}
                  </td>
                  <td className="daily-history__td" align="center">
                    {groupTransaction.medium_category_name || groupTransaction.custom_category_name}
                  </td>
                  <td className="daily-history__td" align="center">
                    {groupTransaction.amount}
                  </td>
                  <td className="daily-history__td" align="center">
                    {props.payerUser(groupTransaction.payment_user_id)}
                  </td>
                  <td className="daily-history__td" align="center">
                    {groupTransaction.shop}
                  </td>
                  <td className="daily-history__td" align="center">
                    {groupTransaction.memo}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
export default GroupDailyHistoryBody;
