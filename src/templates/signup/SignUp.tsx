import React from 'react';
import { GenericButton, InvalidMessage, TextArea, ErrorIndication } from '../../components/uikit';
import {
  onUserIdFocusOut,
  onUserNameFocusOut,
  onEmailFocusOut,
  onPasswordFocusOut,
  onConfirmPasswordFocusOut,
} from '../../lib/validation';
import Avatar from '@material-ui/core/Avatar';
import './signup.scss';

interface SignUpProps {
  submit: boolean;
  unSignUp: boolean;
  message: string;
  userId: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userIdMessage: string;
  userNameMessage: string;
  emailMessage: string;
  passwordMessage: string;
  confirmPasswordMessage: string;
  conflictUserId: string;
  conflictEmail: string;
  conflictUserIdMessage: string;
  conflictEmailMessage: string;
  displayErrorIndication: boolean;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  inputUserId: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputUserName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputConfirmPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setUserIdMessage: React.Dispatch<React.SetStateAction<string>>;
  setUserNameMessage: React.Dispatch<React.SetStateAction<string>>;
  setEmailMessage: React.Dispatch<React.SetStateAction<string>>;
  setPassWordMessage: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPasswordMessage: React.Dispatch<React.SetStateAction<string>>;
  signUpOperation: () => void;
  routingLogin: () => void;
}

const SignUp = (props: SignUpProps) => {
  return (
    <div className="signup signup__position">
      {props.displayErrorIndication && (
        <ErrorIndication
          errorMessage={
            props.message !== ''
              ? props.message
              : props.conflictUserIdMessage.concat('\n', props.conflictEmailMessage)
          }
          submit={props.submit}
          setSubmit={props.setSubmit}
        />
      )}

      <Avatar style={{ backgroundColor: '#3086f0' }} />
      <h2>アカウント登録</h2>
      <form>
        <label className="signup__label">ユーザーID</label>
        <div className="signup__input-form">
          <TextArea
            id={'userId'}
            value={props.userId}
            type="userId"
            onChange={props.inputUserId}
            onBlur={() => onUserIdFocusOut(props.userId, props.setUserIdMessage)}
            placeholder={'スペースを空けずに入力してください'}
          />
          <div className="signup__error-message">
            <InvalidMessage
              message={
                props.userId !== props.conflictUserId
                  ? props.userIdMessage
                  : props.conflictUserIdMessage
              }
            />
          </div>
        </div>

        <div className="signup__form-spacer" />
        <label className="signup__label">名前</label>
        <div className="signup__input-form">
          <TextArea
            id={'userName'}
            value={props.userName}
            type="name"
            onChange={props.inputUserName}
            onBlur={() => onUserNameFocusOut(props.userName, props.setUserNameMessage)}
            placeholder={'スペースを空けずに入力してください'}
          />
          <div className="signup__error-message">
            <InvalidMessage message={props.userNameMessage} />
          </div>
        </div>

        <div className="signup__form-spacer" />
        <label className="signup__label">メールアドレス</label>
        <div className="signup__input-form">
          <TextArea
            id={'email'}
            value={props.email}
            type="email"
            onChange={props.inputEmail}
            onBlur={() => onEmailFocusOut(props.email, props.setEmailMessage)}
            placeholder={''}
          />
          <div className="signup__error-message">
            <InvalidMessage
              message={
                props.email !== props.conflictEmail
                  ? props.emailMessage
                  : props.conflictEmailMessage
              }
            />
          </div>
        </div>

        <div className="signup__form-spacer" />
        <label className="signup__label">パスワード（半角英数字の8文字以上）</label>
        <div className="signup__input-form">
          <TextArea
            id={'password'}
            value={props.password}
            type="password"
            onChange={props.inputPassword}
            onBlur={() => onPasswordFocusOut(props.password, props.setPassWordMessage)}
            placeholder={''}
          />
          <div className="signup__error-message">
            <InvalidMessage message={props.passwordMessage} />
          </div>
        </div>

        <div className="signup__form-spacer" />
        <label className="signup__label">確認用パスワード</label>
        <div className="signup__input-form">
          <TextArea
            id={'confirmPassword'}
            value={props.confirmPassword}
            type="password"
            onChange={props.inputConfirmPassword}
            onBlur={() =>
              onConfirmPasswordFocusOut(
                props.password,
                props.confirmPassword,
                props.setConfirmPasswordMessage
              )
            }
            placeholder={''}
          />
          <div className="signup__error-message">
            <InvalidMessage message={props.confirmPasswordMessage} />
          </div>
        </div>

        <div className="signup__form-spacer" />
        <div className="signup__button">
          <GenericButton
            label={'アカウントを登録する'}
            disabled={props.unSignUp}
            onClick={() => props.signUpOperation()}
          />
        </div>
        <div className="signup__form-spacer" />
        <div className="signup__login-link">
          <a onClick={() => props.routingLogin()}>すでにアカウントをお持ちの方はこちら</a>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
