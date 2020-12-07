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
  groupWithdrawal,
  inviteGroupParticipate,
  inviteGroupReject,
  inviteGroupUsers,
  updateGroupName,
} from '../../src/reducks/groups/operations';
import createGroupResponse from './createGroupResponse.json';
import fetchGroupsResponse from './fetchGroupsResponse.json';
import groupWithdrawalResponse from './groupWithdrawalResponse.json';
import inviteGroupParticipateResponse from './inviteGroupParticipateResponse.json';
import inviteGroupRejectResponse from './inviteGroupRejectResponse.json';
import inviteGroupUsersResponse from './inviteGroupUsersResponse.json';
import updateGroupNameResponse from './updateGroupNameResponse.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new MockAdapter(axios);

const store = mockStore({ users: [], groups: [], router: [] });

const getState = () => {
  return {
    users: {
      id: 'furusawa',
      name: '古澤',
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
              color_code: '#FF0000',
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
              color_code: '#FF0000',
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
      message: '',
    },
    modal: {
      message: '',
      open: false,
    },
    router: {
      action: 'PUSH',
      location: {
        hash: '',
        key: 'hogeho',
        pathname: '/groups/1',
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
    const url = `${process.env.REACT_APP_USER_API_HOST}/groups`;
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
                  color_code: '#FF0000',
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
                  color_code: '#FF0000',
                },
              ],
              unapproved_users_list: [],
            },
          ],
        },
      },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          args: ['/group/3'],
          method: 'push',
        },
      },
    ];

    axiosMock.onPost(url, mockRequest).reply(200, mockResponse);

    // @ts-ignore
    await createGroup(groupName)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('When UPDATE_GROUP_NAME is successful, get the changed group name and change the store.', async () => {
    const groupId = 1;
    const groupName = 'エミリア家';
    const url = `${process.env.REACT_APP_USER_API_HOST}/groups/${groupId}`;

    const mockRequest = {
      group_name: groupName,
    };

    const mockResponse = JSON.stringify(updateGroupNameResponse);

    const expectedActions = [
      {
        type: GroupsActions.UPDATE_GROUP_NAME,
        payload: {
          approvedGroups: [
            {
              group_id: 1,
              group_name: 'エミリア家',
              approved_users_list: [
                {
                  group_id: 1,
                  user_id: 'furusawa',
                  user_name: '古澤',
                  color_code: '#FF0000',
                },
              ],
              unapproved_users_list: [{ group_id: 1, user_id: 'go2', user_name: '郷ひろみ' }],
            },
          ],
        },
      },
    ];

    axiosMock.onPut(url, mockRequest).reply(200, mockResponse);

    // @ts-ignore
    await updateGroupName(groupId, groupName)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Get approvedGroups and unapprovedGroups when fetch is successful', async () => {
    const url = `${process.env.REACT_APP_USER_API_HOST}/groups`;
    const signal = axios.CancelToken.source();

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
                  color_code: '#FF0000',
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
                  color_code: '#FF0000',
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
          message: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroups(signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('When INVITE_GROUP_USERS is successful, it will receive the invited users and update the store.', async () => {
    const groupId = 1;
    const userId = `anraku8`;
    const url = `${process.env.REACT_APP_USER_API_HOST}/groups/${groupId}/users`;

    const mockRequest = {
      user_id: userId,
    };

    const mockResponse = JSON.stringify(inviteGroupUsersResponse);

    const expectedActions = [
      {
        type: GroupsActions.INVITE_GROUP_USERS,
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
                  color_code: '#FF0000',
                },
              ],
              unapproved_users_list: [
                { group_id: 1, user_id: 'go2', user_name: '郷ひろみ' },
                { group_id: 1, user_id: 'anraku8', user_name: '安楽亮佑' },
              ],
            },
          ],
        },
      },
    ];

    axiosMock.onPost(url, mockRequest).reply(200, mockResponse);

    // @ts-ignore
    await inviteGroupUsers(groupId, userId)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('When GROUP_WITHDRAWAL is successful, send the approved groups except the requested group_id to groupWithdrawalAction and send the response message to openTextModalAction.', async () => {
    const groupId = 1;
    const nextGroupId = 0;
    const url = `${process.env.REACT_APP_USER_API_HOST}/groups/${groupId}/users`;

    const mockResponse = JSON.stringify(groupWithdrawalResponse);

    const expectedActions = [
      {
        type: GroupsActions.GROUP_WITHDRAWAL,
        payload: {
          approvedGroups: [],
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: 'グループを退会しました。',
          open: true,
        },
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponse);

    // @ts-ignore
    await groupWithdrawal(groupId, nextGroupId)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('When INVITE_GROUP_PARTICIPATE is successful, it receives approved user and updates the store.', async () => {
    const groupId = 2;
    const url = `${process.env.REACT_APP_USER_API_HOST}/groups/${groupId}/users/approved`;

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
                  color_code: '#FF0000',
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
                  color_code: '#FF0000',
                },
                {
                  group_id: 2,
                  user_id: 'furusawa',
                  user_name: '古澤',
                  color_code: '#00FFFF',
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
          args: ['/group/2'],
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
    const url = `${process.env.REACT_APP_USER_API_HOST}/groups/${groupId}/users/unapproved`;

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
