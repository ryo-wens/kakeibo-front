import React from 'react';
import '../../assets/modules/input-integer.scss';
import { InvalidMessage } from './index';

interface InputIntegerProps {
  name: string;
  value: number;
  required: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  message: string;
}

const InputInteger = (props: InputIntegerProps) => {
  return (
    <>
      <input
        className="input-integer"
        type="text"
        inputMode="numeric"
        name={props.name}
        value={props.value}
        onInput={props.onChange}
        required={props.required}
        pattern="^\d*$"
      />
      {props.message !== '' && <InvalidMessage message={props.message} />}
    </>
  );
};

export default InputInteger;
