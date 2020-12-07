import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import addGroupTasksUsersResponse from './addGroupTasksUsersResponse.json';
import addTaskItemResponse from './addTaskItemResponse.json';
import deleteTaskItemResponse from './deleteTaskItemResponse.json';
import deleteGroupTasksUsersResponse from './deleteGroupTasksUsersResponse.json';
import editTaskItemResponse from './editTaskItemResponse.json';
import fetchTasksListEachUserResponse from './fetchTasksListEachUserResponse.json';
import fetchTasksListResponse from './fetchTasksListResponse.json';
import {
  addGroupTasksUsers,
  addTaskItem,
  deleteGroupTasksUsers,
  deleteTaskItem,
  editTaskItem,
  fetchGroupTasksList,
  fetchGroupTasksListEachUser,
} from '../../src/reducks/groupTasks/operations';
import * as GroupTasksActions from '../../src/reducks/groupTasks/actions';
import * as ModalActions from '../../src/reducks/modal/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  groupTasksListForEachUser: [],
  groupTasksList: [],
  modal: [],
  router: [],
});

const axiosMock = new MockAdapter(axios);

const getState = () => {
  return {
    groupTasks: {
      groupTasksListForEachUser: [
        {
          id: 1,
          user_id: 'furusawa',
          group_id: 1,
          tasks_list: [
            {
              id: 1,
              base_date: '2020-10-14T00:00:00Z',
              cycle_type: 'every',
              cycle: 7,
              task_name: 'トイレ掃除',
              group_id: 1,
              group_tasks_users_id: 1,
            },
          ],
        },
        {
          id: 2,
          user_id: 'anraku',
          group_id: 1,
          tasks_list: [
            {
              id: 2,
              base_date: '2020-10-14T00:00:00Z',
              cycle_type: 'consecutive',
              cycle: 3,
              task_name: '料理',
              group_id: 1,
              group_tasks_users_id: 2,
            },
          ],
        },
      ],
      groupTasksList: [
        {
          id: 1,
          base_date: '2020-10-14T00:00:00Z',
          cycle_type: 'every',
          cycle: 7,
          task_name: 'トイレ掃除',
          group_id: 1,
          group_tasks_users_id: 1,
        },
        {
          id: 2,
          base_date: '2020-10-14T00:00:00Z',
          cycle_type: 'consecutive',
          cycle: 3,
          task_name: '料理',
          group_id: 1,
          group_tasks_users_id: 2,
        },
      ],
    },
    modal: { message: '', open: false },
    router: {
      action: 'PUSH',
      location: {
        hash: '',
        key: 'hogeho',
        pathname: '/groups-todo/1',
        search: '',
        state: undefined,
      },
    },
  };
};

