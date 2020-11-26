import React from 'react';
import '../../assets/modules/error-indication.scss';

interface ErrorIndicationProps {
  errorMessage: string;
}

const ErrorIndication = (props: ErrorIndicationProps) => {
  return (
    <>
      {(() => {
        if (!props.errorMessage.length) {
          return null;
        } else {
          return (
            <dialog className="error-indication error-indication__body">
              {props.errorMessage}
            </dialog>
          );
        }
      })()}
    </>
  );
};
export default ErrorIndication;
