import React from 'react';
import SelectPurchaseCycleType from '../../../../../components/shoppingList/modules/select/SelectPurchaseCycleType/SelectPurchaseCycleType';
import { PurchaseCycleType } from '../../../../../reducks/shoppingList/types';

interface SelectPurchaseCycleTypeContainerProps {
  value: PurchaseCycleType;
  selectChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectPurchaseCycleTypeContainer = (props: SelectPurchaseCycleTypeContainerProps) => {
  return <SelectPurchaseCycleType value={props.value} selectChange={props.selectChange} />;
};
export default SelectPurchaseCycleTypeContainer;
