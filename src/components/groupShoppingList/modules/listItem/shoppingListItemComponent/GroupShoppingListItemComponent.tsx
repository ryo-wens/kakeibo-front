import React from 'react';
import '../../../../shoppingList/modules/listItem/ShoppingListItemComponent/shopping-list-item-component.scss';
import { GroupShoppingListItem } from '../../../../../reducks/groupShoppingList/types';
import EditGroupShoppingListItemModalContainer from '../../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/editGroupShoppingListItemModal/EditGroupShoppingListItemModalContainer';
import CheckedGroupShoppingListItemModalContainer from '../../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/checkedGroupShoppingListItemModal/CheckedGroupShoppingListItemModalContainer';
import { Groups } from '../../../../../reducks/groups/types';
import RelatedGroupTransactionDataButtonContainer from '../../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/relatedGroupTransactionDataButton/RelatedGroupTransactionDataButtonContainer';
import cn from 'classnames';

interface GroupShoppingListItemComponentProps {
  approvedGroups: Groups;
  groupId: number;
  listItem: GroupShoppingListItem;
  currentYear: string;
  currentMonth: string;
  initialExpectedPurchaseDate: Date;
  initialPurchase: string;
  initialShop: string | null;
  initialAmount: string | null;
  initialBigCategoryId: number;
  initialBigCategoryName: string;
  initialMediumCategoryId: number | null;
  initialCustomCategoryId: number | null;
  initialPaymentUser: string | null;
  initialTransactionAutoAdd: boolean;
  expectedPurchaseDate: Date | null;
  checked: boolean;
  purchase: string;
  shop: string | null;
  amount: string | null;
  bigCategoryId: number;
  bigCategory: string | null;
  mediumCategoryId: number | null;
  customCategoryId: number | null;
  paymentUser: string | null;
  transactionAutoAdd: boolean;
  setExpectedPurchaseDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setPurchase: React.Dispatch<React.SetStateAction<string>>;
  setShop: React.Dispatch<React.SetStateAction<string | null>>;
  setAmount: React.Dispatch<React.SetStateAction<string | null>>;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setPaymentUser: React.Dispatch<React.SetStateAction<string | null>>;
  setTransactionAutoAdd: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: string;
  purchaseClassName: string;
  amountClassName: string;
}

const GroupShoppingListItemComponent = (props: GroupShoppingListItemComponentProps) => {
  const purchaseClassName = cn(props.purchaseClassName, {
    'shopping-list-item-component__complete': props.checked,
  });

  const amountClassName = cn(props.amountClassName, {
    'shopping-list-item-component__complete': props.checked,
  });

  const yenClassName = cn({ 'shopping-list-item-component__complete': props.checked });

  const childTransactionDataItemClassName = cn({
    'shopping-list-item-component__child-transaction-data-item': props.currentPage !== 'home',
    'shopping-list-item-component__child-transaction-data-item-cr-home-page':
      props.currentPage === 'home',
  });

  return (
    <li className="shopping-list-item-component">
      <div className="shopping-list-item-component__check-box">
        <CheckedGroupShoppingListItemModalContainer
          listItem={props.listItem}
          currentYear={props.currentYear}
          currentMonth={props.currentMonth}
          initialExpectedPurchaseDate={props.initialExpectedPurchaseDate}
          initialPurchase={props.initialPurchase}
          initialShop={props.initialShop}
          initialAmount={props.initialAmount}
          initialBigCategoryId={props.initialBigCategoryId}
          initialBigCategoryName={props.initialBigCategoryName}
          initialMediumCategoryId={props.initialMediumCategoryId}
          initialCustomCategoryId={props.initialCustomCategoryId}
          initialPaymentUser={props.initialPaymentUser}
          initialTransactionAutoAdd={props.initialTransactionAutoAdd}
          expectedPurchaseDate={props.expectedPurchaseDate}
          checked={props.checked}
          purchase={props.purchase}
          shop={props.shop}
          amount={props.amount}
          bigCategoryId={props.bigCategoryId}
          bigCategory={props.bigCategory}
          mediumCategoryId={props.mediumCategoryId}
          customCategoryId={props.customCategoryId}
          paymentUser={props.paymentUser}
          transactionAutoAdd={props.transactionAutoAdd}
          setExpectedPurchaseDate={props.setExpectedPurchaseDate}
          setChecked={props.setChecked}
          setPurchase={props.setPurchase}
          setShop={props.setShop}
          setAmount={props.setAmount}
          setBigCategoryId={props.setBigCategoryId}
          setBigCategory={props.setBigCategory}
          setMediumCategoryId={props.setMediumCategoryId}
          setCustomCategoryId={props.setCustomCategoryId}
          setPaymentUser={props.setPaymentUser}
          setTransactionAutoAdd={props.setTransactionAutoAdd}
        />
      </div>
      <div className="shopping-list-item-component__content">
        <div className="shopping-list-item-component__items">
          <div className="shopping-list-item-component__item">
            <span className={purchaseClassName}>{props.listItem.purchase}</span>
            <span className={amountClassName}>{props.listItem.amount ?? '-'}</span>
            <span className={yenClassName}>円</span>
          </div>
          <div className="shopping-list-item-component__edit-icon">
            <EditGroupShoppingListItemModalContainer
              listItem={props.listItem}
              currentYear={props.currentYear}
              currentMonth={props.currentMonth}
              initialExpectedPurchaseDate={props.initialExpectedPurchaseDate}
              initialPurchase={props.initialPurchase}
              initialShop={props.initialShop}
              initialAmount={props.initialAmount}
              initialBigCategoryId={props.initialBigCategoryId}
              initialBigCategoryName={props.initialBigCategoryName}
              initialMediumCategoryId={props.initialMediumCategoryId}
              initialCustomCategoryId={props.initialCustomCategoryId}
              initialPaymentUser={props.initialPaymentUser}
              initialTransactionAutoAdd={props.initialTransactionAutoAdd}
              expectedPurchaseDate={props.expectedPurchaseDate}
              purchase={props.purchase}
              shop={props.shop}
              amount={props.amount}
              bigCategoryId={props.bigCategoryId}
              bigCategory={props.bigCategory}
              mediumCategoryId={props.mediumCategoryId}
              customCategoryId={props.customCategoryId}
              paymentUser={props.paymentUser}
              transactionAutoAdd={props.transactionAutoAdd}
              setExpectedPurchaseDate={props.setExpectedPurchaseDate}
              setPurchase={props.setPurchase}
              setShop={props.setShop}
              setAmount={props.setAmount}
              setBigCategoryId={props.setBigCategoryId}
              setBigCategory={props.setBigCategory}
              setMediumCategoryId={props.setMediumCategoryId}
              setCustomCategoryId={props.setCustomCategoryId}
              setPaymentUser={props.setPaymentUser}
              setTransactionAutoAdd={props.setTransactionAutoAdd}
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
            <RelatedGroupTransactionDataButtonContainer
              transactionData={props.listItem.related_transaction_data}
              approvedGroups={props.approvedGroups}
              groupId={props.groupId}
              transactionDataListClassName={childTransactionDataItemClassName}
            />
          </div>
        )}
      </div>
    </li>
  );
};

export default GroupShoppingListItemComponent;
