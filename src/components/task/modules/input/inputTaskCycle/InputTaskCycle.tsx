import React from 'react';
import styles from './InputTaskCycle.module.scss';
import { TaskCycleType } from '../../../../../reducks/groupTasks/types';

interface InputTaskCycleProps {
  value: number;
  handleChangeCycle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cycleType: TaskCycleType;
}

const InputTaskCycle = (props: InputTaskCycleProps) => {
  return (
    <>
      {props.cycleType !== 'none' ? (
        <input
          className={styles.input}
          type="text"
          inputMode="numeric"
          name="cycle"
          value={props.value}
          onChange={props.handleChangeCycle}
          required={true}
          pattern="^\d*$"
        />
      ) : (
        <input
          className={styles.input}
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
