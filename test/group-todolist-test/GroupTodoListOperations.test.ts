import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as GroupTodoListActions from '../../src/reducks/groupTodoList/actions';
import fetchGroupExpiredTodoListResponse from './fetchGroupExpiredTodoListResponse/fetchGroupExpiredTodoListResponse.json';
import fetchGroupTodayTodoListResponse from './fetchGroupTodayTodoListResponse/fetchGroupTodayTodoListResponse.json';
import fetchGroupMonthlyTodoListResponse from './fetchGroupMonthlyTodoListResponse/fetchGroupMonthlyTodoListResponse.json';
import fetchGroupSearchTodoListResponse from './fetchGroupSearchTodoListResponse/fetchGroupSearchTodoListResponse.json';
import addGroupTodoListItemResponse from './addGroupTodoListItemResponse/addGroupTodoListItemResponse.json';
import addGroupExpiredTodoListResponse from './addGroupTodoListItemResponse/addGroupExpiredTodoListResponse.json';
import addGroupTodayTodoListResponse from './addGroupTodoListItemResponse/addGroupTodayTodoListResponse.json';
import addGroupMonthlyTodoListResponse from './addGroupTodoListItemResponse/addGroupMonthlyTodoListResponse.json';
import editGroupTodoListItemResponse from './editGroupTodoListItemResponse/editGroupTodoListItemResponse.json';
import editGroupExpiredTodoListResponse from './editGroupTodoListItemResponse/editGroupExpiredTodoListResponse.json';
import editGroupTodayTodoListResponse from './editGroupTodoListItemResponse/editGroupTodayTodoListResponse.json';
import editGroupMonthlyTodoListResponse from './editGroupTodoListItemResponse/editGroupMonthlyTodoListResponse.json';
import deleteGroupTodoListItemResponse from './deleteGroupTodoListItemResponse/deleteGroupTodoListItemResponse.json';
import deleteGroupExpiredTodoListResponse from './deleteGroupTodoListItemResponse/deleteGroupExpiredTodoListResponse.json';
import deleteGroupTodayTodoListResponse from './deleteGroupTodoListItemResponse/deleteGroupTodayTodoListResponse.json';
import deleteGroupMonthlyTodoListResponse from './deleteGroupTodoListItemResponse/deleteGroupMonthlyTodoListResponse.json';
import editGroupSearchTodoListItemResponse from './editGroupSearchTodoListItemResponse/editGroupSearchTodoListItemResponse.json';
import editGroupSearchTodoListResponse from './editGroupSearchTodoListItemResponse/editGroupSearchTodoListResponse.json';
import deleteGroupSearchTodoListResponse from './deleteGroupSearchTodoListItemResponse/deleteGroupSearchTodoListResponse.json';

import {
  addGroupTodoListItem,
  deleteGroupTodoListItem,
  editGroupTodoListItem,
  fetchGroupTodayTodoList,
  fetchGroupExpiredTodoList,
  fetchGroupMonthlyTodoList,
  fetchGroupSearchTodoList,
  editGroupSearchTodoListItem,
  deleteGroupSearchTodoListItem,
} from '../../src/reducks/groupTodoList/operations';
import * as ModalActions from '../../src/reducks/modal/actions';
import {
  AddGroupTodoListItemReq,
  EditGroupTodoListItemReq,
} from '../../src/reducks/groupTodoList/types';
import { todoServiceInstance } from '../../src/reducks/axiosConfig';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ groupTodoLists: [], modal: [] });

const axiosMock = new MockAdapter(todoServiceInstance);

