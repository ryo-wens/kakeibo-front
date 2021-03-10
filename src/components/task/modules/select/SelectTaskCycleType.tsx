import React from 'react';
import '../../../../assets/modules/selector.scss';

interface SelectTaskCycleTypeProps {
  cycleType: string;
  handleChangeCycleType: (event: React.ChangeEvent<{ value: string }>) => void;
}

const SelectTaskCycleType = (props: SelectTaskCycleTypeProps) => {
  return (
    <form>
      <select
        className="selector__box"
        name={'select-task-name'}
        required={true}
        onChange={props.handleChangeCycleType}
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
