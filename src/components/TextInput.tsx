import React, { useState, useCallback } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { InputButton, DatePicker, CategoryInput } from './uikit/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      fontSize: 15,
      fontWeight: 600,
      width: 225,
      marginBottom: 20,
    },
  })
);

const TextInput = () => {
  const [price, setPrice] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const addEntry = useCallback(
    (
      price: string,
      memo: string,
      category: string,
      selectedDate: Date | null
    ) => {
      console.log(price, memo, category, selectedDate);
    },
    []
  );

  const handlePriceChange = (event: React.ChangeEvent<{ value: string }>) => {
    setPrice(event.target.value as string);
  };

  const handleMemo = (event: React.ChangeEvent<{ value: string }>) => {
    setMemo(event.target.value as string);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const classes = useStyles();

  return (
    <form className="grid__column" autoComplete="on">
      <DatePicker
        id={'date-picker-dialog'}
        label={'日付'}
        value={selectedDate}
        onChange={handleDateChange}
      />
      <TextField
        className={classes.text}
        value={price}
        type={'tel'}
        id={'price'}
        label={'金額'}
        onChange={handlePriceChange}
      />
      <CategoryInput value={category} onChange={handleChange} />
      <TextField
        className={classes.text}
        value={memo}
        type={'text'}
        id={'memo'}
        label={'メモ'}
        onChange={handleMemo}
      />
      <InputButton
        onClick={() => addEntry(price, memo, category, selectedDate)}
        label={'入力する'}
      />
    </form>
  );
};
export default TextInput;
