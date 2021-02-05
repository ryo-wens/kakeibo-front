import React from 'react';
import './input-task-cycle.scss';
import { TaskCycleType } from '../../../../../reducks/groupTasks/types';

interface InputTaskCycleProps {
  value: number;
  inputTaskCycle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cycleType: TaskCycleType;
}

const InputTaskCycle = (props: InputTaskCycleProps) => {
  return (
    <>
      {props.cycleType !== 'none' ? (
        <input
          className="input-task-cycle"
          type="text"
          inputMode="numeric"
          name="cycle"
          value={props.value}
          onChange={props.inputTaskCycle}
          required={true}
          pattern="^\d*$"
        />
      ) : (
        <input
          className="input-task-cycle"
          type="text"
          name="disabled-cycle"
          value={'-'}
          disabled={true}
        />
      )}
    </>
  );
};

export default InputTaskCycle;
