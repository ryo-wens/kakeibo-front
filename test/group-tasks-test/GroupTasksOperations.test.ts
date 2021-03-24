import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import fetchTaskListForEachUserResponse from './fetchTaskListForEachUserResponse/fetchTaskListForEachUserResponse.json';
import addTaskUsersResponse from './addTaskUsersResponse/addUsersTaskListForEachUserResponse.json';
import addUsersTaskListForEachUserResponse from './addTaskUsersResponse/addUsersTaskListForEachUserResponse.json';
import addUsersTaskListResponse from './addTaskUsersResponse/addUsersTaskListResponse.json';
import deleteTaskUsersResponse from './deleteTaskUsersResponse/deleteTaskUsersResponse.json';
import deleteUsersTaskListForEachUserResponse from './deleteTaskUsersResponse/deleteUsersTaskListForEachUserResponse.json';
import deleteUsersTaskListResponse from './deleteTaskUsersResponse/deleteUsersTaskListResponse.json';
import fetchTaskListResponse from './fetchTaskListResponse/fetchTaskListResponse.json';
import addTaskItemResponse from './addTaskItemResponse/addTaskItemResponse.json';
import addGroupTaskListResponse from './addTaskItemResponse/addGroupTaskListResponse.json';
import editTaskItemResponse from './editTaskItemResponse/editTaskItemResponse.json';
import editTaskItemTaskListResponse from './editTaskItemResponse/editTaskItemTaskListResponse.json';
import editTaskItemTaskListForEachUserResponse from './editTaskItemResponse/editTaskItemTaskListForEachUserResponse.json';
import deleteTaskItemResponse from './deleteTaskItemResponse/deleteTaskItemResponse.json';
import deleteTaskItemTaskListResponse from './deleteTaskItemResponse/deleteTaskItemTaskListResponse.json';
import deleteTaskItemTaskListForEachUserResponse from './deleteTaskItemResponse/deleteTaskItemTaskListForEachUserResponse.json';
import {
  addTaskItem,
  addTaskUsers,
  deleteTaskItem,
  deleteTaskUsers,
  editTaskItem,
  fetchGroupTaskList,
  fetchGroupTaskListForEachUser,
} from '../../src/reducks/groupTasks/operations';
import * as GroupTasksActions from '../../src/reducks/groupTasks/actions';
import * as ModalActions from '../../src/reducks/modal/actions';
import {
  AddGroupTaskUsersReq,
  AddTaskItemReq,
  DeleteGroupTaskUsersReq,
  EditTaskItemReq,
} from '../../src/reducks/groupTasks/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  groupTasksListForEachUser: [],
  groupTasksList: [],
  modal: [],
  router: [],
});

const axiosMock = new MockAdapter(axios);

