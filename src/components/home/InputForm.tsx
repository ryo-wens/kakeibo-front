import React, { useState, useCallback } from 'react';
import { GenericButton, DatePicker, CategoryInput, TextInput, KindSelectBox } from '../uikit/index';
import { useDispatch } from 'react-redux';
import { addTransactions } from '../../reducks/transactions/operations';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles({
  link: {
    cursor: 'pointer',
    color: '#154bd4',
    textDecoration: 'underLine',
  },
});
const InputForm = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [shop, setShop] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [transactionDate, setTransactionDate] = useState<Date | null>(new Date());
  const [transactionsType, setTransactionType] = useState<string>('');
  const [bigCategoryId, setBigCategoryId] = useState<number>(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);

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
  const resetInputForm = useCallback(() => {
    setAmount('');
    setTransactionType('');
    setCategory('');
    setShop('');
    setMemo('');
  }, [setAmount, setTransactionType, setCategory, setShop, setMemo]);

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

  return (
    <form className="grid__column box__input" autoComplete="on">
      <h3>入力フォーム</h3>
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
      <GenericButton
        startIcon={<AddCircleOutlineIcon />}
        onClick={() =>
          dispatch(
            addTransactions(
              transactionsType,
              transactionDate,
              shop,
              memo,
              amount,
              bigCategoryId,
              mediumCategoryId,
              customCategoryId
            )
          ) && resetInputForm()
        }
        label={'入力する'}
        disabled={unInput}
      />
      <a className={classes.link} onClick={() => dispatch(push('/big-categories'))}>
        カテゴリーを追加する
      </a>
    </form>
  );
};
export default InputForm;