describe('async actions groupTasks', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Get groupTasksListForEachUser when FETCH_GROUP_TASKS_LIST_EACH_USER succeeds.', async () => {
    const groupId = 1;
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchTasksListEachUserResponse);

    const expectedAction = [
      {
        type: GroupTasksActions.FETCH_GROUP_TASKS_LIST_EACH_USER,
        payload: {
          groupTasksListForEachUser: [
            {
              id: 1,
              user_id: 'furusawa',
              group_id: 1,
              tasks_list: [
                {
                  id: 1,
                  base_date: '2020-10-14T00:00:00Z',
                  cycle_type: 'every',
                  cycle: 7,
                  task_name: 'トイレ掃除',
                  group_id: 1,
                  group_tasks_users_id: 1,
                },
              ],
            },
            {
              id: 2,
              user_id: 'anraku',
              group_id: 1,
              tasks_list: [
                {
                  id: 2,
                  base_date: '2020-10-14T00:00:00Z',
                  cycle_type: 'consecutive',
                  cycle: 3,
                  task_name: '料理',
                  group_id: 1,
                  group_tasks_users_id: 2,
                },
              ],
            },
          ],
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupTasksListEachUser(groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('If ADD_GROUP_TASKS_USERS is successful, the newly added task users will be added to the groupTasksListForEachUser.', async () => {
    const groupId = 1;
    const users = ['Taira', 'Ito'];
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`;

    const mockResponse = JSON.stringify(addGroupTasksUsersResponse);

    const expectedAction = [
      {
        type: GroupTasksActions.ADD_GROUP_TASKS_USERS,
        payload: {
          groupTasksListForEachUser: [
            {
              id: 1,
              user_id: 'furusawa',
              group_id: 1,
              tasks_list: [
                {
                  id: 1,
                  base_date: '2020-10-14T00:00:00Z',
                  cycle_type: 'every',
                  cycle: 7,
                  task_name: 'トイレ掃除',
                  group_id: 1,
                  group_tasks_users_id: 1,
                },
              ],
            },
            {
              id: 2,
              user_id: 'anraku',
              group_id: 1,
              tasks_list: [
                {
                  id: 2,
                  base_date: '2020-10-14T00:00:00Z',
                  cycle_type: 'consecutive',
                  cycle: 3,
                  task_name: '料理',
                  group_id: 1,
                  group_tasks_users_id: 2,
                },
              ],
            },
            {
              id: 3,
              user_id: 'Taira',
              group_id: 1,
              tasks_list: [],
            },
            {
              id: 4,
              user_id: 'Ito',
              group_id: 1,
              tasks_list: [],
            },
          ],
        },
      },
    ];

    axiosMock.onPost(url).reply(200, mockResponse);

    // @ts-ignore
    await addGroupTasksUsers(groupId, users)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('If DELETE_GROUP_TASKS_USERS is successful, the selected task user will be removed from groupTasksListForEachUser.', async () => {
    const groupId = 1;
    const users = ['anraku'];
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`;

    const mockResponse = JSON.stringify(deleteGroupTasksUsersResponse);

    const expectedAction = [
      {
        type: GroupTasksActions.DELETE_GROUP_TASKS_USERS,
        payload: {
          groupTasksListForEachUser: [
            {
              id: 1,
              user_id: 'furusawa',
              group_id: 1,
              tasks_list: [
                {
                  id: 1,
                  base_date: '2020-10-14T00:00:00Z',
                  cycle_type: 'every',
                  cycle: 7,
                  task_name: 'トイレ掃除',
                  group_id: 1,
                  group_tasks_users_id: 1,
                },
              ],
            },
          ],
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: 'タスクメンバーを削除しました。',
          open: true,
        },
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponse);

    // @ts-ignore
    await deleteGroupTasksUsers(groupId, users)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Get groupTasksList when FETCH_GROUP_TASKS_LIST succeeds.', async () => {
    const groupId = 1;
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchTasksListResponse);

    const expectedAction = [
      {
        type: GroupTasksActions.FETCH_GROUP_TASKS_LIST,
        payload: {
          groupTasksList: [
            {
              id: 1,
              base_date: '2020-10-14T00:00:00Z',
              cycle_type: 'every',
              cycle: 7,
              task_name: 'トイレ掃除',
              group_id: 1,
              group_tasks_users_id: 1,
            },
            {
              id: 2,
              base_date: '2020-10-14T00:00:00Z',
              cycle_type: 'consecutive',
              cycle: 3,
              task_name: '料理',
              group_id: 1,
              group_tasks_users_id: 2,
            },
          ],
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupTasksList(groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('If ADD_TASK_ITEM is successful, the newly added task item will be added to the groupTasksList.', async () => {
    const groupId = 1;
    const taskName = '買い物';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`;

    const mockResponse = JSON.stringify(addTaskItemResponse);

    const expectedAction = [
      {
        type: GroupTasksActions.ADD_TASK_ITEM,
        payload: {
          groupTasksList: [
            {
              id: 1,
              base_date: '2020-10-14T00:00:00Z',
              cycle_type: 'every',
              cycle: 7,
              task_name: 'トイレ掃除',
              group_id: 1,
              group_tasks_users_id: 1,
            },
            {
              id: 2,
              base_date: '2020-10-14T00:00:00Z',
              cycle_type: 'consecutive',
              cycle: 3,
              task_name: '料理',
              group_id: 1,
              group_tasks_users_id: 2,
            },
            {
              id: 3,
              base_date: null,
              cycle_type: null,
              cycle: null,
              task_name: '買い物',
              group_id: 1,
              group_tasks_users_id: null,
            },
          ],
        },
      },
    ];

    axiosMock.onPost(url).reply(200, mockResponse);

    // @ts-ignore
    await addTaskItem(groupId, taskName)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Updated taskListItem will be reflected in groupTaskList if EDIT_TASK_ITEM is successful.', async () => {
    const groupId = 1;
    const taskItemId = 2;
    const baseDate = new Date('2020-10-14T00:00:00Z');
    const cycleType = 'consecutive';
    const cycle = 3;
    const taskName = '部屋の片付け';
    const groupTasksUsersId = 2;
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/${taskItemId}`;

    const mockResponse = JSON.stringify(editTaskItemResponse);

    const expectedAction = [
      {
        type: GroupTasksActions.EDIT_TASK_ITEM,
        payload: {
          groupTasksList: [
            {
              id: 1,
              base_date: '2020-10-14T00:00:00Z',
              cycle_type: 'every',
              cycle: 7,
              task_name: 'トイレ掃除',
              group_id: 1,
              group_tasks_users_id: 1,
            },
            {
              id: 2,
              base_date: '2020-10-14T00:00:00Z',
              cycle_type: 'consecutive',
              cycle: 3,
              task_name: '部屋の片付け',
              group_id: 1,
              group_tasks_users_id: 2,
            },
          ],
        },
      },
    ];

    axiosMock.onPut(url).reply(200, mockResponse);

    await editTaskItem(
      groupId,
      taskItemId,
      baseDate,
      cycleType,
      cycle,
      taskName,
      groupTasksUsersId
      // @ts-ignore
    )(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('If DELETE_TASK_ITEM is successful, send a groupTasksList excluding the taskItem of the requested taskItemId to deleteTaskItemAction and send a response message to openTextModalAction.', async () => {
    const groupId = 1;
    const taskItemId = 2;
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/${taskItemId}`;

    const mockResponse = JSON.stringify(deleteTaskItemResponse);

    const expectedAction = [
      {
        type: GroupTasksActions.DELETE_TASK_ITEM,
        payload: {
          groupTasksList: [
            {
              id: 1,
              base_date: '2020-10-14T00:00:00Z',
              cycle_type: 'every',
              cycle: 7,
              task_name: 'トイレ掃除',
              group_id: 1,
              group_tasks_users_id: 1,
            },
          ],
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: 'タスクを削除しました。',
          open: true,
        },
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponse);

    // @ts-ignore
    await deleteTaskItem(groupId, taskItemId)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
