import React from 'react';
import { GenericButton, TextArea, ErrorIndication } from '../../components/uikit';
import { InvalidMessage } from '../../components/uikit';
import { onEmailFocusOut, passWordSubmit } from '../../lib/validation';
import Avatar from '@material-ui/core/Avatar';
import './login.scss';

interface LogInProps {
  submit: boolean;
  message: string;
  unLogIn: boolean;
  email: string;
  password: string;
  emailMessage: string;
  passwordMessage: string;
  displayErrorIndication: boolean;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  inputEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setEmailMessage: React.Dispatch<React.SetStateAction<string>>;
  setPassWordMessage: React.Dispatch<React.SetStateAction<string>>;
  logInOperation: () => void;
  guestLogInOperation: () => void;
  routingSignUp: () => void;
}

const LogIn = (props: LogInProps) => {
  return (
    <div className="login login__position">
      {props.displayErrorIndication && (
        <ErrorIndication
          errorMessage={props.message}
          submit={props.submit}
          setSubmit={props.setSubmit}
        />
      )}

      <Avatar style={{ backgroundColor: '#3086f0' }} />
      <h2>ログイン</h2>
      <div className="login__form-spacer" />
      <form>
        <label className="login__label">メールアドレス</label>
        <div className="login__input-form">
          <TextArea
            value={props.email}
            id={'email'}
            type={'email'}
            onChange={props.inputEmail}
            onBlur={() => onEmailFocusOut(props.email, props.setEmailMessage)}
            placeholder={''}
          />
          <div className="login__error-message">
            <InvalidMessage message={props.emailMessage} />
          </div>
        </div>
        <div className="login__form-spacer" />

        <label className="login__label">パスワード</label>
        <div className="login__input-form">
          <TextArea
            value={props.password}
            id={'password'}
            type={'password'}
            onChange={props.inputPassword}
            onBlur={() => passWordSubmit(props.password, props.setPassWordMessage)}
            placeholder={''}
          />
          <div className="login__error-message">
            <InvalidMessage message={props.passwordMessage} />
          </div>
        </div>

        <div className="login__form-spacer" />
        <div className="login__button">
          <GenericButton
            label={'ログインする'}
            disabled={props.unLogIn}
            onClick={() => props.logInOperation()}
          />
          <div className="login__form-spacer" />
          <GenericButton
            label={'ゲストユーザーログイン'}
            disabled={false}
            onClick={() => props.guestLogInOperation()}
          />
        </div>

        <div className="login__form-spacer" />
        <div className="login__signup-link">
          <a onClick={() => props.routingSignUp()}>アカウント登録がお済みでない方はこちら</a>
        </div>
      </form>
    </div>
  );
};
export default LogIn;
