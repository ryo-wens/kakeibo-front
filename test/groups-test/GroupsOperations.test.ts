import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as GroupsActions from '../../src/reducks/groups/actions';
import * as ModalActions from '../../src/reducks/modal/actions';
import {
  addGroup,
  editGroupName,
  fetchGroups,
  inviteGroupReject,
  inviteUsersToGroup,
  joinInvitationGroup,
  unsubscribeGroup,
} from '../../src/reducks/groups/operations';
import addGroupResponse from './addGroupResponse.json';
import fetchGroupsResponse from './fetchGroupsResponse.json';
import unsubscribeGroupResponse from './unsubscribeGroupResponse.json';
import joinInvitationGroupResponse from './joinInvitationGroupResponse.json';
import inviteGroupRejectResponse from './inviteGroupRejectResponse.json';
import inviteUsersToGroupResponse from './inviteUsersToGroupResponse.json';
import editGroupNameResponse from './editGroupNameResponse.json';
import { userServiceInstance } from '../../src/reducks/axiosConfig';
import {
  AddGroupReq,
  EditGroupNameReq,
  InviteUsersToGroupReq,
} from '../../src/reducks/groups/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new MockAdapter(userServiceInstance);

const store = mockStore({ users: [], groups: [], router: [] });

const getState = () => {
  return {
    users: {
      user_id: 'furusawa',
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

  it('get approvedGroups and unapprovedGroups if fetch succeeds.', async () => {
    const url = `/groups`;
    const signal = axios.CancelToken.source();

    const expectedActions = [
      {
        type: GroupsActions.START_FETCH_GROUPS,
        payload: {
          groupsLoading: true,
        },
      },
      {
        type: GroupsActions.FETCH_GROUPS,
        payload: {
          groupsLoading: false,
          approvedGroups: fetchGroupsResponse.approved_group_list,
          unapprovedGroups: fetchGroupsResponse.unapproved_group_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchGroupsResponse);

    await fetchGroups(signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch groupId and groupName if add succeeds.', async () => {
    const url = `/groups`;
    const groupName = '古澤家';

    const requestData: AddGroupReq = {
      group_name: groupName,
    };

    const expectedAction = [
      {
        type: GroupsActions.START_ADD_GROUP,
        payload: {
          groupsLoading: true,
        },
      },
      {
        type: GroupsActions.ADD_GROUP,
        payload: {
          group: {
            groupId: addGroupResponse.group_id,
            groupName: addGroupResponse.group_name,
          },
        },
      },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          args: [`/group/${addGroupResponse.group_id}/home`],
          method: 'push',
        },
      },
    ];

    axiosMock.onPost(url, requestData).reply(200, addGroupResponse);

    await addGroup(requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('fetch groupId and groupName if edit group name succeeds.', async () => {
    const groupId = 1;
    const groupName = 'エミリア家';
    const url = `/groups/${groupId}`;

    const requestData: EditGroupNameReq = {
      group_name: groupName,
    };

    const expectedActions = [
      {
        type: GroupsActions.START_EDIT_GROUP_NAME,
        payload: {
          groupsLoading: true,
        },
      },
      {
        type: GroupsActions.EDIT_GROUP_NAME,
        payload: {
          group: {
            groupId: editGroupNameResponse.group_id,
            groupName: editGroupNameResponse.group_name,
          },
        },
      },
    ];

    axiosMock.onPut(url, requestData).reply(200, editGroupNameResponse);

    await editGroupName(groupId, requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch message if unsubscribe group succeeds.', async () => {
    const groupId = 1;
    const url = `/groups/${groupId}/users`;

    const expectedActions = [
      {
        type: GroupsActions.START_UNSUBSCRIBE_GROUP,
        payload: {
          groupsLoading: true,
        },
      },
      {
        type: GroupsActions.UNSUBSCRIBE_GROUP,
        payload: {
          group: {
            groupId: 0,
            groupName: '',
          },
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: unsubscribeGroupResponse.message,
          open: true,
        },
      },
    ];

    axiosMock.onDelete(url).reply(200, unsubscribeGroupResponse);

    await unsubscribeGroup(groupId)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch groupId and userId and userName  if invite user to group succeeds.', async () => {
    const groupId = 1;
    const userId = `anraku8`;
    const url = `/groups/${groupId}/users`;

    const requestData: InviteUsersToGroupReq = {
      user_id: userId,
    };

    const expectedActions = [
      {
        type: GroupsActions.START_INVITE_USERS_TO_GROUP,
        payload: {
          groupsLoading: true,
        },
      },
      {
        type: GroupsActions.INVITE_USERS_TO_GROUP,
        payload: {
          groupUser: {
            groupId: inviteUsersToGroupResponse.group_id,
            userId: inviteUsersToGroupResponse.user_id,
            userName: inviteUsersToGroupResponse.user_name,
            colorCode: '',
          },
        },
      },
    ];

    axiosMock.onPost(url).reply(200, inviteUsersToGroupResponse);

    await inviteUsersToGroup(groupId, requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fetch groupId and userId and userName and colorCode  if join invitation group succeeds.', async () => {
    const groupId = 2;
    const url = `/groups/${groupId}/users/approved`;

    const expectedActions = [
      {
        type: GroupsActions.START_JOIN_INVITATION_GROUP,
        payload: {
          groupsLoading: true,
        },
      },
      {
        type: GroupsActions.JOIN_INVITATION_GROUP,
        payload: {
          groupUser: {
            groupId: joinInvitationGroupResponse.group_id,
            userId: joinInvitationGroupResponse.user_id,
            userName: joinInvitationGroupResponse.user_name,
            colorCode: joinInvitationGroupResponse.color_code,
          },
        },
      },
    ];

    axiosMock.onPost(url).reply(200, joinInvitationGroupResponse);

    // @ts-ignore
    await joinInvitationGroup(groupId)(store.dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('When INVITE_GROUP_REJECT succeeds,sends the approved groups except the requested group_id to inviteGroupRejectAction, and sends the response message to openTextModalAction', async () => {
    const groupId = 2;
    const url = `/groups/${groupId}/users/unapproved`;

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
