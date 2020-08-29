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
import { logIn } from '../reducks/users/operations';

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
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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

  const unLogIn = email === '' || password === '';

  const classes = useStyles();

  return (
    <section className="login__form">
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
            <Grid container spacing={2}>
              <Grid item xs={12} className="center">
                <TextInput
                  value={email}
                  required={true}
                  fullWidth={true}
                  id={'email'}
                  label={'メールアドレス'}
                  type={'email'}
                  onChange={inputEmail}
                />
              </Grid>
              <div className="module-spacer--small" />
              <Grid item xs={12} className="center">
                <TextInput
                  value={password}
                  required={true}
                  fullWidth={true}
                  id={'password'}
                  label={'パスワード'}
                  type={'password'}
                  onChange={inputPassword}
                />
              </Grid>
            </Grid>
            <div className="module-spacer--small" />
            <div className="center">
              <GenericButton
                label={'ログインする'}
                disabled={unLogIn}
                onClick={() => dispatch(logIn(email, password))}
              />
            </div>
            <div className="module-spacer--small" />

            <div className="module-spacer--small" />
            <Grid item className="center">
              <a className={classes.link} onClick={() => dispatch(push('/signup'))}>
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
