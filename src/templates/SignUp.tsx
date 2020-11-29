import React, { useState, useCallback } from 'react';
import { push } from 'connected-react-router';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  GenericButton,
  InvalidMessage,
  TextArea,
  ErrorIndication,
} from '../components/uikit/index';
import { State } from '../reducks/store/types';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../reducks/users/operations';
import { getErrorMessage } from '../reducks/users/selectors';
import {
  onUserIdFocusOut,
  onUserNameFocusOut,
  onEmailFocusOut,
  onPasswordFocusOut,
  onConfirmPasswordFocusOut,
} from '../lib/validation';
import '../assets/modules/text-area.scss';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#3086f0',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    cursor: 'pointer',
    color: '#154bd4',
    textDecoration: 'underLine',
  },
}));

const SignUp = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const errorMessage = getErrorMessage(selector);
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userIdMessage, setUserIdMessage] = useState<string>('');
  const [userNameMessage, setUserNameMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPassWordMessage] = useState<string>('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>('');

  const inputUserId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserId(event.target.value);
    },
    [setUserId]
  );
  const inputUserName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserName(event.target.value);
    },
    [setUserName]
  );
  const inputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );
  const inputConfirmPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  const unSignUp =
    userId === '' ||
    userName === '' ||
    email === '' ||
    password === '' ||
    confirmPassword === '' ||
    password.length < 8 ||
    confirmPassword.length < 8;

  return (
    <section className="signup__form">
      <ErrorIndication errorMessage={errorMessage} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            アカウント登録
          </Typography>
          <form className={classes.form} noValidate>
            <div>
              <label>ユーザーID</label>
              <TextArea
                id={'userId'}
                value={userId}
                type="userId"
                onChange={inputUserId}
                onBlur={() => onUserIdFocusOut(userId, setUserIdMessage)}
              />
              <InvalidMessage message={userIdMessage} />
            </div>
            <div className="module-spacer--small" />
            <div>
              <label>名前</label>
              <TextArea
                id={'userName'}
                value={userName}
                type="name"
                onChange={inputUserName}
                onBlur={() => onUserNameFocusOut(userName, setUserNameMessage)}
              />
              <InvalidMessage message={userNameMessage} />
            </div>
            <div className="module-spacer--small" />
            <div>
              <label>メールアドレス</label>
              <TextArea
                id={'email'}
                value={email}
                type="email"
                onChange={inputEmail}
                onBlur={() => onEmailFocusOut(email, setEmailMessage)}
              />
              <InvalidMessage message={emailMessage} />
            </div>
            <div className="module-spacer--small" />
            <div>
              <label>パスワード（半角英数字の8文字以上で入力してください）</label>
              <TextArea
                id={'password'}
                value={password}
                type="password"
                onChange={inputPassword}
                onBlur={() => onPasswordFocusOut(password, setPassWordMessage)}
              />
              <InvalidMessage message={passwordMessage} />
            </div>
            <div className="module-spacer--small" />
            <div>
              <label className="text-input__label">確認用パスワード</label>
              <TextArea
                id={'confirmPassword'}
                value={confirmPassword}
                type="password"
                onChange={inputConfirmPassword}
                onBlur={() =>
                  onConfirmPasswordFocusOut(password, confirmPassword, setConfirmPasswordMessage)
                }
              />
              <InvalidMessage message={confirmPasswordMessage} />
            </div>
            <div className="module-spacer--small" />
            <div className="center">
              <GenericButton
                label={'アカウントを登録する'}
                disabled={unSignUp}
                onClick={() => dispatch(signUp(userId, userName, email, password))}
              />
            </div>
            <div className="module-spacer--bit-small" />
            <Grid container justify="center">
              <Grid item>
                <a className={classes.link} onClick={() => dispatch(push('/login'))}>
                  すでにアカウントをお持ちの方はこちら
                </a>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </section>
  );
};
export default SignUp;
