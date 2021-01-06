import React, { useEffect, useState } from 'react';
import './shopping-list-item-component.scss';
import { ShoppingListItem } from '../../../../../reducks/shoppingList/types';
import EditShoppingListModal from '../../Modal/EditShoppingListModal/EditShoppingListModal';

interface ShoppingListItemComponentProps {
  listItem: ShoppingListItem;
  displayPurchaseDate: boolean;
}

const ShoppingListItemComponent = (props: ShoppingListItemComponentProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(props.listItem.complete_flag);
  }, []);

  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
        <EditShoppingListModal listItem={props.listItem} />
      </div>
    </>
  );
};

export default ShoppingListItemComponent;
