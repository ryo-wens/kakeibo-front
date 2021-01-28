import React from 'react';

interface SelectDateTypeProps {
  id: string;
  value: string;
  selectChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectDateType = (props: SelectDateTypeProps) => {
  return (
    <form>
      <select
        className="selector__box"
        defaultValue="implementation_date"
        onChange={props.selectChange}
      >
        <option value={'implementation_date'}>実施日</option>
        <option value={'due_date'}>締切日</option>
      </select>
    </form>
  );
};
export default SelectDateType;
