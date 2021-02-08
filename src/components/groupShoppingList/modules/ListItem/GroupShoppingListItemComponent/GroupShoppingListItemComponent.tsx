import React, { useEffect, useState } from 'react';
import '../../../../shoppingList/modules/ListItem/ShoppingListItemComponent/shopping-list-item-component.scss';
import { dateStringToDate } from '../../../../../lib/date';
import { GroupShoppingListItem } from '../../../../../reducks/groupShoppingList/types';
import EditGroupShoppingListItemModal from './EditGroupShoppingListItemModal/EditGroupShoppingListItemModal';
import CheckedGroupShoppingListItemModal from './CheckedGroupShoppingListItemModal/CheckedGroupShoppingListItemModal';
import RelatedGroupTransactionDataButton from './RelatedGroupTransactionDataButton/RelatedGroupTransactionDataButton';
import { useSelector } from 'react-redux';
import { getApprovedGroups } from '../../../../../reducks/groups/selectors';
import { useParams } from 'react-router';

interface GroupShoppingListItemComponentProps {
  listItem: GroupShoppingListItem;
  displayPurchaseDate: boolean;
  currentYearMonth: string;
}

const GroupShoppingListItemComponent = (props: GroupShoppingListItemComponentProps) => {
  const approvedGroups = useSelector(getApprovedGroups);
  const { group_id } = useParams();

  const initialExpectedPurchaseDate: Date = dateStringToDate(props.listItem.expected_purchase_date);
  const initialPurchase = props.listItem.purchase;
  const initialShop = props.listItem.shop;
  const initialAmount = props.listItem.amount === null ? null : String(props.listItem.amount);
  const initialBigCategoryId = props.listItem.big_category_id;
  const initialBigCategoryName = props.listItem.big_category_name;
  const initialMediumCategoryId = props.listItem.medium_category_id;
  const initialCustomCategoryId = props.listItem.custom_category_id;
  const initialPaymentUser = props.listItem.payment_user_id;
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
  const [paymentUser, setPaymentUser] = useState<string | null>(initialPaymentUser);
  const [transactionAutoAdd, setTransactionAutoAdd] = useState<boolean>(initialTransactionAutoAdd);

  useEffect(() => {
    setChecked(props.listItem.complete_flag);
  }, [props.listItem.complete_flag]);

  const currentPurchaseTextStyle = () => {
    if (checked) {
      return { opacity: 0.3 };
    }
  };

  return (
    <>
      {props.displayPurchaseDate && (
        <p className="shopping-list-item-component__date">
          {props.listItem.expected_purchase_date}
        </p>
      )}
      <div className="shopping-list-item-component">
        <div className="shopping-list-item-component__check-box">
          <CheckedGroupShoppingListItemModal
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
            initialPaymentUser={initialPaymentUser}
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
          />
        </div>
        <div className="shopping-list-item-component__content">
          <div className="shopping-list-item-component__items">
            <div className="shopping-list-item-component__item">
              <span
                className="shopping-list-item-component__item-purchase"
                style={currentPurchaseTextStyle()}
              >
                {props.listItem.purchase}
              </span>
              <span
                className="shopping-list-item-component__item-amount"
                style={currentPurchaseTextStyle()}
              >
                {props.listItem.amount === null ? '-' : props.listItem.amount}
              </span>
              <span style={currentPurchaseTextStyle()}>円</span>
            </div>
            <div className="shopping-list-item-component__edit-icon">
              <EditGroupShoppingListItemModal
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
                initialPaymentUser={initialPaymentUser}
                initialTransactionAutoAdd={initialTransactionAutoAdd}
                expectedPurchaseDate={expectedPurchaseDate}
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
                setPurchase={setPurchase}
                setShop={setShop}
                setAmount={setAmount}
                setBigCategoryId={setBigCategoryId}
                setBigCategory={setBigCategory}
                setMediumCategoryId={setMediumCategoryId}
                setCustomCategoryId={setCustomCategoryId}
                setPaymentUser={setPaymentUser}
                setTransactionAutoAdd={setTransactionAutoAdd}
              />
            </div>
          </div>

          <div className="shopping-list-item-component__tag">
            {props.listItem.regular_shopping_list_id !== null && (
              <span className="shopping-list-item-component__tag--red">定期</span>
            )}
            {props.listItem.transaction_auto_add && (
              <span className="shopping-list-item-component__tag--blue">家計簿へ自動追加</span>
            )}
          </div>
          {props.listItem.related_transaction_data !== null && (
            <div className="shopping-list-item-component__related-transaction-data">
              <RelatedGroupTransactionDataButton
                transactionData={props.listItem.related_transaction_data}
                approvedGroups={approvedGroups}
                groupId={Number(group_id)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GroupShoppingListItemComponent;
