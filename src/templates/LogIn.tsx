import React, { useState, useCallback, useEffect } from 'react';
import { push } from 'connected-react-router';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { GenericButton, TextArea, ErrorIndication } from '../components/uikit/index';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../reducks/store/types';
import { logIn } from '../reducks/users/operations';
import { InvalidMessage } from '../components/uikit';
import { isValidEmailFormat, onEmailFocusOut, passWordSubmit } from '../lib/validation';
import '../assets/modules/text-area.scss';
import { getErrorMessage } from '../reducks/users/selectors';
import { informErrorAction } from '../reducks/users/actions';

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
    marginTop: theme.spacing(1),
  },
  link: {
    cursor: 'pointer',
    color: '#154bd4',
    textDecoration: 'underLine',
  },
}));

const LogIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const errorMessage = getErrorMessage(selector);
  const [message, setMessage] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPassWordMessage] = useState<string>('');

  useEffect(() => {
    setMessage(errorMessage);
  }, [errorMessage]);

  const inputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
      setSubmit(false);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      setSubmit(false);
    },
    [setPassword]
  );

  const unLogIn =
    email === '' || password === '' || password.length < 8 || !isValidEmailFormat(email) || submit;

  return (
    <section className="login__form">
      {(() => {
        if (submit && message.length > 0) {
          return <ErrorIndication errorMessage={message} submit={submit} setSubmit={setSubmit} />;
        }
      })()}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <div className="module-spacer--small" />
          <form className={classes.form} noValidate>
            <div>
              <label>メールアドレス</label>
              <TextArea
                value={email}
                id={'email'}
                type={'email'}
                onChange={inputEmail}
                onBlur={() => onEmailFocusOut(email, setEmailMessage)}
              />
              <InvalidMessage message={emailMessage} />
            </div>
            <div className="module-spacer--small" />
            <div>
              <label>パスワード</label>
              <TextArea
                value={password}
                id={'password'}
                type={'password'}
                onChange={inputPassword}
                onBlur={() => passWordSubmit(password, setPassWordMessage)}
              />
              <InvalidMessage message={passwordMessage} />
            </div>
            <div className="module-spacer--small" />
            <div className="center">
              <GenericButton
                label={'ログインする'}
                disabled={unLogIn}
                onClick={() => {
                  dispatch(logIn(email, password));
                  setSubmit(true);
                }}
              />
            </div>
            <div className="module-spacer--small" />
            <div className="center">
              <GenericButton
                label={'ゲストユーザーログイン'}
                disabled={false}
                onClick={() => dispatch(logIn('kakeibo@gmail.com', 'kakeibo1'))}
              />
            </div>
            <div className="module-spacer--small" />
            <Grid item className="center">
              <a
                className={classes.link}
                onClick={() => {
                  dispatch(push('/signup'));
                  dispatch(informErrorAction(''));
                }}
              >
                アカウント登録がお済みでない方はこちら
              </a>
            </Grid>
          </form>
        </div>
      </Container>
    </section>
  );
};
export default LogIn;
