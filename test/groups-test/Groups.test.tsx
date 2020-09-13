import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as Actions from '../../src/reducks/groups/actions';
import { FETCH_GROUPS } from '../../src/reducks/groups/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const axiosMock = new MockAdapter(axios);

describe('async actions groups', () => {
  const url = 'http://127.0.0.1:8080/groups';

  it('Get approvedGroups and unapprovedGroups when fetch is successful', () => {
    const mockResponse = {
      approved_group_list: [
        {
          group_id: 1,
          group_name: 'シェアハウス',
          approved_users_list: [
            {
              group_id: 1,
              user_id: 'furusawa',
              user_name: '古澤',
            },
          ],
          unapproved_users_list: [{ group_id: 1, user_id: 'go2', user_name: '郷ひろみ' }],
        },
      ],
      unapproved_group_list: [
        {
          group_id: 2,
          group_name: '代表',
          approved_users_list: [
            {
              group_id: 2,
              user_id: 'honda',
              user_name: '本田',
            },
          ],
          unapproved_users_list: [
            {
              group_id: 2,
              user_id: 'furusawa',
              user_name: '古澤',
            },
          ],
        },
      ],
    };

    const expectedActions = [
      {
        type: FETCH_GROUPS,
        payload: {
          approvedGroups: mockResponse.approved_group_list,
          unapprovedGroups: mockResponse.unapproved_group_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    return axios.get(url).then((res) => {
      const approvedGroups = res.data.approved_group_list;
      const unapprovedGroups = res.data.unapproved_group_list;

      store.dispatch(Actions.fetchGroupsAction(approvedGroups, unapprovedGroups));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
