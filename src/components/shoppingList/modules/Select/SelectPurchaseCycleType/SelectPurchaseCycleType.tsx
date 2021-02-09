import React from 'react';
import { PurchaseCycleType } from '../../../../../reducks/shoppingList/types';

interface SelectPurchaseCycleTypeProps {
  value: PurchaseCycleType;
  selectChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectPurchaseCycleType = (props: SelectPurchaseCycleTypeProps) => {
  const cycleTypes = [
    { key: '毎日', value: 'daily' },
    { key: '毎週', value: 'weekly' },
    { key: '毎月', value: 'monthly' },
    { key: 'カスタム', value: 'custom' },
  ];

  return (
    <select className="selector__box" onChange={props.selectChange} defaultValue={'weekly'}>
      {cycleTypes.map((item) => (
        <option value={item.value} key={item.key}>
          {item.key}
        </option>
      ))}
    </select>
  );
};
export default SelectPurchaseCycleType;
