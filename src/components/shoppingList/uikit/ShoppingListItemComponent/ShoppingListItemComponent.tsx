import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import './shopping-list-item-component.scss';
import { ShoppingListItem } from '../../../../reducks/shoppingList/types';

interface ShoppingListItemComponentProps {
  listItem: ShoppingListItem;
  displayPurchaseDate: boolean;
}

const ShoppingListItemComponent = (props: ShoppingListItemComponentProps) => {
  const [checked, setChecked] = useState<boolean>(false);

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
          <input
            type="checkbox"
            checked={props.listItem.complete_flag}
            onChange={handleCheckedChange}
          />
          <span />
        </label>
        <span className="shopping-list-item-component__purchase" style={currentPurchaseTextStyle()}>
          {props.listItem.purchase}
        </span>
        <span className="shopping-list-item-component__amount">{props.listItem.amount}円</span>
        <EditIcon className="shopping-list-item-component__edit-icon" />
      </div>
    </>
  );
};

export default ShoppingListItemComponent;
