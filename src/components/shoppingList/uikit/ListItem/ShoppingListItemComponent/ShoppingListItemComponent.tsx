import React, { useEffect, useState } from 'react';
import './shopping-list-item-component.scss';
import { ShoppingListItem } from '../../../../../reducks/shoppingList/types';
import EditShoppingListModal from './EditShoppingListModal/EditShoppingListModal';
import { dateStringToDate } from '../../../../../lib/date';
import CheckedShoppingListItemModal from './CheckedShoppingListItemModal/CheckedShoppingListItemModal';

interface ShoppingListItemComponentProps {
  listItem: ShoppingListItem;
  displayPurchaseDate: boolean;
  currentYearMonth: string;
}

const ShoppingListItemComponent = (props: ShoppingListItemComponentProps) => {
  const initialExpectedPurchaseDate: Date = dateStringToDate(props.listItem.expected_purchase_date);
  const initialPurchase = props.listItem.purchase;
  const initialShop = props.listItem.shop;
  const initialAmount = props.listItem.amount === null ? null : String(props.listItem.amount);
  const initialBigCategoryId = props.listItem.big_category_id;
  const initialBigCategoryName = props.listItem.big_category_name;
  const initialMediumCategoryId = props.listItem.medium_category_id;
  const initialCustomCategoryId = props.listItem.custom_category_id;
  const initialTransactionAutoAdd = props.listItem.transaction_auto_add;

  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<Date | null>(
    initialExpectedPurchaseDate
  );
  const [checked, setChecked] = useState(false);
  const [purchase, setPurchase] = useState<string>(initialPurchase);
  const [shop, setShop] = useState<string | null>(initialShop);
  const [amount, setAmount] = useState<string | null>(initialAmount);
  const [bigCategoryId, setBigCategoryId] = useState<number>(initialBigCategoryId);
  const [bigCategory, setBigCategory] = useState<string | null>(initialBigCategoryName);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(initialMediumCategoryId);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(initialCustomCategoryId);
  const [transactionAutoAdd, setTransactionAutoAdd] = useState<boolean>(initialTransactionAutoAdd);

  useEffect(() => {
    setChecked(props.listItem.complete_flag);
  }, [props.listItem.complete_flag]);

  const currentPurchaseTextStyle = () => {
    if (checked) {
      return { textDecoration: 'line-through' };
    }
  };

  return (
    <>
      {props.displayPurchaseDate && (
        <p className="shopping-list-item-component__date">
          {props.listItem.expected_purchase_date}
        </p>
      )}
      <div className="shopping-list-item-component__content">
        <CheckedShoppingListItemModal
          listItem={props.listItem}
          currentYearMonth={props.currentYearMonth}
          initialExpectedPurchaseDate={initialExpectedPurchaseDate}
          initialPurchase={initialPurchase}
          initialShop={initialShop}
          initialAmount={initialAmount}
          initialBigCategoryId={initialBigCategoryId}
          initialBigCategoryName={initialBigCategoryName}
          initialMediumCategoryId={initialMediumCategoryId}
          initialCustomCategoryId={initialCustomCategoryId}
          initialTransactionAutoAdd={initialTransactionAutoAdd}
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
        />
        <span className="shopping-list-item-component__purchase" style={currentPurchaseTextStyle()}>
          {props.listItem.purchase}
        </span>
        <span className="shopping-list-item-component__amount--value">
          {props.listItem.amount === null ? '-' : props.listItem.amount}
        </span>
        <span className="shopping-list-item-component__amount--unit">円</span>

        <EditShoppingListModal
          listItem={props.listItem}
          currentYearMonth={props.currentYearMonth}
          initialExpectedPurchaseDate={initialExpectedPurchaseDate}
          initialPurchase={initialPurchase}
          initialShop={initialShop}
          initialAmount={initialAmount}
          initialBigCategoryId={initialBigCategoryId}
          initialBigCategoryName={initialBigCategoryName}
          initialMediumCategoryId={initialMediumCategoryId}
          initialCustomCategoryId={initialCustomCategoryId}
          initialTransactionAutoAdd={initialTransactionAutoAdd}
          expectedPurchaseDate={expectedPurchaseDate}
          purchase={purchase}
          shop={shop}
          amount={amount}
          bigCategoryId={bigCategoryId}
          bigCategory={bigCategory}
          mediumCategoryId={mediumCategoryId}
          customCategoryId={customCategoryId}
          transactionAutoAdd={transactionAutoAdd}
          setExpectedPurchaseDate={setExpectedPurchaseDate}
          setPurchase={setPurchase}
          setShop={setShop}
          setAmount={setAmount}
          setBigCategoryId={setBigCategoryId}
          setBigCategory={setBigCategory}
          setMediumCategoryId={setMediumCategoryId}
          setCustomCategoryId={setCustomCategoryId}
          setTransactionAutoAdd={setTransactionAutoAdd}
        />
      </div>
    </>
  );
};

export default ShoppingListItemComponent;
