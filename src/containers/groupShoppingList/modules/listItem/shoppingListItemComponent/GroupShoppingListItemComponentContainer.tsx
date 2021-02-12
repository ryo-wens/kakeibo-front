import React, { useEffect, useState } from 'react';
import { dateStringToDate } from '../../../../../lib/date';
import { GroupShoppingListItem } from '../../../../../reducks/groupShoppingList/types';
import { useSelector } from 'react-redux';
import { getApprovedGroups } from '../../../../../reducks/groups/selectors';
import { useParams } from 'react-router';
import GroupShoppingListItemComponent from '../../../../../components/groupShoppingList/modules/listItem/shoppingListItemComponent/GroupShoppingListItemComponent';

interface GroupShoppingListItemComponentContainerProps {
  listItem: GroupShoppingListItem;
  currentYearMonth: string;
  purchaseClassName: string;
  amountClassName: string;
  transactionDataItemClassName: string;
  transactionDataItemKeyClassName: string;
}

const GroupShoppingListItemComponentContainer = (
  props: GroupShoppingListItemComponentContainerProps
) => {
  const approvedGroups = useSelector(getApprovedGroups);
  const { group_id } = useParams();

  const initialState = {
    initialExpectedPurchaseDate: dateStringToDate(props.listItem.expected_purchase_date),
    initialPurchase: props.listItem.purchase,
    initialShop: props.listItem.shop,
    initialAmount: props.listItem.amount === null ? null : String(props.listItem.amount),
    initialBigCategoryId: props.listItem.big_category_id,
    initialBigCategoryName: props.listItem.big_category_name,
    initialMediumCategoryId: props.listItem.medium_category_id,
    initialCustomCategoryId: props.listItem.custom_category_id,
    initialPaymentUser: props.listItem.payment_user_id,
    initialTransactionAutoAdd: props.listItem.transaction_auto_add,
  };

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
  const [paymentUser, setPaymentUser] = useState<string | null>(initialState.initialPaymentUser);
  const [transactionAutoAdd, setTransactionAutoAdd] = useState<boolean>(
    initialState.initialTransactionAutoAdd
  );

  useEffect(() => {
    setChecked(props.listItem.complete_flag);
  }, [props.listItem.complete_flag]);

  const currentTextStyle = (completeFlag: boolean) => {
    if (completeFlag) {
      return { opacity: 0.3 };
    }
    return { opacity: 1.0 };
  };

  return (
    <GroupShoppingListItemComponent
      approvedGroups={approvedGroups}
      groupId={Number(group_id)}
      listItem={props.listItem}
      currentYearMonth={props.currentYearMonth}
      initialExpectedPurchaseDate={initialState.initialExpectedPurchaseDate}
      initialPurchase={initialState.initialPurchase}
      initialShop={initialState.initialShop}
      initialAmount={initialState.initialAmount}
      initialBigCategoryId={initialState.initialBigCategoryId}
      initialBigCategoryName={initialState.initialBigCategoryName}
      initialMediumCategoryId={initialState.initialMediumCategoryId}
      initialCustomCategoryId={initialState.initialCustomCategoryId}
      initialPaymentUser={initialState.initialPaymentUser}
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
      paymentUser={paymentUser}
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
      setPaymentUser={setPaymentUser}
      setTransactionAutoAdd={setTransactionAutoAdd}
      purchaseClassName={props.purchaseClassName}
      amountClassName={props.amountClassName}
      transactionDataItemClassName={props.transactionDataItemClassName}
      transactionDataItemKeyClassName={props.transactionDataItemKeyClassName}
      currentTextStyle={currentTextStyle}
    />
  );
};

export default GroupShoppingListItemComponentContainer;
