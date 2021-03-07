import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { getErrorMessage } from '../../../reducks/users/selectors';
import { informErrorAction } from '../../../reducks/users/actions';
import { logIn } from '../../../reducks/users/operations';
import { isValidEmailFormat } from '../../../lib/validation';
import LogIn from '../../../templates/login/LogIn';

const initialState = {
  initialEmail: '',
  initialPassword: '',
};

const LogInContainer = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(getErrorMessage);
  const [message, setMessage] = useState('');
  const [submit, setSubmit] = useState(false);
  const [email, setEmail] = useState(initialState.initialEmail);
  const [password, setPassword] = useState(initialState.initialPassword);
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPassWordMessage] = useState('');

  useEffect(() => {
    if (errorMessage.length) {
      setMessage(errorMessage);
    }

    return () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
  }, [errorMessage]);

  const inputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setSubmit(false);
  };

  const inputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setSubmit(false);
  };

  const displayErrorIndication = submit && message.length > 0;

  const minPasswordLength = password.length < 8;

  const unLogIn =
    submit ||
    initialState.initialEmail === email ||
    initialState.initialPassword === password ||
    minPasswordLength ||
    !isValidEmailFormat(email);

  return (
    <LogIn
      submit={submit}
      message={message}
      unLogIn={unLogIn}
      email={email}
      password={password}
      emailMessage={emailMessage}
      passwordMessage={passwordMessage}
      setSubmit={setSubmit}
      inputEmail={inputEmail}
      inputPassword={inputPassword}
      setEmailMessage={setEmailMessage}
      setPassWordMessage={setPassWordMessage}
      displayErrorIndication={displayErrorIndication}
      logInOperation={() => {
        dispatch(logIn(email, password));
        setSubmit(true);
        setTimeout(() => setMessage(''), 4500);
      }}
      guestLogInOperation={() => dispatch(logIn('kakeibo@gmail.com', 'kakeibo1'))}
      routingSignUp={() => {
        dispatch(push('/signup'));
        dispatch(informErrorAction(''));
      }}
    />
  );
};
export default LogInContainer;
