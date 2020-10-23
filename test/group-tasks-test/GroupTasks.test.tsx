import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import addTaskItemResponse from './addTaskItemResponse.json';
import fetchTasksListEachUserResponse from './fetchTasksListEachUserResponse.json';
import fetchTasksListResponse from './fetchTasksListResponse.json';
import {
  addTaskItem,
  fetchGroupTasksList,
  fetchGroupTasksListEachUser,
} from '../../src/reducks/groupTasks/operations';
import * as GroupTasksActions from '../../src/reducks/groupTasks/actions';

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

    await fetchGroupTasksListEachUser(groupId)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Get groupTasksList when FETCH_GROUP_TASKS_LIST succeeds.', async () => {
    const groupId = 1;
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`;

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

    await fetchGroupTasksList(groupId)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('If ADD_TASK_ITEM is successful, the newly added task item will be added to the groupTasksList.', async () => {
    const groupId = 1;
    const taskName = '買い物';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`;

    const mockRequest = {
      task_name: taskName,
    };

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
});
