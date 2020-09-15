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

const store = mockStore({
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
});

describe('async actions groups', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Get approvedGroups and unapprovedGroups when fetch is successful', async () => {
    const url = 'http://127.0.0.1:8080/groups';
    const store = mockStore({});
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
      const state: any = store.getState();
      const prevApprovedGroups: Groups = state.approved_group_list;

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
      const state: any = store.getState();
      const prevApprovedGroups: Groups = state.approved_group_list;
      const prevUnapprovedGroups: Groups = state.unapproved_group_list;

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
});
