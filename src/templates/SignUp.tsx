import React, { useState, useCallback } from 'react';
import { push } from 'connected-react-router';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { GenericButton, TextInput } from '../components/uikit/index';
import { useDispatch } from 'react-redux';
import { signUp } from '../reducks/users/operations';

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

const SignUp = () => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const inputUserId = useCallback(
    (event:React.ChangeEvent<HTMLInputElement>) => {
      setUserId(event.target.value);
    },
    [setUserId]
  );
  const inputUserName = useCallback(
    (event:React.ChangeEvent<HTMLInputElement>) => {
      setUserName(event.target.value);
    },
    [setUserName]
  );
  const inputEmail = useCallback(
    (event:React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (event:React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );
  const inputConfirmPassword = useCallback(
    (event:React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  const unSignUp =
    userId === '' || userName === '' || email === '' || password === '' || confirmPassword === '';

  const classes = useStyles();

  return (
    <section className="signup__form">
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
            <Grid container spacing={2}>
              <Grid item xs={12} className="center">
                <TextInput
                  id={'userId'}
                  required={true}
                  fullWidth={true}
                  label="ユーザーID"
                  value={userId}
                  type="userId"
                  onChange={inputUserId}
                />
              </Grid>
              <Grid item xs={12} className="center">
                <TextInput
                  id={'userName'}
                  required={true}
                  fullWidth={true}
                  label="名前"
                  value={userName}
                  type="name"
                  onChange={inputUserName}
                />
              </Grid>
              <Grid item xs={12} className="center">
                <TextInput
                  id={'email'}
                  required={true}
                  fullWidth={true}
                  label="メールアドレス"
                  value={email}
                  type="email"
                  onChange={inputEmail}
                />
              </Grid>
              <Grid item xs={12} className="center">
                <TextInput
                  id={'password'}
                  required={true}
                  fullWidth={true}
                  label="パスワード(半角英数字で8文字以上)"
                  value={password}
                  type="password"
                  onChange={inputPassword}
                />
              </Grid>
              <Grid item xs={12} className="center">
                <TextInput
                  id={'confirmPassword'}
                  required={true}
                  fullWidth={true}
                  label="パスワードの確認"
                  value={confirmPassword}
                  type="password"
                  onChange={inputConfirmPassword}
                />
              </Grid>
            </Grid>
            <div className="module-spacer--bit-small" />
            <div className="center">
              <GenericButton
                label={'アカウントを登録する'}
                disabled={unSignUp}
                onClick={() => dispatch(signUp(userId, userName, email, password, confirmPassword))}
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
