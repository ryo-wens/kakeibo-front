import React, { useState, useCallback } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { GenericButton, DatePicker, CategoryInput, TextInput, KindSelectBox } from '../uikit/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: '0 auto',
      marginTop: '10%',
      maxWidth: 550,
      height: 'auto',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      padding: theme.spacing(1, 2, 2),
    },
    buttonPosition: {
      display: 'flex',
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

const InputModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [shop, setShop] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [transactionDate, setTransactionDate] = useState<Date | null>(new Date());
  const [transactionsType, setTransactionType] = useState<string>('');
  const [bigCategoryId, setBigCategoryId] = useState<number>(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

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
        <IconButton
          className={classes.smallSpaceRight}
          color={'inherit'}
          onClick={() => console.log(bigCategoryId, mediumCategoryId, customCategoryId)}
          size={'small'}
        >
          <DeleteIcon />
          削除する
        </IconButton>
        <GenericButton label={'更新する'} onClick={handleClose} disabled={false} />
      </div>
    </div>
  );

  return (
    <div>
      <IconButton type="button" color="primary" size="small" onClick={handleOpen}>
        <CreateIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};
export default InputModal;
