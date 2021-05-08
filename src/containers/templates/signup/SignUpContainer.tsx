import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { getConflictMessage, getErrorMessage } from '../../../reducks/users/selectors';
import { conflictMessageAction, informErrorAction } from '../../../reducks/users/actions';
import { signUp } from '../../../reducks/users/operations';
import { ConflictMessage } from '../../../reducks/users/types';
import SignUp from '../../../templates/signup/SignUp';

const initialState = {
  initialUserId: '',
  initialUserName: '',
  initialEmail: '',
  initialPassword: '',
  initialConfirmPassWord: '',
  initialUserIdMessage: '',
  initialUserNameMessage: '',
  initialEmailMessage: '',
  initialPasswordMessage: '',
  initialConfirmPasswordMessage: '',
};

const SignUpContainer = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(getErrorMessage);
  const conflictMessage = useSelector(getConflictMessage);
  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState('');
  const [conflictUserId, setConflictUserId] = useState('');
  const [conflictEmail, setConflictEmail] = useState('');
  const [conflictUserIdMessage, setConflictUserIdMessage] = useState('');
  const [conflictEmailMessage, setConflictEmailMessage] = useState('');
  const [userId, setUserId] = useState(initialState.initialUserId);
  const [userName, setUserName] = useState(initialState.initialUserName);
  const [email, setEmail] = useState(initialState.initialEmail);
  const [password, setPassword] = useState(initialState.initialPassword);
  const [confirmPassword, setConfirmPassword] = useState(initialState.initialConfirmPassWord);
  const [userIdMessage, setUserIdMessage] = useState(initialState.initialUserIdMessage);
  const [userNameMessage, setUserNameMessage] = useState(initialState.initialUserNameMessage);
  const [emailMessage, setEmailMessage] = useState(initialState.initialEmailMessage);
  const [passwordMessage, setPassWordMessage] = useState(initialState.initialPasswordMessage);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(
    initialState.initialConfirmPasswordMessage
  );

  useEffect(() => {
    setMessage(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    if (conflictMessage.id === undefined) {
      setConflictUserIdMessage('');
    } else {
      setConflictUserId(userId);
      setConflictUserIdMessage(conflictMessage.id);
    }
  }, [conflictMessage.id]);

  useEffect(() => {
    if (conflictMessage.email === undefined) {
      setConflictEmailMessage('');
    } else {
      setConflictEmail(email);
      setConflictEmailMessage(conflictMessage.email);
    }
  }, [conflictMessage.email]);

  useEffect(() => {
    if (userId === conflictUserId) {
      setConflictUserIdMessage(conflictMessage.id);
    } else if (userId !== conflictUserId) {
      setConflictUserIdMessage('');
    }
  }, [userId]);

  useEffect(() => {
    if (email === conflictEmail) {
      setConflictEmailMessage(conflictMessage.email);
    } else if (email !== conflictEmail) {
      setConflictEmailMessage('');
    }
  }, [email]);

  const inputUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
    setSubmit(false);
  };

  const inputUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    setSubmit(false);
  };

  const inputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setSubmit(false);
  };

  const inputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setSubmit(false);
  };

  const inputConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setSubmit(false);
  };

  const displayErrorIndication =
    submit &&
    (conflictUserIdMessage.length > 0 || conflictEmailMessage.length > 0 || message.length > 0);

  const minPasswordLength = password.length < 8;
  const minConfirmPasswordLength = confirmPassword.length < 8;
  const userIdConflictCheck = userId === conflictUserId;
  const emailConflictCheck = email === conflictEmail;

  const unSignUp =
    initialState.initialUserId === userId ||
    initialState.initialUserName === userName ||
    initialState.initialEmail === email ||
    initialState.initialPassword === password ||
    initialState.initialConfirmPassWord === confirmPassword ||
    initialState.initialUserIdMessage !== userIdMessage ||
    initialState.initialUserNameMessage !== userNameMessage ||
    initialState.initialEmailMessage !== emailMessage ||
    initialState.initialPasswordMessage !== passwordMessage ||
    initialState.initialConfirmPasswordMessage !== confirmPasswordMessage ||
    minPasswordLength ||
    minConfirmPasswordLength ||
    userIdConflictCheck ||
    emailConflictCheck;

  const signUpOperation = () => {
    dispatch(signUp(userId, userName, email, password, confirmPassword));
    const emptyMessage: ConflictMessage = { id: '', email: '' };
    dispatch(conflictMessageAction(emptyMessage));
    setSubmit(true);
  };

  const routingLogin = () => {
    const emptyMessage: ConflictMessage = { id: '', email: '' };
    dispatch(informErrorAction(''));
    dispatch(conflictMessageAction(emptyMessage));
    dispatch(push('/login'));
  };

  return (
    <SignUp
      submit={submit}
      unSignUp={unSignUp}
      message={message}
      userId={userId}
      userName={userName}
      email={email}
      password={password}
      setSubmit={setSubmit}
      confirmPassword={confirmPassword}
      userIdMessage={userIdMessage}
      userNameMessage={userNameMessage}
      emailMessage={emailMessage}
      passwordMessage={passwordMessage}
      confirmPasswordMessage={confirmPasswordMessage}
      conflictUserId={conflictUserId}
      conflictEmail={conflictEmail}
      conflictUserIdMessage={conflictUserIdMessage}
      conflictEmailMessage={conflictEmailMessage}
      inputUserId={inputUserId}
      inputUserName={inputUserName}
      inputEmail={inputEmail}
      inputPassword={inputPassword}
      inputConfirmPassword={inputConfirmPassword}
      setUserIdMessage={setUserIdMessage}
      setUserNameMessage={setUserNameMessage}
      setEmailMessage={setEmailMessage}
      setPassWordMessage={setPassWordMessage}
      setConfirmPasswordMessage={setConfirmPasswordMessage}
      displayErrorIndication={displayErrorIndication}
      signUpOperation={signUpOperation}
      routingLogin={routingLogin}
    />
  );
};
export default SignUpContainer;
