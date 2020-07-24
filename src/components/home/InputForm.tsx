import React, { useState, useCallback } from 'react';
import {
  GenericButton,
  DatePicker,
  CategoryInput,
  TextInput,
  KindSelector,
} from '../uikit/index';

const InputForm = () => {
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

  const handlePriceChange = (event: React.ChangeEvent<{ value: string }>) => {
    setPrice(event.target.value as string);
  };

  const handleMemo = (event: React.ChangeEvent<{ value: string }>) => {
    setMemo(event.target.value as string);
  };

  const handleShop = (event: React.ChangeEvent<{ value: string }>) => {
    setShop(event.target.value as string);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
  };

  const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setKind(event.target.value as string);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const unInput = price === '' || category === '' || kind === '';

  return (
    <form className="grid__column box__input box-right" autoComplete="on">
      <h3>入力フォーム</h3>
      <DatePicker
        id={'date-picker-dialog'}
        label={'日付'}
        value={selectedDate}
        onChange={handleDateChange}
        required={true}
      />
      <KindSelector onChange={handleSelect} required={true} value={kind} />
      <TextInput
        value={price}
        type={'tel'}
        id={'price'}
        label={'金額'}
        onChange={handlePriceChange}
        required={true}
        fullWidth={false}
      />
      <CategoryInput value={category} onChange={handleChange} required={true} />
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
        onClick={() =>
          addEntry(price, memo, category, selectedDate, shop, kind)
        }
        label={'入力する'}
        disabled={unInput}
      />
    </form>
  );
};
export default InputForm;
