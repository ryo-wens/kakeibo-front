import React from 'react';

interface SelectTaskNameProps {
  selectCycleType: (event: React.ChangeEvent<{ value: string }>) => void;
}

const SelectTaskName = (props: SelectTaskNameProps) => {
  const cycleTypes = [
    { key: 'every', value: 'every' },
    { key: 'consecutive', value: 'consecutive' },
    { key: 'none', value: 'none' },
    { key: 'null', value: 'null' },
  ];

  return (
    <form>
      <select name={'select-task-name'} required={true} onChange={props.selectCycleType}>
        {cycleTypes.map((cycleType) => (
          <option key={cycleType.key} value={cycleType.value}>
            {cycleType.value}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SelectTaskName;
