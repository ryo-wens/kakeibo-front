import React from 'react';
import '../../assets/modules/selector.scss';

interface SelectSortProps {
  value: string;
  selectSortItem: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectSort = (props: SelectSortProps) => {
  return (
    <form>
      <select
        className="selector__box"
        defaultValue="transaction_date"
        onChange={props.selectSortItem}
      >
        <option value={'transaction_date'}>取引日</option>
        <option value={'updated_date'}>編集日</option>
        <option value={'amount'}>金額</option>
        <option value={'shop'}>店名</option>
        <option value={'memo'}>メモ</option>
      </select>
    </form>
  );
};
export default SelectSort;
