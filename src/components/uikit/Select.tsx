import React from 'react';
import '../../assets/modules/selector.scss';
import { SelectItemList } from '../../lib/types';

interface SelectProps {
  disabled: boolean;
  selectItemList: SelectItemList;
  defaultValue?: string | number;
  changeItem: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

export const Select = (props: SelectProps) => {
  return (
    <select
      className="selector__box"
      disabled={props.disabled}
      onChange={props.changeItem}
      defaultValue={props.defaultValue}
    >
      {props.selectItemList &&
        props.selectItemList.map((selectItem, index) => {
          return (
            <option key={index} value={selectItem.value}>
              {selectItem.label}
            </option>
          );
        })}
    </select>
  );
};
