import React from 'react';
import '../../assets/modules/error-indication.scss';

interface ErrorIndicationProps {
  errorMessage: string;
  submit: boolean;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorIndication = (props: ErrorIndicationProps) => {
  return (
    <>
      <dialog className="error-indication error-indication__body">{props.errorMessage}</dialog>
    </>
  );
};
export default ErrorIndication;
