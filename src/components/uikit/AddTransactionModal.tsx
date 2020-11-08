import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GenericButton, DatePicker, CategoryInput, TextInput, KindSelectBox } from '../uikit/index';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { addTransactions, addLatestTransactions } from '../../reducks/transactions/operations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: '#fff',
      boxShadow: 'none',
      overflow: 'hidden',
      margin: '0 auto',
      marginTop: '10%',
      maxWidth: 500,
      height: 'auto',
      border: '1px solid #000',
      padding: theme.spacing(1, 2, 2),
    },
    buttonPosition: {
      textAlign: 'center',
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

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  selectDate: Date;
}

const AddTransactionModal = (props: AddTransactionModalProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [shop, setShop] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [transactionDate, setTransactionDate] = useState<Date | null>(props.selectDate);
  const [transactionsType, setTransactionType] = useState<string>('');
  const [bigCategoryId, setBigCategoryId] = useState<number>(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);

  useEffect(() => {
    setTransactionDate(props.selectDate);
  }, [props.selectDate]);

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

  const unInput = amount === '' || category === '' || transactionsType === '';

  const clicked = () => {
    async function addTransaction() {
      await dispatch(
        addLatestTransactions(
          transactionsType,
          transactionDate,
          shop,
          memo,
          amount,
          bigCategoryId,
          mediumCategoryId,
          customCategoryId
        )
      );
      dispatch(addTransactions());
      props.onClose();
    }
    addTransaction();
  };

  const body = (
    <div className={classes.paper}>
      <h3 className={classes.textPosition}>家計簿の追加</h3>
      <div className={classes.delimiterLine} />
      <div className={classes.smallSpaceTop} />

      <form className="grid__column">
        <DatePicker
          id={'date-picker-dialog'}
          label={'日付(必須)'}
          value={transactionDate}
          onChange={handleDateChange}
          required={true}
        />
        <KindSelectBox onChange={handleSelect} required={true} value={transactionsType} />
        <TextInput
          value={amount}
          type={'tel'}
          id={'amount'}
          label={'金額(必須)'}
          onChange={handleAmountChange}
          required={true}
          fullWidth={false}
        />
        <CategoryInput
          value={category}
          onClick={selectCategory}
          onChange={handleChange}
          required={true}
          kind={transactionsType}
        />
        <TextInput
          value={shop}
          type={'text'}
          id={'shop'}
          label={'店名(任意)'}
          onChange={handleShop}
          required={false}
          fullWidth={false}
        />
        <TextInput
          value={memo}
          type={'text'}
          id={'memo'}
          label={'メモ(任意)'}
          onChange={handleMemo}
          required={false}
          fullWidth={false}
        />
      </form>
      <div className={classes.buttonPosition}>
        <GenericButton
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => clicked()}
          label={'追加する'}
          disabled={unInput}
        />
      </div>
    </div>
  );

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};
export default AddTransactionModal;