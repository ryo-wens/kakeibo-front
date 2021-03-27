import React from 'react';
import '../../assets/modules/selector.scss';

interface KindProps {
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  required: boolean;
  disabled: boolean;
  currentPage: string;
}

const KindSelectBox = (props: KindProps) => {
  return (
    <select
      className="selector__box"
      onChange={props.onChange}
      disabled={props.disabled}
      defaultValue={props.value}
    >
      {props.currentPage === 'search' && <option value="">すべて</option>}
      <option value={'expense'}>支出</option>
      <option value={'income'}>収入</option>
    </select>
  );
};
export default KindSelectBox;
