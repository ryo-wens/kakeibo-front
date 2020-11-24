import React, { useCallback } from 'react';

interface SelectTaskNameProps {
  cycleType: string;
  setCycleType: React.Dispatch<React.SetStateAction<'every' | 'consecutive' | 'none'>>;
}

const SelectTaskName = (props: SelectTaskNameProps) => {
  const cycleTypes = ['every', 'consecutive', 'none'];
  const selectCycleType = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      props.setCycleType(event.target.value as 'every' | 'consecutive' | 'none');
    },
    [props.setCycleType]
  );

  return (
    <form>
      <select name={'select-task-name'} required={true} onChange={selectCycleType}>
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