describe('async actions groupTasks', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('get groupTaskListForEachUser if fetch succeeds.', async () => {
    const groupId = 1;
    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`;
    const signal = axios.CancelToken.source();

    const expectedAction = [
      {
        type: GroupTasksActions.START_FETCH_GROUP_TASK_LIST_FOR_EACH_USER,
        payload: {
          groupTaskListForEachUserLoading: true,
          groupTaskListForEachUserError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: GroupTasksActions.FETCH_GROUP_TASK_LIST_FOR_EACH_USER,
        payload: {
          groupTaskListForEachUserLoading: false,
          groupTaskListForEachUser: fetchTaskListForEachUserResponse.group_tasks_list_for_each_user,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchTaskListForEachUserResponse);

    await fetchGroupTaskListForEachUser(groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('add taskUsers if fetch succeeds.', async () => {
    const groupId = 1;
    const users = ['Taira', 'Ito'];

    const requestData: AddGroupTaskUsersReq = {
      users_list: users,
    };

    const addUrl = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`;
    const fetchTaskListForEachUserUrl = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`;
    const fetchTaskListUrl = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`;

    const expectedAction = [
      {
        type: GroupTasksActions.START_ADD_TASK_USERS,
        payload: {
          groupTaskListForEachUserLoading: true,
          groupTaskListLoading: true,
        },
      },
      {
        type: GroupTasksActions.ADD_TASK_USERS,
        payload: {
          groupTaskListForEachUserLoading: false,
          groupTaskListForEachUser:
            addUsersTaskListForEachUserResponse.group_tasks_list_for_each_user,
          groupTaskListLoading: false,
          groupTaskList: addUsersTaskListResponse.group_tasks_list,
        },
      },
    ];

    axiosMock.onPost(addUrl).reply(200, addTaskUsersResponse);
    axiosMock.onGet(fetchTaskListForEachUserUrl).reply(200, addUsersTaskListForEachUserResponse);
    axiosMock.onGet(fetchTaskListUrl).reply(200, addUsersTaskListResponse);

    await addTaskUsers(groupId, requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete taskUsers if fetch succeeds.', async () => {
    const groupId = 1;
    const users = ['anraku'];

    const requestData: DeleteGroupTaskUsersReq = {
      users_list: users,
    };

    const deleteUrl = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`;
    const fetchTaskListForEachUserUrl = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`;
    const fetchTaskListUrl = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`;

    const expectedAction = [
      {
        type: GroupTasksActions.START_DELETE_TASK_USERS,
        payload: {
          groupTaskListLoading: true,
          groupTaskListForEachUserLoading: true,
        },
      },
      {
        type: GroupTasksActions.DELETE_TASK_USERS,
        payload: {
          groupTaskListLoading: false,
          groupTaskList: deleteUsersTaskListResponse.group_tasks_list,
          groupTaskListForEachUserLoading: false,
          groupTaskListForEachUser:
            deleteUsersTaskListForEachUserResponse.group_tasks_list_for_each_user,
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: deleteTaskUsersResponse.message,
          open: true,
        },
      },
    ];

    axiosMock.onDelete(deleteUrl).reply(200, deleteTaskUsersResponse);
    axiosMock.onGet(fetchTaskListForEachUserUrl).reply(200, deleteUsersTaskListForEachUserResponse);
    axiosMock.onGet(fetchTaskListUrl).reply(200, deleteUsersTaskListResponse);

    await deleteTaskUsers(groupId, requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get groupTaskList if fetch succeeds.', async () => {
    const groupId = 1;
    const signal = axios.CancelToken.source();

    const url = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`;

    const expectedAction = [
      {
        type: GroupTasksActions.START_FETCH_GROUP_TASK_LIST,
        payload: {
          groupTaskListLoading: true,
          groupTaskListError: {
            statusCode: null,
            errorMessage: '',
          },
        },
      },
      {
        type: GroupTasksActions.FETCH_GROUP_TASK_LIST,
        payload: {
          groupTaskListLoading: false,
          groupTaskList: fetchTaskListResponse.group_tasks_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchTaskListResponse);

    await fetchGroupTaskList(groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('add taskListItem if fetch succeeds.', async () => {
    const groupId = 1;
    const taskName = '買い物';

    const requestData: AddTaskItemReq = {
      task_name: taskName,
    };

    const addUrl = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`;
    const fetchUrl = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`;

    const expectedAction = [
      {
        type: GroupTasksActions.START_ADD_TASK_ITEM,
        payload: {
          groupTaskListLoading: true,
        },
      },
      {
        type: GroupTasksActions.ADD_TASK_ITEM,
        payload: {
          groupTaskListLoading: false,
          groupTaskList: addGroupTaskListResponse.group_tasks_list,
        },
      },
    ];

    axiosMock.onPost(addUrl).reply(200, addTaskItemResponse);
    axiosMock.onGet(fetchUrl).reply(200, addGroupTaskListResponse);

    // @ts-ignore
    await addTaskItem(groupId, requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('edit taskListItem if fetch succeeds.', async () => {
    const groupId = 1;
    const taskItemId = 2;

    const baseDate = new Date('2020-10-14T00:00:00Z');
    const cycleType = 'consecutive';
    const cycle = 3;
    const taskName = '部屋の片付け';
    const groupTasksUsersId = 2;

    const requestData: EditTaskItemReq = {
      base_date: baseDate,
      cycle_type: cycleType,
      cycle: cycle,
      task_name: taskName,
      group_tasks_users_id: groupTasksUsersId,
    };

    const editUrl = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/${taskItemId}`;
    const fetchTaskListUrl = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`;
    const fetchTaskListForEachUserUrl = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`;

    const expectedAction = [
      {
        type: GroupTasksActions.START_EDIT_TASK_ITEM,
        payload: {
          groupTaskListLoading: true,
          groupTaskListForEachUserLoading: true,
        },
      },
      {
        type: GroupTasksActions.EDIT_TASK_ITEM,
        payload: {
          groupTaskListLoading: false,
          groupTaskList: editTaskItemTaskListResponse.group_tasks_list,
          groupTaskListForEachUserLoading: false,
          groupTaskListForEachUser:
            editTaskItemTaskListForEachUserResponse.group_tasks_list_for_each_user,
        },
      },
    ];

    axiosMock.onPut(editUrl).reply(200, editTaskItemResponse);
    axiosMock.onGet(fetchTaskListUrl).reply(200, editTaskItemTaskListResponse);
    axiosMock
      .onGet(fetchTaskListForEachUserUrl)
      .reply(200, editTaskItemTaskListForEachUserResponse);

    await editTaskItem(groupId, taskItemId, requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete taskListItem if fetch succeeds.', async () => {
    const groupId = 1;
    const taskItemId = 2;

    const editUrl = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/${taskItemId}`;
    const fetchTaskListUrl = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks`;
    const fetchTaskListForEachUserUrl = `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/tasks/users`;

    const expectedAction = [
      {
        type: GroupTasksActions.START_DELETE_TASK_ITEM,
        payload: {
          groupTaskListLoading: true,
          groupTaskListForEachUserLoading: true,
        },
      },
      {
        type: GroupTasksActions.DELETE_TASK_ITEM,
        payload: {
          groupTaskListLoading: false,
          groupTaskList: deleteTaskItemTaskListResponse.group_tasks_list,
          groupTaskListForEachUserLoading: false,
          groupTaskListForEachUser:
            deleteTaskItemTaskListForEachUserResponse.group_tasks_list_for_each_user,
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: deleteTaskItemResponse.message,
          open: true,
        },
      },
    ];

    axiosMock.onDelete(editUrl).reply(200, deleteTaskItemResponse);
    axiosMock.onGet(fetchTaskListUrl).reply(200, deleteTaskItemTaskListResponse);
    axiosMock
      .onGet(fetchTaskListForEachUserUrl)
      .reply(200, deleteTaskItemTaskListForEachUserResponse);

    await deleteTaskItem(groupId, taskItemId)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
