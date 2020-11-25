import React from 'react';
import * as actionTypes from '../../src/reducks/users/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { signUp, logIn, logOut, fetchUserInfo } from '../../src/reducks/users/operations';
import signUpResponse from './signUpResponse.json';
import logOutResponse from './logOutResponse.json';

const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

const userState = JSON.parse(JSON.stringify(signUpResponse));
const store = mockStore({ userState, router: [] });

describe('async actions users', () => {
  it('SignUp userData if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const store = mockStore({ users: [], router: [] });
    const url = `${process.env.REACT_APP_USER_API_HOST}/signup`;

    const signUpReq = {
      id: 'kohh20',
      name: '千葉雄喜',
      email: 'kohh@gmail.com',
      password: 'kohhworst',
    };

    const resSignUp = signUpResponse;

    const expectedSignUpActions = [
      {
        payload: {
          user_id: 'kohh20',
          user_name: '千葉雄喜',
          email: 'kohh@gmail.com',
        },
        type: actionTypes.SIGN_UP,
      },
      {
        payload: {
          args: ['/login'],
          method: 'push',
        },
        type: '@@router/CALL_HISTORY_METHOD',
      },
    ];

    axiosMock.onPost(url, signUpReq).reply(201, resSignUp);

    await signUp('kohh20', '千葉雄喜', 'kohh@gmail.com', 'kohhworst')(store.dispatch);
    expect(store.getActions()).toEqual(expectedSignUpActions);
  });

  it('LogIn if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const url = `${process.env.REACT_APP_USER_API_HOST}/login`;

    const logInReq = {
      email: 'kohh@gmail.com',
      password: 'kohhworst',
    };

    const resLogIn = userState;

    const expectedLogInActions = [
      {
        payload: {
          email: 'kohh@gmail.com',
        },
        type: actionTypes.LOG_IN,
      },
      {
        payload: {
          args: ['/'],
          method: 'push',
        },
        type: '@@router/CALL_HISTORY_METHOD',
      },
    ];

    axiosMock.onPost(url, logInReq).reply(201, resLogIn);

    await logIn('kohh@gmail.com', 'kohhworst')(store.dispatch);
    expect(store.getActions()).toEqual(expectedLogInActions);
  });

  it('LogOut if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const url = `${process.env.REACT_APP_USER_API_HOST}/logout`;

    const resLogOut = logOutResponse.message;

    const expectedLogOutActions = [
      {
        payload: null,
        type: actionTypes.LOG_OUT,
      },
      {
        payload: {
          args: ['/login'],
          method: 'push',
        },
        type: '@@router/CALL_HISTORY_METHOD',
      },
    ];

    axiosMock.onDelete(url).reply(200, resLogOut);

    await logOut()(store.dispatch);
    expect(store.getActions()).toEqual(expectedLogOutActions);
  });

  it('Get userInfo if fetch succeeds', async () => {
    beforeEach(() => {
      store.clearActions();
    });

    const url = `${process.env.REACT_APP_USER_API_HOST}/user`;

    const mockResponse = signUpResponse;

    const expectedUserInfoActions = [
      {
        type: actionTypes.FETCH_USER_INFO,
        payload: mockResponse,
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchUserInfo()(store.dispatch);
    expect(store.getActions()).toEqual(expectedUserInfoActions);
  });
});
