import React from 'react';
import styles from './ShoppingListItemComponent.module.scss';
import { ShoppingListItem } from '../../../../../reducks/shoppingList/types';
import CheckedShoppingListItemModalContainer from '../../../../../containers/shoppingList/modules/ListItem/shoppingListItemComponent/checkedShoppingListItemModal/CheckedShoppingListItemModalContainer';
import EditShoppingListItemModalContainer from '../../../../../containers/shoppingList/modules/ListItem/shoppingListItemComponent/editShoppingListItemModal/EditShoppingListItemModalContainer';
import RelatedTransactionDataButtonContainer from '../../../../../containers/shoppingList/modules/ListItem/shoppingListItemComponent/relatedTransactionDataButton/RelatedTransactionDataButtonContainer';
import cn from 'classnames';

interface ShoppingListItemComponentProps {
  listItem: ShoppingListItem;
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
  setTransactionAutoAdd: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: string;
  purchaseClassName: string;
  amountClassName: string;
}

const ShoppingListItemComponent = (props: ShoppingListItemComponentProps) => {
  const purchaseClassName = cn(props.purchaseClassName, {
    [styles.complete]: props.checked,
  });

  const amountClassName = cn(props.amountClassName, {
    [styles.complete]: props.checked,
  });

  const childCategoryDataClassName = cn({
    [styles.childCategoryData]: props.currentPage !== 'home',
    [styles.childCategoryDataCrHomePage]: props.currentPage === 'home',
  });

  const childDisplayTermClassName = cn({
    [styles.childDisplayTerm]: props.currentPage !== 'home',
    [styles.childDisplayTermCrHomePage]: props.currentPage === 'home',
  });

  return (
    <li className={styles.wrapper}>
      <div className={styles.checkBox}>
        <CheckedShoppingListItemModalContainer
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
          setTransactionAutoAdd={props.setTransactionAutoAdd}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.items}>
          <div className={styles.item}>
            <span className={purchaseClassName}>{props.listItem.purchase}</span>
            <span className={amountClassName}>{`￥  ${props.listItem.amount ?? '-'}`}</span>
          </div>
          <span className={styles.editIcon}>
            <EditShoppingListItemModalContainer
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
              initialTransactionAutoAdd={props.initialTransactionAutoAdd}
              expectedPurchaseDate={props.expectedPurchaseDate}
              purchase={props.purchase}
              shop={props.shop}
              amount={props.amount}
              bigCategoryId={props.bigCategoryId}
              bigCategory={props.bigCategory}
              mediumCategoryId={props.mediumCategoryId}
              customCategoryId={props.customCategoryId}
              transactionAutoAdd={props.transactionAutoAdd}
              setExpectedPurchaseDate={props.setExpectedPurchaseDate}
              setPurchase={props.setPurchase}
              setShop={props.setShop}
              setAmount={props.setAmount}
              setBigCategoryId={props.setBigCategoryId}
              setBigCategory={props.setBigCategory}
              setMediumCategoryId={props.setMediumCategoryId}
              setCustomCategoryId={props.setCustomCategoryId}
              setTransactionAutoAdd={props.setTransactionAutoAdd}
            />
          </span>
        </div>
        <div className={styles.tag}>
          {props.listItem.regular_shopping_list_id !== null && (
            <span className={styles.tag__red}>定期</span>
          )}
          {props.listItem.transaction_auto_add && (
            <span className={styles.tag__blue}>家計簿へ自動追加</span>
          )}
        </div>
        {props.listItem.related_transaction_data !== null && (
          <div className={styles.relatedTransactionData}>
            <RelatedTransactionDataButtonContainer
              transactionData={props.listItem.related_transaction_data}
              categoryDataClassName={childCategoryDataClassName}
              displayTermClassName={childDisplayTermClassName}
            />
          </div>
        )}
      </div>
    </li>
  );
};

export default ShoppingListItemComponent;
