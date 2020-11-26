import React, { useCallback } from 'react';
import '../../assets/task/select-cycle-type.scss';

interface SelectTaskNameProps {
  cycleType: string;
  setCycleType: React.Dispatch<React.SetStateAction<'every' | 'consecutive' | 'none'>>;
  setCycle: React.Dispatch<React.SetStateAction<number>>;

  label: string;
}

const SelectTaskName = (props: SelectTaskNameProps) => {
  const cycleTypes = ['every', 'consecutive', 'none'];
  const selectCycleType = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      props.setCycleType(event.target.value as 'every' | 'consecutive' | 'none');
      if (event.target.value === 'none') {
        props.setCycle(Number(1));
      }
    },
    [props.setCycleType]
  );

  const currentSelectCycleType = () => {
    if (props.label === '保存') {
      return props.cycleType;
    } else if (props.label === '追加') {
      return 'every';
    }
  };

  return (
    <form>
      <select
        name={'select-task-name'}
        className="select-cycle-type"
        required={true}
        onChange={selectCycleType}
        defaultValue={currentSelectCycleType()}
      >
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
