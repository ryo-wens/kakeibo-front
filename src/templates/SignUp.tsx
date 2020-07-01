import React, { useState, useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { GenericButton } from '../components/uikit/index';
import { useDispatch } from 'react-redux';
import { signUp } from '../reducks/users/operations';

function Copyright() {
  return (
    <Typography variant="body2" color="primary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        開発者
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#2da3f7',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
    (e) => {
      setUserId(e.target.value);
    },
    [setUserId]
  );
  const inputUserName = useCallback(
    (e) => {
      setUserName(e.target.value);
    },
    [setUserName]
  );
  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );
  const inputConfirmPassword = useCallback(
    (e) => {
      setConfirmPassword(e.target.value);
    },
    [setConfirmPassword]
  );

  const unSignUp =
    userId === '' ||
    userName === '' ||
    email === '' ||
    password === '' ||
    confirmPassword === '';

  const classes = useStyles();

  return (
    <section className="sign__form">
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
              <Grid item xs={12}>
                <TextField
                  autoComplete="userid"
                  variant="outlined"
                  required
                  fullWidth
                  label="ユーザーID"
                  value={userId}
                  type="userId"
                  autoFocus
                  onChange={inputUserId}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  variant="outlined"
                  required
                  fullWidth
                  label="名前"
                  value={userName}
                  type="userName"
                  onChange={inputUserName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  variant="outlined"
                  required
                  fullWidth
                  label="メールアドレス"
                  value={email}
                  type="email"
                  onChange={inputEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="current-password"
                  variant="outlined"
                  required
                  fullWidth
                  label="パスワード"
                  value={password}
                  type="password"
                  onChange={inputPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="current-password"
                  variant="outlined"
                  required
                  fullWidth
                  label="パスワードの確認"
                  value={confirmPassword}
                  type="password"
                  onChange={inputConfirmPassword}
                />
              </Grid>
            </Grid>
            <div className="center">
              <GenericButton
                label={'アカウントを登録する'}
                disabled={unSignUp}
                onClick={() =>
                  dispatch(
                    signUp(userId, userName, email, password, confirmPassword)
                  )
                }
              />
            </div>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  すでにアカウントをお持ちの方はこちら
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </section>
  );
};
export default SignUp;
