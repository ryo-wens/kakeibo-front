import React from 'react';
import '../../assets/modules/selector.scss';

interface SelectSortTypeProps {
  value: string;
  selectSortType: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectSortType = (props: SelectSortTypeProps) => {
  return (
    <form>
      <select className="selector__box" defaultValue="desc" onChange={props.selectSortType}>
        <option value={'desc'}>降順</option>
        <option value={'asc'}>昇順</option>
      </select>
    </form>
  );
};
export default SelectSortType;
