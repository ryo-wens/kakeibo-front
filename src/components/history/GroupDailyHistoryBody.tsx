import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../reducks/store/types';
import { GroupTransactionsList } from '../../reducks/groupTransactions/types';
import EditTransactionModal from '../../components/uikit/EditTransactionModal';
import { fetchGroupCategories } from '../../reducks/groupCategories/operations';
import {
  getGroupIncomeCategories,
  getGroupExpenseCategories,
} from '../../reducks/groupCategories/selectors';
import { getPathGroupId, getPathTemplateName } from '../../lib/path';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import '../../assets/history/daily-history.scss';

interface GroupDailyHistoryBodyProps {
  groupTransactionsList: GroupTransactionsList;
  selectYears: number;
}
const GroupDailyHistoryBody = (props: GroupDailyHistoryBodyProps) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const groupIncomeCategories = getGroupIncomeCategories(selector);
  const groupExpenseCategories = getGroupExpenseCategories(selector);
  const groupId = getPathGroupId(window.location.pathname);
  const pathName = getPathTemplateName(window.location.pathname);
  const [open, setOpen] = useState<boolean>(false);
  const [openId, setOpnId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (pathName === 'group' && !groupIncomeCategories.length && !groupExpenseCategories.length)
      dispatch(fetchGroupCategories(groupId));
  }, [pathName]);

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
      <h3>{props.selectYears} 年</h3>
      <table className="daily-history">
        <tbody>
          <tr>
            <td className="daily-history__th" align="center">
              編集
            </td>
            <td className="daily-history__th" align="center">
              集計
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
          {props.groupTransactionsList.map((groupTransaction) => {
            const {
              id,
              transaction_type,
              transaction_date,
              medium_category_name,
              custom_category_name,
              amount,
              shop,
              memo,
            } = groupTransaction;

            const categoryName = {
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
                  />
                </td>
                <td className="daily-history__td" scope="row" align="center">
                  <IconButton size={'small'} onClick={() => console.log('test')}>
                    <AddCircleOutlineIcon color={'primary'} />
                  </IconButton>
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
          })}
        </tbody>
      </table>
    </>
  );
};
export default GroupDailyHistoryBody;