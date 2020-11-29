import React, { useCallback } from 'react';
import '../../assets/modules/input-integer.scss';
import { InvalidMessage } from './index';

interface InputIntegerProps {
  value: number;
  message: string;
  setCycle: React.Dispatch<React.SetStateAction<number>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  cycleType: 'every' | 'consecutive' | 'none';
}

const InputInteger = (props: InputIntegerProps) => {
  const inputCycle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isNaN(Number(event.target.value))) {
        props.setMessage('半角数字のみ入力可能です');
      } else {
        props.setCycle(Number(event.target.value));
        props.setMessage('');
      }
    },
    [props.setCycle, props.setMessage]
  );

  return (
    <>
      {props.cycleType !== 'none' ? (
        <input
          className="input-integer"
          type="text"
          inputMode="numeric"
          name="cycle"
          value={props.value}
          onChange={inputCycle}
          required={true}
          pattern="^\d*$"
        />
      ) : (
        <input
          className="input-integer"
          type="text"
          name="disabled-cycle"
          value={'-'}
          disabled={true}
        />
      )}
      {props.message !== '' && <InvalidMessage message={props.message} />}
    </>
  );
};

export default InputInteger;
