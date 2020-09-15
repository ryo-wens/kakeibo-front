import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { Groups } from '../../src/reducks/groups/types';
import * as GroupsActions from '../../src/reducks/groups/actions';
import { FETCH_GROUPS, GROUP_WITHDRAWAL } from '../../src/reducks/groups/actions';
import * as ModalActions from '../../src/reducks/modal/actions';
import { OPEN_TEXT_MODAL } from '../../src/reducks/modal/actions';

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
        type: FETCH_GROUPS,
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
      type: GROUP_WITHDRAWAL,
      payload: {
        approvedGroups: [],
      },
    };

    const expectedModalActions = {
      type: OPEN_TEXT_MODAL,
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
});
