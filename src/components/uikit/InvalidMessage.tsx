import React from 'react';
import '../../assets/modules/invalid-message.scss';

interface InvalidMessageProps {
  message: string;
}

const InvalidMessage = (props: InvalidMessageProps) => {
  return <span className="invalid-message">{props.message}</span>;
};

export default InvalidMessage;
