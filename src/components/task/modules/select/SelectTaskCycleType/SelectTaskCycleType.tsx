import React from 'react';
import './select-task-cycle-type.scss';

interface SelectTaskCycleTypeProps {
  cycleType: string;
  selectCycleType: (event: React.ChangeEvent<{ value: string }>) => void;
}

const SelectTaskCycleType = (props: SelectTaskCycleTypeProps) => {
  return (
    <form>
      <select
        className="select-task-cycle-type"
        name={'select-task-name'}
        required={true}
        onChange={props.selectCycleType}
        defaultValue={props.cycleType}
      >
        <option value={'every'}>every</option>
        <option value={'consecutive'}>consecutive</option>
        <option value={'none'}>none</option>
      </select>
    </form>
  );
};

export default SelectTaskCycleType;
