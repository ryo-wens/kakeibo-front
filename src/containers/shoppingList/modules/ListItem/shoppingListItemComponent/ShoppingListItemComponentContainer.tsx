import React, { useEffect, useState } from 'react';
import { ShoppingListItem } from '../../../../../reducks/shoppingList/types';
import { dateStringToDate } from '../../../../../lib/date';
import ShoppingListItemComponent from '../../../../../components/shoppingList/modules/listItem/ShoppingListItemComponent/ShoppingListItemComponent';
import { useLocation } from 'react-router';

interface ShoppingListItemComponentContainerProps {
  listItem: ShoppingListItem;
  currentYear: string;
  currentMonth: string;
  purchaseClassName: string;
  amountClassName: string;
}

const ShoppingListItemComponentContainer = (props: ShoppingListItemComponentContainerProps) => {
  const initialState = {
    initialExpectedPurchaseDate: dateStringToDate(props.listItem.expected_purchase_date),
    initialPurchase: props.listItem.purchase,
    initialShop: props.listItem.shop,
    initialAmount: props.listItem.amount === null ? null : String(props.listItem.amount),
    initialBigCategoryId: props.listItem.big_category_id,
    initialBigCategoryName: props.listItem.big_category_name,
    initialMediumCategoryId: props.listItem.medium_category_id,
    initialCustomCategoryId: props.listItem.custom_category_id,
    initialTransactionAutoAdd: props.listItem.transaction_auto_add,
  };

  const pathNames = useLocation().pathname.split('/');
  const currentPage = pathNames.slice(-1)[0];

  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(
    initialState.initialExpectedPurchaseDate
  );
  const [checked, setChecked] = useState(false);
  const [purchase, setPurchase] = useState<string>(initialState.initialPurchase);
  const [shop, setShop] = useState<string | null>(initialState.initialShop);
  const [amount, setAmount] = useState<string | null>(initialState.initialAmount);
  const [bigCategoryId, setBigCategoryId] = useState<number>(initialState.initialBigCategoryId);
  const [bigCategory, setBigCategory] = useState<string | null>(
    initialState.initialBigCategoryName
  );
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(
    initialState.initialMediumCategoryId
  );
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(
    initialState.initialCustomCategoryId
  );
  const [transactionAutoAdd, setTransactionAutoAdd] = useState<boolean>(
    initialState.initialTransactionAutoAdd
  );

  useEffect(() => {
    setChecked(props.listItem.complete_flag);
  }, [props.listItem.complete_flag]);

  return (
    <ShoppingListItemComponent
      listItem={props.listItem}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      initialExpectedPurchaseDate={initialState.initialExpectedPurchaseDate}
      initialPurchase={initialState.initialPurchase}
      initialShop={initialState.initialShop}
      initialAmount={initialState.initialAmount}
      initialBigCategoryId={initialState.initialBigCategoryId}
      initialBigCategoryName={initialState.initialBigCategoryName}
      initialMediumCategoryId={initialState.initialMediumCategoryId}
      initialCustomCategoryId={initialState.initialCustomCategoryId}
      initialTransactionAutoAdd={initialState.initialTransactionAutoAdd}
      expectedPurchaseDate={expectedPurchaseDate}
      checked={checked}
      purchase={purchase}
      shop={shop}
      amount={amount}
      bigCategoryId={bigCategoryId}
      bigCategory={bigCategory}
      mediumCategoryId={mediumCategoryId}
      customCategoryId={customCategoryId}
      transactionAutoAdd={transactionAutoAdd}
      setExpectedPurchaseDate={setExpectedPurchaseDate}
      setChecked={setChecked}
      setPurchase={setPurchase}
      setShop={setShop}
      setAmount={setAmount}
      setBigCategoryId={setBigCategoryId}
      setBigCategory={setBigCategory}
      setMediumCategoryId={setMediumCategoryId}
      setCustomCategoryId={setCustomCategoryId}
      setTransactionAutoAdd={setTransactionAutoAdd}
      currentPage={currentPage}
      purchaseClassName={props.purchaseClassName}
      amountClassName={props.amountClassName}
    />
  );
};

export default ShoppingListItemComponentContainer;
