import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as GroupsActions from '../../src/reducks/groups/actions';
import * as ModalActions from '../../src/reducks/modal/actions';
import {
  createGroup,
  fetchGroups,
  inviteGroupParticipate,
  inviteGroupReject,
} from '../../src/reducks/groups/operations';
import fetchGroupsResponse from './fetchGroups.json';
import createGroupResponse from './createGroup.json';
import inviteGroupParticipateResponse from './inviteGroupParticipate.json';
import inviteGroupRejectResponse from './inviteGroupReject.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new MockAdapter(axios);

const store = mockStore({ users: [], groups: [], router: [] });

const getState = () => {
  return {
    users: {
      user_id: 'furusawa',
      user_name: '古澤',
      email: 'test@gmail.com',
      password: 'password',
    },
    groups: {
      approvedGroups: [
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
      unapprovedGroups: [
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
    },
    router: {
      action: 'PUSH',
      location: {
        hash: '',
        key: 'hogeho',
        pathname: '/groups-todo',
        search: '',
        state: undefined,
      },
    },
  };
};

describe('async actions groups', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Created group is added to approvedGroups when CREATE_GROUP succeeds.', async () => {
    const url = `http://127.0.0.1:8080/groups`;
    const groupName = '古澤家';

    const mockRequest = {
      group_name: groupName,
    };

    const mockResponse = JSON.stringify(createGroupResponse);

    const expectedAction = [
      {
        type: GroupsActions.CREATE_GROUP,
        payload: {
          approvedGroups: [
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
            {
              group_id: 3,
              group_name: '古澤家',
              approved_users_list: [
                {
                  group_id: 3,
                  user_id: 'furusawa',
                  user_name: '古澤',
                },
              ],
              unapproved_users_list: [],
            },
          ],
        },
      },
    ];

    axiosMock.onPost(url, mockRequest).reply(200, mockResponse);

    // @ts-ignore
    await createGroup(groupName)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Get approvedGroups and unapprovedGroups when fetch is successful', async () => {
    const url = `http://127.0.0.1:8080/groups`;
    const mockResponse = JSON.stringify(fetchGroupsResponse);
    const expectedActions = [
      {
        type: GroupsActions.FETCH_GROUPS,
        payload: {
          approvedGroups: [
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
              unapproved_users_list: [
                {
                  group_id: 1,
                  user_id: 'go2',
                  user_name: '郷ひろみ',
                },
              ],
            },
          ],
          unapprovedGroups: [
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
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroups()(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('When INVITE_GROUP_PARTICIPATE is successful, it receives approved user and updates the store.', async () => {
    const groupId = 2;
    const url = `http://127.0.0.1:8080/groups/${groupId}/users/approved`;

    const mockResponse = JSON.stringify(inviteGroupParticipateResponse);

    const expectedActions = [
      {
        type: GroupsActions.INVITE_GROUP_PARTICIPATE,
        payload: {
          approvedGroups: [
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
            {
              group_id: 2,
              group_name: '代表',
              approved_users_list: [
                {
                  group_id: 2,
                  user_id: 'honda',
                  user_name: '本田',
                },
                {
                  group_id: 2,
                  user_id: 'furusawa',
                  user_name: '古澤',
                },
              ],
              unapproved_users_list: [],
            },
          ],
          unapprovedGroups: [],
        },
      },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          args: ['/group-todo/2'],
          method: 'push',
        },
      },
    ];

    axiosMock.onPost(url).reply(200, mockResponse);

    // @ts-ignore
    await inviteGroupParticipate(groupId)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('When INVITE_GROUP_REJECT succeeds,sends the approved groups except the requested group_id to inviteGroupRejectAction, and sends the response message to openTextModalAction', async () => {
    const groupId = 2;
    const url = `http://127.0.0.1:8080/groups/${groupId}/users/unapproved`;

    const mockResponse = JSON.stringify(inviteGroupRejectResponse);

    const expectedGroupActions = [
      {
        type: GroupsActions.INVITE_GROUP_REJECT,
        payload: {
          unapprovedGroups: [],
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: 'グループ招待を拒否しました。',
          open: true,
        },
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponse);

    // @ts-ignore
    await inviteGroupReject(groupId)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedGroupActions);
  });
});
