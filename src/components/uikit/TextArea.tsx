import React from 'react';
import '../../assets/modules/text-area.scss';

interface InputFormProps {
  id: string;
  value: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
}

const TextArea = (props: InputFormProps) => {
  return (
    <input
      className="text-input__text-form"
      id={props.id}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  );
};
export default TextArea;
