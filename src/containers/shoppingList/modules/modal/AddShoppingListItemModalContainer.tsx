import React, { useState } from 'react';
import { customDate, customMonth, date, year } from '../../../../lib/constant';
import AddShoppingListItemModal from '../../../../components/shoppingList/modules/modal/addShoppingListItemModal/AddShoppingListItemModal';
import { useDispatch } from 'react-redux';
import { addShoppingListItem } from '../../../../reducks/shoppingList/operations';
import {
  AddShoppingListItemReq,
  FetchShoppingListParams,
} from '../../../../reducks/shoppingList/types';
import { useFetchShoppingList } from '../../../../hooks/shoppingList/useFetchShoppingList';
import { generateZeroPaddingMonth } from '../../../../lib/date';

interface AddShoppingListItemFormContainerProps {
  selectedYear: number;
  selectedMonth: number;
}

const initialState = {
  initialExpectedPurchaseDate: date,
  initialPurchase: '',
  initialAmount: null,
  initialBigCategoryId: 0,
  initialBigCategoryName: '',
  initialBigCategoryIndex: 0,
  initialMediumCategoryId: null,
  initialCustomCategoryId: null,
  initialAssociatedCategory: '',
  initialShop: null,
  initialTransactionAutoAdd: false,
};

const AddShoppingListItemModalContainer = (props: AddShoppingListItemFormContainerProps) => {
  const dispatch = useDispatch();
  const { fetchShoppingList } = useFetchShoppingList();

  const selectedYearParam = String(props.selectedYear);
  const selectedMonthParam = generateZeroPaddingMonth(props.selectedMonth);

  const [open, setOpen] = useState(false);
  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(
    initialState.initialExpectedPurchaseDate
  );
  const [purchase, setPurchase] = useState<string>(initialState.initialPurchase);
  const [amount, setAmount] = useState<string | null>(initialState.initialAmount);
  const [bigCategoryId, setBigCategoryId] = useState<number>(initialState.initialBigCategoryId);
  const [bigCategory, setBigCategory] = useState<string | null>(
    initialState.initialBigCategoryName
  );
  const [bigCategoryIndex, setBigCategoryIndex] = useState<number>(
    initialState.initialBigCategoryIndex
  );
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(
    initialState.initialMediumCategoryId
  );
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(
    initialState.initialCustomCategoryId
  );
  const [associatedCategory, setAssociatedCategory] = useState<string>(
    initialState.initialAssociatedCategory
  );
  const [shop, setShop] = useState<string | null>(initialState.initialShop);
  const [transactionAutoAdd, setTransactionAutoAdd] = useState<boolean>(
    initialState.initialTransactionAutoAdd
  );

  const handleOpenModal = () => {
    setOpen(true);
    setExpectedPurchaseDate(initialState.initialExpectedPurchaseDate);
    setPurchase(initialState.initialPurchase);
    setAmount(initialState.initialAmount);
    setBigCategoryId(initialState.initialBigCategoryId);
    setBigCategory(initialState.initialBigCategoryName);
    setMediumCategoryId(initialState.initialMediumCategoryId);
    setAssociatedCategory(initialState.initialAssociatedCategory);
    setCustomCategoryId(initialState.initialCustomCategoryId);
    setShop(initialState.initialShop);
    setTransactionAutoAdd(initialState.initialTransactionAutoAdd);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handlePurchaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurchase(event.target.value);
  };

  const handleDateChange = (expectedPurchaseDate: Date | null) => {
    setExpectedPurchaseDate(expectedPurchaseDate);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      return setAmount(initialState.initialAmount);
    }

    return setAmount(event.target.value);
  };

  const handleShopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      return setShop(initialState.initialShop);
    }

    return setShop(event.target.value);
  };

  const handleAutoAddTransitionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionAutoAdd(event.target.checked);
  };

  const handleAddShoppingListItem = async () => {
    const params: FetchShoppingListParams = {
      currentYear: String(year),
      currentMonth: customMonth,
      currentDate: customDate,
      selectedYear: selectedYearParam,
      selectedMonth: selectedMonthParam,
    };

    const requestData: AddShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      purchase: purchase,
      shop: shop,
      amount: typeof amount === 'string' ? Number(amount) : amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      transaction_auto_add: transactionAutoAdd,
    };

    try {
      await dispatch(addShoppingListItem(requestData));
      await fetchShoppingList(params);

      handleCloseModal();
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
  };

  const unInput =
    expectedPurchaseDate === null ||
    purchase === initialState.initialPurchase ||
    bigCategoryId === initialState.initialBigCategoryId;

  return (
    <AddShoppingListItemModal
      open={open}
      expectedPurchaseDate={expectedPurchaseDate}
      purchase={purchase}
      shop={shop}
      amount={amount}
      bigCategoryId={bigCategoryId}
      bigCategory={bigCategory}
      bigCategoryIndex={bigCategoryIndex}
      transactionAutoAdd={transactionAutoAdd}
      associatedCategory={associatedCategory}
      handlePurchaseChange={handlePurchaseChange}
      handleDateChange={handleDateChange}
      handleAmountChange={handleAmountChange}
      handleShopChange={handleShopChange}
      handleAutoAddTransitionChange={handleAutoAddTransitionChange}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      unInput={unInput}
      setBigCategory={setBigCategory}
      setBigCategoryId={setBigCategoryId}
      setCustomCategoryId={setCustomCategoryId}
      setMediumCategoryId={setMediumCategoryId}
      setBigCategoryIndex={setBigCategoryIndex}
      setAssociatedCategory={setAssociatedCategory}
      handleAddShoppingListItem={handleAddShoppingListItem}
    />
  );
};

export default AddShoppingListItemModalContainer;
