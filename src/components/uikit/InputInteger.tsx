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
        type="number"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        step={1}
      />
      {props.message !== '' && <InvalidMessage message={props.message} />}
    </>
  );
};

export default InputInteger;
