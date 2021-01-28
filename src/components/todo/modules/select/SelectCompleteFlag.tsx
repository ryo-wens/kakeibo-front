import React from 'react';

interface SelectCompleteFlagProps {
  id: string;
  value: string | boolean;
  selectChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectCompleteFlag = (props: SelectCompleteFlagProps) => {
  return (
    <form>
      <select className="selector__box" defaultValue="all" onChange={props.selectChange}>
        <option value={'all'}>すべて</option>
        <option value={'true'}>実施済</option>
        <option value={'false'}>未実施</option>
      </select>
    </form>
  );
};
export default SelectCompleteFlag;
