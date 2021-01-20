import React from 'react';
import '../../assets/modules/selector.scss';

interface SelectLimitProps {
  value: string;
  selectLimit: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectLimit = (props: SelectLimitProps) => {
  return (
    <form>
      <select className="selector__box" onChange={props.selectLimit}>
        <option value="">全件取得</option>
        <option value={'10'}>10件</option>
        <option value={'30'}>30件</option>
        <option value={'50'}>50件</option>
        <option value={'100'}>100件</option>
      </select>
    </form>
  );
};
export default SelectLimit;