describe('async actions groupTodoLists', () => {
  beforeEach(() => {
    store.clearActions();
  });

  let now: Date;
  let spiedDate: Date;

  const originalDate = Date;
  now = new originalDate('2020-09-27T10:54:46Z');
  Date.now = jest.fn().mockReturnValue(now.valueOf());

  // @ts-ignore
  spiedDate = jest.spyOn(global, 'Date').mockImplementation((arg) => {
    if (arg === 0 || arg) {
      return new originalDate(arg);
    }
    return now;
  });

  afterAll(() => {
    // @ts-ignore
    spiedDate.mockRestore();
  });

  it('get groupExpiredTodoList if fetch succeeds.', async () => {
    const groupId = 1;
    const url = `/groups/${groupId}/todo-list/expired`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchGroupExpiredTodoListResponse);

    const expectedAction = [
      {
        type: GroupTodoListActions.START_FETCH_GROUP_EXPIRED_TODO_LIST,
        payload: {
          groupExpiredTodoListLoading: true,
        },
      },
      {
        type: GroupTodoListActions.FETCH_GROUP_EXPIRED_TODO_LIST,
        payload: {
          groupExpiredTodoListLoading: false,
          groupExpiredTodoList: fetchGroupExpiredTodoListResponse.expired_group_todo_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchGroupExpiredTodoList(groupId, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get groupTodayImplementationTodoList and groupTodayDueTodoList if fetch succeeds.', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '09';
    const date = '27';
    const url = `/groups/${groupId}/todo-list/${year}-${month}-${date}`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchGroupTodayTodoListResponse);

    const expectedAction = [
      {
        type: GroupTodoListActions.START_FETCH_GROUP_TODAY_TODO_LIST,
        payload: {
          groupTodayTodoListLoading: true,
        },
      },
      {
        type: GroupTodoListActions.FETCH_GROUP_TODAY_TODO_LIST,
        payload: {
          groupTodayTodoListLoading: false,
          groupTodayImplementationTodoList:
            fetchGroupTodayTodoListResponse.implementation_todo_list,
          groupTodayDueTodoList: fetchGroupTodayTodoListResponse.due_todo_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchGroupTodayTodoList(groupId, year, month, date, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get groupMonthlyImplementationTodoList and groupMonthlyDueTodoList if fetch succeeds.', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '09';
    const url = `/groups/${groupId}/todo-list/${year}-${month}`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchGroupMonthlyTodoListResponse);

    const expectedAction = [
      {
        type: GroupTodoListActions.START_FETCH_GROUP_MONTHLY_TODO_LIST,
        payload: {
          groupMonthlyTodoListLoading: true,
        },
      },
      {
        type: GroupTodoListActions.FETCH_GROUP_MONTHLY_TODO_LIST,
        payload: {
          groupMonthlyTodoListLoading: false,
          groupMonthlyImplementationTodoList:
            fetchGroupMonthlyTodoListResponse.implementation_todo_list,
          groupMonthlyDueTodoList: fetchGroupMonthlyTodoListResponse.due_todo_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchGroupMonthlyTodoList(groupId, year, month, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get groupSearchTodoList if fetch succeeds.', async () => {
    const groupId = 1;
    const url = `/groups/${groupId}/todo-list/search`;

    const params = {
      date_type: 'implementation_date',
      start_date: new Date('2020-09-01T00:00:00'),
      end_date: new Date('2020-09-30T00:00:00'),
      sort: 'implementation_date',
      sort_type: 'desc',
    };

    const expectedAction = [
      {
        type: GroupTodoListActions.START_FETCH_GROUP_SEARCH_TODO_LIST,
        payload: {
          groupSearchTodoListLoading: true,
        },
      },
      {
        type: GroupTodoListActions.FETCH_GROUP_SEARCH_TODO_LIST,
        payload: {
          groupSearchTodoListLoading: false,
          groupSearchTodoList: fetchGroupSearchTodoListResponse.search_todo_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchGroupSearchTodoListResponse);

    // @ts-ignore
    await fetchGroupSearchTodoList(groupId, params)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('add groupTodoList if fetch succeeds.', async () => {
    const groupId = 1;
    const year = '2020';
    const month = '09';
    const date = '27';
    const currentYear = '2020';
    const currentMonth = '09';

    const implementationDate = new Date('2020-09-27T00:00:00');
    const dueDate = new Date('2020-09-29T00:00:00');
    const todoContent = 'お掃除';

    const requestData: AddGroupTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
    };

    const addUrl = `/groups/${groupId}/todo-list`;
    const fetchExpiredUrl = `/groups/${groupId}/todo-list/expired`;
    const fetchTodayUrl = `/groups/${groupId}/todo-list/${year}-${month}-${date}`;
    const fetchMonthlyUrl = `/groups/${groupId}/todo-list/${currentYear}-${currentMonth}`;

    const expectedAction = [
      {
        type: GroupTodoListActions.START_ADD_GROUP_TODO_LIST_ITEM,
        payload: {
          groupExpiredTodoListLoading: true,
          groupTodayTodoListLoading: true,
          groupMonthlyTodoListLoading: true,
        },
      },
      {
        type: GroupTodoListActions.ADD_GROUP_TODO_LIST_ITEM,
        payload: {
          groupExpiredTodoListLoading: false,
          groupExpiredTodoList: addGroupExpiredTodoListResponse.expired_group_todo_list,
          groupTodayTodoListLoading: false,
          groupTodayImplementationTodoList: addGroupTodayTodoListResponse.implementation_todo_list,
          groupTodayDueTodoList: addGroupTodayTodoListResponse.due_todo_list,
          groupMonthlyTodoListLoading: false,
          groupMonthlyImplementationTodoList:
            addGroupMonthlyTodoListResponse.implementation_todo_list,
          groupMonthlyDueTodoList: addGroupMonthlyTodoListResponse.due_todo_list,
        },
      },
    ];

    axiosMock.onPost(addUrl).reply(200, addGroupTodoListItemResponse);
    axiosMock.onGet(fetchExpiredUrl).reply(200, addGroupExpiredTodoListResponse);
    axiosMock.onGet(fetchTodayUrl).reply(200, addGroupTodayTodoListResponse);
    axiosMock.onGet(fetchMonthlyUrl).reply(200, addGroupMonthlyTodoListResponse);

    await addGroupTodoListItem(
      groupId,
      year,
      month,
      date,
      currentYear,
      currentMonth,
      requestData
      // @ts-ignore
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('edit groupTodoList if fetch succeeds.', async () => {
    const groupId = 1;
    const todoListItemId = 2;
    const year = '2020';
    const month = '09';
    const date = '27';
    const currentYear = '2020';
    const currentMonth = '09';

    const implementationDate = new Date('2020-09-27T00:00:00');
    const dueDate = new Date('2020-09-28T00:00:00');
    const todoContent = '買い物へ行く';
    const completeFlag = false;

    const requestData: EditGroupTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
      complete_flag: completeFlag,
    };

    const editUrl = `/groups/${groupId}/todo-list/${todoListItemId}`;
    const fetchExpiredUrl = `/groups/${groupId}/todo-list/expired`;
    const fetchTodayUrl = `/groups/${groupId}/todo-list/${year}-${month}-${date}`;
    const fetchMonthlyUrl = `/groups/${groupId}/todo-list/${currentYear}-${currentMonth}`;

    const expectedAction = [
      {
        type: GroupTodoListActions.START_EDIT_GROUP_TODO_LIST_ITEM,
        payload: {
          groupExpiredTodoListLoading: true,
          groupTodayTodoListLoading: true,
          groupMonthlyTodoListLoading: true,
        },
      },
      {
        type: GroupTodoListActions.EDIT_GROUP_TODO_LIST_ITEM,
        payload: {
          groupExpiredTodoListLoading: false,
          groupExpiredTodoList: editGroupExpiredTodoListResponse.expired_group_todo_list,
          groupTodayTodoListLoading: false,
          groupTodayImplementationTodoList: editGroupTodayTodoListResponse.implementation_todo_list,
          groupTodayDueTodoList: editGroupTodayTodoListResponse.due_todo_list,
          groupMonthlyTodoListLoading: false,
          groupMonthlyImplementationTodoList:
            editGroupMonthlyTodoListResponse.implementation_todo_list,
          groupMonthlyDueTodoList: editGroupMonthlyTodoListResponse.due_todo_list,
        },
      },
    ];

    axiosMock.onPut(editUrl).reply(200, editGroupTodoListItemResponse);
    axiosMock.onGet(fetchExpiredUrl).reply(200, editGroupExpiredTodoListResponse);
    axiosMock.onGet(fetchTodayUrl).reply(200, editGroupTodayTodoListResponse);
    axiosMock.onGet(fetchMonthlyUrl).reply(200, editGroupMonthlyTodoListResponse);

    await editGroupTodoListItem(
      groupId,
      todoListItemId,
      year,
      month,
      date,
      currentYear,
      currentMonth,
      requestData
      // @ts-ignore
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete groupTodoList if fetch succeeds.', async () => {
    const groupId = 1;
    const todoListItemId = 2;
    const year = '2020';
    const month = '09';
    const date = '27';
    const currentYear = '2020';
    const currentMonth = '09';

    const deleteUrl = `/groups/${groupId}/todo-list/${todoListItemId}`;
    const fetchExpiredUrl = `/groups/${groupId}/todo-list/expired`;
    const fetchTodayUrl = `/groups/${groupId}/todo-list/${year}-${month}-${date}`;
    const fetchMonthlyUrl = `/groups/${groupId}/todo-list/${currentYear}-${currentMonth}`;

    const expectedAction = [
      {
        type: GroupTodoListActions.START_DELETE_GROUP_TODO_LIST_ITEM,
        payload: {
          groupExpiredTodoListLoading: true,
          groupTodayTodoListLoading: true,
          groupMonthlyTodoListLoading: true,
        },
      },
      {
        type: GroupTodoListActions.DELETE_GROUP_TODO_LIST_ITEM,
        payload: {
          groupExpiredTodoListLoading: false,
          groupExpiredTodoList: deleteGroupExpiredTodoListResponse.expired_group_todo_list,
          groupTodayTodoListLoading: false,
          groupTodayImplementationTodoList:
            deleteGroupTodayTodoListResponse.implementation_todo_list,
          groupTodayDueTodoList: deleteGroupTodayTodoListResponse.due_todo_list,
          groupMonthlyTodoListLoading: false,
          groupMonthlyImplementationTodoList:
            deleteGroupMonthlyTodoListResponse.implementation_todo_list,
          groupMonthlyDueTodoList: deleteGroupMonthlyTodoListResponse.due_todo_list,
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: deleteGroupTodoListItemResponse.message,
          open: true,
        },
      },
    ];

    axiosMock.onDelete(deleteUrl).reply(200, deleteGroupTodoListItemResponse);
    axiosMock.onGet(fetchExpiredUrl).reply(200, deleteGroupExpiredTodoListResponse);
    axiosMock.onGet(fetchTodayUrl).reply(200, deleteGroupTodayTodoListResponse);
    axiosMock.onGet(fetchMonthlyUrl).reply(200, deleteGroupMonthlyTodoListResponse);

    await deleteGroupTodoListItem(
      groupId,
      todoListItemId,
      year,
      month,
      date,
      currentYear,
      currentMonth
      // @ts-ignore
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('edit groupSearchTodoList if fetch succeeds.', async () => {
    const groupId = 1;
    const todoListItemId = 2;

    const implementationDate = new Date('2020-09-27T00:00:00');
    const dueDate = new Date('2020-09-28T00:00:00');
    const todoContent = '買い物へ行く';
    const completeFlag = false;

    const editRequestData: EditGroupTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
      complete_flag: completeFlag,
    };

    const params = {
      date_type: 'implementation_date',
      start_date: new Date('2020-09-01T00:00:00'),
      end_date: new Date('2020-09-30T00:00:00'),
      sort: 'implementation_date',
      sort_type: 'desc',
    };

    const editUrl = `/groups/${groupId}/todo-list/${todoListItemId}`;
    const fetchSearchUrl = `/groups/${groupId}/todo-list/search`;

    const expectedAction = [
      {
        type: GroupTodoListActions.START_EDIT_GROUP_SEARCH_TODO_LIST_ITEM,
        payload: {
          groupSearchTodoListLoading: true,
        },
      },
      {
        type: GroupTodoListActions.EDIT_GROUP_SEARCH_TODO_LIST_ITEM,
        payload: {
          groupSearchTodoListLoading: false,
          groupSearchTodoList: editGroupSearchTodoListResponse.search_todo_list,
        },
      },
    ];

    axiosMock.onPut(editUrl).reply(200, editGroupSearchTodoListItemResponse);
    axiosMock.onGet(fetchSearchUrl).reply(200, editGroupSearchTodoListResponse);

    // @ts-ignore
    await editGroupSearchTodoListItem(
      groupId,
      todoListItemId,
      editRequestData,
      params
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete groupSearchTodoList if fetch succeeds.', async () => {
    const groupId = 1;
    const todoListItemId = 2;

    const params = {
      date_type: 'implementation_date',
      start_date: new Date('2020-09-01T00:00:00'),
      end_date: new Date('2020-09-30T00:00:00'),
      sort: 'implementation_date',
      sort_type: 'desc',
    };

    const deleteUrl = `/groups/${groupId}/todo-list/${todoListItemId}`;
    const fetchSearchUrl = `/groups/${groupId}/todo-list/search`;

    const expectedAction = [
      {
        type: GroupTodoListActions.START_DELETE_GROUP_SEARCH_TODO_LIST_ITEM,
        payload: {
          groupSearchTodoListLoading: true,
        },
      },
      {
        type: GroupTodoListActions.DELETE_GROUP_SEARCH_TODO_LIST_ITEM,
        payload: {
          groupSearchTodoListLoading: false,
          groupSearchTodoList: deleteGroupSearchTodoListResponse.search_todo_list,
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: deleteGroupTodoListItemResponse.message,
          open: true,
        },
      },
    ];

    axiosMock.onDelete(deleteUrl).reply(200, deleteGroupTodoListItemResponse);
    axiosMock.onGet(fetchSearchUrl).reply(200, deleteGroupSearchTodoListResponse);

    // @ts-ignore
    await deleteGroupSearchTodoListItem(groupId, todoListItemId, params)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
