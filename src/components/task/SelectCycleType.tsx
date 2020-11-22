import React from 'react';

interface SelectTaskNameProps {
  selectCycleType: (event: React.ChangeEvent<{ value: string }>) => void;
}

const SelectTaskName = (props: SelectTaskNameProps) => {
  const cycleTypes = ['every', 'consecutive', 'none'];

  return (
    <form>
      <select name={'select-task-name'} required={true} onChange={props.selectCycleType}>
        {cycleTypes.map((cycleType: string, index: number) => (
          <option key={index} value={cycleType}>
            {cycleType}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SelectTaskName;
