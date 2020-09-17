import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { Groups, Group, GroupUser } from '../../src/reducks/groups/types';
import * as GroupsActions from '../../src/reducks/groups/actions';
import * as ModalActions from '../../src/reducks/modal/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new MockAdapter(axios);

const store = mockStore({});

const usersStore = mockStore({
  users: {
    user_id: 'furusawa',
    user_name: '古澤',
    email: 'test@gmail.com',
    password: 'password',
  },
});

const groupsStore = mockStore({
  groups: {
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
  },
});

describe('async actions groups', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Created group is added to approvedGroups when CREATE_GROUP succeeds.', async () => {
    const url = `http://127.0.0.1:8080/groups`;

    const mockRequest = {
      group_name: '古澤家',
    };

    const mockResponse = {
      group_id: 3,
      group_name: '古澤家',
    };

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

    await axios.post(url, JSON.stringify(mockRequest), { withCredentials: true }).then((res) => {
      const groupsState: any = groupsStore.getState();
      const usersState: any = usersStore.getState();
      const prevApprovedGroups: Groups = groupsState.groups.approved_group_list;
      const currentUser: {
        user_id: string;
        user_name: string;
        email: string;
        password: string;
      } = usersState.users;

      const user = {
        group_id: res.data.group_id,
        user_id: currentUser.user_id,
        user_name: currentUser.user_name,
      };

      const newGroup = {
        group_id: res.data.group_id,
        group_name: res.data.group_name,
        approved_users_list: [user],
        unapproved_users_list: [],
      };

      const nextApprovedGroups = [...prevApprovedGroups, newGroup];

      store.dispatch(GroupsActions.createGroupAction(nextApprovedGroups));
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('Get approvedGroups and unapprovedGroups when fetch is successful', async () => {
    const url = `http://127.0.0.1:8080/groups`;
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
        type: GroupsActions.FETCH_GROUPS,
        payload: {
          approvedGroups: mockResponse.approved_group_list,
          unapprovedGroups: mockResponse.unapproved_group_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await axios.get(url, { withCredentials: true }).then((res) => {
      const approvedGroups = res.data.approved_group_list;
      const unapprovedGroups = res.data.unapproved_group_list;

      store.dispatch(GroupsActions.fetchGroupsAction(approvedGroups, unapprovedGroups));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('When GROUP_WITHDRAWAL succeeds,sends the approved groups except the requested group_id to groupWithdrawalAction, and sends the response message to openTextModalAction', async () => {
    const groupId = 1;
    const url = `http://127.0.0.1:8080/groups/${groupId}/users`;

    const mockResponse = {
      message: 'グループを退会しました',
    };

    const expectedGroupActions = {
      type: GroupsActions.GROUP_WITHDRAWAL,
      payload: {
        approvedGroups: [],
      },
    };

    const expectedModalActions = {
      type: ModalActions.OPEN_TEXT_MODAL,
      payload: {
        message: mockResponse.message,
        open: true,
      },
    };

    axiosMock.onDelete(url).reply(200, mockResponse);

    await axios.delete(url).then((res) => {
      const groupsState: any = groupsStore.getState();
      const prevApprovedGroups: Groups = groupsState.groups.approved_group_list;

      const updateApprovedGroups: Groups = prevApprovedGroups.filter((prevApprovedGroup) => {
        return prevApprovedGroup.group_id !== groupId;
      });

      expect(store.dispatch(GroupsActions.groupWithdrawalAction(updateApprovedGroups))).toEqual(
        expectedGroupActions
      );
      expect(store.dispatch(ModalActions.openTextModalAction(res.data.message))).toEqual(
        expectedModalActions
      );
    });
  });

  it('When INVITE_GROUP_PARTICIPATE is successful, it receives approved user and updates the store.', async () => {
    const groupId = 2;
    const url = `http://127.0.0.1:8080/groups/${groupId}/users/approved`;

    const mockResponse = {
      group_id: 2,
      user_id: 'furusawa',
      user_name: '古澤',
    };

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
    ];

    axiosMock.onPost(url).reply(200, mockResponse);

    await axios.post(url, null, { withCredentials: true }).then((res) => {
      const groupsState: any = groupsStore.getState();
      const prevApprovedGroups: Groups = groupsState.groups.approved_group_list;
      const prevUnapprovedGroups: Groups = groupsState.groups.unapproved_group_list;

      const matchedGroups = prevUnapprovedGroups.filter((prevUnapprovedGroup: Group) => {
        return prevUnapprovedGroup.group_id === res.data.group_id;
      });

      const matchedGroup: Group = matchedGroups[0];

      const updateUnapprovedUserList = matchedGroup.unapproved_users_list.filter(
        (unapprovedUser: GroupUser) => {
          return unapprovedUser.user_id !== res.data.user_id;
        }
      );

      const participateUser = {
        group_id: res.data.group_id,
        user_id: res.data.user_id,
        user_name: res.data.user_name,
      };

      const participateGroup: Group = {
        group_id: matchedGroup.group_id,
        group_name: matchedGroup.group_name,
        approved_users_list: [...matchedGroup.approved_users_list, participateUser],
        unapproved_users_list: updateUnapprovedUserList,
      };

      const updateApprovedGroups: Groups = [...prevApprovedGroups, participateGroup];
      const updateUnapprovedGroups: Groups = prevUnapprovedGroups.filter(
        (prevUnapprovedGroup: Group) => {
          return prevUnapprovedGroup.group_id !== res.data.group_id;
        }
      );

      store.dispatch(
        GroupsActions.inviteGroupParticipateAction(updateApprovedGroups, updateUnapprovedGroups)
      );
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('When INVITE_GROUP_REJECT succeeds,sends the approved groups except the requested group_id to inviteGroupRejectAction, and sends the response message to openTextModalAction', async () => {
    const groupId = 2;
    const url = `http://127.0.0.1:8080/groups/${groupId}/users/unapproved`;

    const mockResponse = {
      message: 'グループ招待を拒否しました。',
    };

    const expectedGroupActions = {
      type: GroupsActions.INVITE_GROUP_REJECT,
      payload: {
        unapprovedGroups: [],
      },
    };

    const expectedModalActions = {
      type: ModalActions.OPEN_TEXT_MODAL,
      payload: {
        message: mockResponse.message,
        open: true,
      },
    };

    axiosMock.onDelete(url).reply(200, mockResponse);

    await axios.delete(url, { withCredentials: true }).then((res) => {
      const groupsState: any = groupsStore.getState();
      const prevUnapprovedGroups: Groups = groupsState.groups.unapproved_group_list;

      const updateUnapprovedGroups: Groups = prevUnapprovedGroups.filter(
        (prevUnapprovedGroup: Group) => {
          return prevUnapprovedGroup.group_id !== groupId;
        }
      );

      expect(store.dispatch(GroupsActions.inviteGroupRejectAction(updateUnapprovedGroups))).toEqual(
        expectedGroupActions
      );
      expect(store.dispatch(ModalActions.openTextModalAction(res.data.message))).toEqual(
        expectedModalActions
      );
    });
  });
});
