import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { editTransactions } from '../../reducks/transactions/operations';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { GenericButton, DatePicker, CategoryInput, TextInput, KindSelectBox } from '../uikit/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: '#fff',
      boxShadow: 'none',
      overflow: 'hidden',
      margin: '0 auto',
      marginTop: '10%',
      maxWidth: 550,
      height: 'auto',
      border: '1px solid #000',
      padding: theme.spacing(1, 2, 2),
    },
    buttonPosition: {
      textAlign: 'center',
    },
    smallSpaceRight: {
      marginRight: 40,
    },
    smallSpaceTop: {
      marginTop: 50,
    },
    textPosition: {
      textAlign: 'center',
    },
    delimiterLine: {
      borderBottom: '1px solid',
    },
  })
);

interface InputModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
  transactionDate: Date;
  amount: number;
  memo?: string | null;
  shop?: string | null;
  transactionsType: string;
  bigCategoryId: string;
  mediumCategoryId?: string | null;
  customCategoryId?: string | null;
}

const InputModal = (props: InputModalProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<string>(String(props.amount));
  const [memo, setMemo] = useState<string>('');
  const [shop, setShop] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [transactionDate, setTransactionDate] = useState<Date | null>(props.transactionDate);
  const [transactionsType, setTransactionType] = useState<string>(props.transactionsType);
  const [bigCategoryId, setBigCategoryId] = useState<number>(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);
  const id = props.id;

  const handleAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(event.target.value);
    },
    [setAmount]
  );
  const handleMemo = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMemo(event.target.value);
    },
    [setMemo]
  );
  const handleShop = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setShop(event.target.value);
    },
    [setShop]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setCategory(event.target.value as string);
    },
    [setCategory]
  );

  const handleSelect = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setTransactionType(event.target.value as string);
    },
    [setTransactionType]
  );

  const handleDateChange = useCallback(
    (transactionDate: Date | null) => {
      setTransactionDate(transactionDate as Date);
    },
    [setTransactionDate]
  );

  const selectCategory = useCallback(
    (bigCategoryId: number, associatedCategoryId: number | null, category_type: string) => {
      switch (category_type) {
        case 'IncomeBigCategory':
          setBigCategoryId(bigCategoryId);
          setMediumCategoryId(null);
          setCustomCategoryId(null);
          break;
        case 'ExpenseBigCategory':
          setBigCategoryId(bigCategoryId);
          setMediumCategoryId(null);
          setCustomCategoryId(null);
          break;
        case 'MediumCategory':
          setBigCategoryId(bigCategoryId);
          setMediumCategoryId(associatedCategoryId);
          setCustomCategoryId(null);
          break;
        case 'CustomCategory':
          setBigCategoryId(bigCategoryId);
          setMediumCategoryId(null);
          setCustomCategoryId(associatedCategoryId);
          break;
      }
    },
    [setBigCategoryId, setMediumCategoryId, setCustomCategoryId]
  );

  const body = (
    <div className={classes.paper}>
      <h3 className={classes.textPosition} id="simple-modal-title">
        家計簿の編集
      </h3>
      <div className={classes.delimiterLine} />
      <div className={classes.smallSpaceTop} />
      <form className="grid__column">
        <DatePicker
          id={'date'}
          label={'日付'}
          value={transactionDate}
          onChange={handleDateChange}
          required={false}
        />
        <KindSelectBox value={transactionsType} onChange={handleSelect} required={false} />
        <TextInput
          id={'amount'}
          label={'金額'}
          type={'tell'}
          required={false}
          fullWidth={false}
          onChange={handleAmountChange}
          value={amount}
        />
        <CategoryInput
          kind={transactionsType}
          value={category}
          onChange={handleChange}
          onClick={selectCategory}
          required={false}
        />
        <TextInput
          id={'shop'}
          label={'店名'}
          type={'text'}
          required={false}
          fullWidth={false}
          onChange={handleShop}
          value={shop}
        />
        <TextInput
          id={'memo'}
          label={'メモ'}
          type={'text'}
          required={false}
          fullWidth={false}
          onChange={handleMemo}
          value={memo}
        />
      </form>
      <div className={classes.smallSpaceTop} />
      <div className={classes.buttonPosition}>
        <GenericButton
          label={'更新する'}
          onClick={() =>
            dispatch(
              editTransactions(
                id,
                transactionsType,
                transactionDate,
                shop,
                memo,
                amount,
                bigCategoryId,
                mediumCategoryId,
                customCategoryId
              )
            ) && props.onClose()
          }
          disabled={false}
        />
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        onBackdropClick={props.onClose}
        disableBackdropClick={false}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};
export default InputModal;
