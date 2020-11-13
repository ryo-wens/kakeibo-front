import React, { useState } from 'react';
import { TransactionsList } from '../../reducks/transactions/types';
import EditTransactionModal from '../../components/uikit/EditTransactionModal';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import '../../assets/history/daily-history.scss';

interface DailyHistoryBodyProps {
  transactionsList: TransactionsList;
}
const DailyHistoryBody = (props: DailyHistoryBodyProps) => {
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
    <tbody>
      {props.transactionsList.map((transaction) => {
        const {
          id,
          transaction_type,
          transaction_date,
          medium_category_name,
          custom_category_name,
          amount,
          shop,
          memo,
        } = transaction;

        const categoryName = {
          mediumCategory: medium_category_name !== null ? medium_category_name : '',
          customCategory: custom_category_name !== null ? custom_category_name : '',
        };

        return (
          <tr key={id} className="daily-history__tr">
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
          </tr>
        );
      })}
    </tbody>
  );
};
export default DailyHistoryBody;
