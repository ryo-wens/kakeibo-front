import React from 'react';
import { PurchaseCycleType } from '../../../../../reducks/shoppingList/types';

interface SelectPurchaseCycleTypeProps {
  value: PurchaseCycleType;
  selectChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectPurchaseCycleType = (props: SelectPurchaseCycleTypeProps) => {
  return (
    <form>
      <select className="selector__box" onChange={props.selectChange} defaultValue={props.value}>
        <option value="daily">毎日</option>
        <option value="weekly">毎週</option>
        <option value="monthly">毎月</option>
        <option value="custom">カスタム</option>
      </select>
    </form>
  );
};
export default SelectPurchaseCycleType;
