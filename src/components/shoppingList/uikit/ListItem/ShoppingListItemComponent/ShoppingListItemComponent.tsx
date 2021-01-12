import React, { useEffect, useState } from 'react';
import './shopping-list-item-component.scss';
import { ShoppingListItem } from '../../../../../reducks/shoppingList/types';
import EditShoppingListModal from '../../Modal/EditShoppingListModal/EditShoppingListModal';
import { useDispatch } from 'react-redux';
import { editShoppingListItem } from '../../../../../reducks/shoppingList/operations';
import { date } from '../../../../../lib/constant';
import axios from 'axios';
import { dateStringToDate } from '../../../../../lib/date';

interface ShoppingListItemComponentProps {
  listItem: ShoppingListItem;
  displayPurchaseDate: boolean;
  currentYearMonth: string;
}

const ShoppingListItemComponent = (props: ShoppingListItemComponentProps) => {
  const dispatch = useDispatch();

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
  const signal = axios.CancelToken.source();

  useEffect(() => {
    setChecked(props.listItem.complete_flag);
  }, [props.listItem.complete_flag]);

  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(
      editShoppingListItem(
        date,
        props.currentYearMonth,
        props.listItem.id,
        expectedPurchaseDate,
        event.target.checked,
        purchase,
        shop,
        Number(amount),
        bigCategoryId,
        mediumCategoryId,
        customCategoryId,
        props.listItem.regular_shopping_list_id,
        transactionAutoAdd,
        props.listItem.related_transaction_data,
        signal
      )
    );
  };

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
        <label className="shopping-list-item-component__check">
          <input type="checkbox" checked={checked} onChange={handleCheckedChange} />
          <span />
        </label>
        <span className="shopping-list-item-component__purchase" style={currentPurchaseTextStyle()}>
          {props.listItem.purchase}
        </span>
        <span className="shopping-list-item-component__amount">{props.listItem.amount}円</span>
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
