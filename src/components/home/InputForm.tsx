import React, { useState, useCallback } from 'react';
import { GenericButton, DatePicker, CategoryInput, TextInput, KindSelectBox } from '../uikit/index';
import { useDispatch } from 'react-redux';
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
  const [price, setPrice] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [shop, setShop] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [kind, setKind] = useState<string>('');

  const addEntry = useCallback(
    (
      price: string,
      memo: string,
      category: string,
      selectedDate: Date | null,
      shop: string,
      kind: string
    ) => {
      const foo = JSON.stringify(selectedDate);
      console.log(foo, kind, price, category, shop, memo);
    },
    []
  );

  const handlePriceChange =useCallback( (event: React.ChangeEvent<{ value: string }>) => {
    setPrice(event.target.value as string);
  },[setPrice])

  const handleMemo =useCallback( (event: React.ChangeEvent<{ value: string }>) => {
    setMemo(event.target.value as string);
  },[setMemo])

  const handleShop =useCallback( (event: React.ChangeEvent<{ value: string }>) => {
    setShop(event.target.value as string);
  },[setShop])

  const handleChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
  },[setCategory])

  const handleSelect =useCallback( (event: React.ChangeEvent<{ value: unknown }>) => {
    setKind(event.target.value as string);
  },[setKind])

  const handleDateChange =useCallback( (date: Date | null) => {
    setSelectedDate(date);
  },[setSelectedDate])

  const unInput = price === '' || category === '' || kind === '';

  return (
    <form className="grid__column box__input" autoComplete="on">
      <h3>入力フォーム</h3>
      <DatePicker
        id={'date-picker-dialog'}
        label={'日付(必須)'}
        value={selectedDate}
        onChange={handleDateChange}
        required={true}
      />
      <KindSelectBox onChange={handleSelect} required={true} value={kind} />
      <TextInput
        value={price}
        type={'tel'}
        id={'price'}
        label={'金額(必須)'}
        onChange={handlePriceChange}
        required={true}
        fullWidth={false}
      />
      <CategoryInput value={category} onChange={handleChange} required={true} kind={kind} />
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
        startIcon={<AddCircleOutlineIcon/>}
        onClick={() => addEntry(price, memo, category, selectedDate, shop, kind)}
        label={'入力する'}
        disabled={unInput}
      />
      <a className={classes.link} onClick={() => dispatch(push('/big-categories'))}>
        ＋カテゴリーを追加する
      </a>
    </form>
  );
};
export default InputForm;
