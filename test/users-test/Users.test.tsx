import React from 'react';
import * as actionTypes from '../../src/reducks/users/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import Router from '../../src/Router';
import configureStore from 'redux-mock-store';
import { signUp } from '../../src/reducks/users/operations';
import signUpResponse from './signUpResponse.json';

const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

describe('async actions signUp', () => {
  const store = mockStore({ users: [], router: [] });
  const url = 'http://127.0.0.1:8080/signup';
  beforeEach(() => {
    store.clearActions();
  });

  it('SignUp userData if fetch succeeds', async () => {
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

    await signUp('kohh20', '千葉雄喜', 'kohh@gmail.com', 'kohhworst', 'kohhworst')(store.dispatch);
    expect(store.getActions()).toEqual(expectedSignUpActions);
  });
});
