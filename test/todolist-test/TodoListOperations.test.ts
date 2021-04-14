import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as TodoListActions from '../../src/reducks/todoList/actions';
import * as ModalActions from '../../src/reducks/modal/actions';
import {
  addTodoListItem,
  deleteTodoListItem,
  editTodoListItem,
  fetchTodayTodoList,
  fetchExpiredTodoList,
  fetchMonthlyTodoList,
  fetchSearchTodoList,
  editSearchTodoListItem,
  deleteSearchTodoListItem,
} from '../../src/reducks/todoList/operations';
import fetchExpiredTodoListResponse from './fetchExpiredTodoListResponse/fetchExpiredTodoListResponse.json';
import fetchTodayTodoListResponse from './fetchTodayTodoListResponse/fetchTodayTodoListResponse.json';
import fetchMonthlyTodoListResponse from './fetchMonthlyTodoListResponse/fetchMonthlyTodoListResponse.json';
import fetchSearchTodoListResponse from './fetchSearchTodoListResponse/fetchSearchTodoListResponse.json';
import addTodoListItemResponse from './addTodoListItemResponse/addTodoListItemResponse.json';
import editTodoListItemResponse from './editTodoListItemResponse/editTodoListItemResponse.json';
import deleteTodoListItemResponse from './deleteTodoListItemResponse/deleteTodoListItemResponse.json';
import editSearchTodoListItemResponse from './editSearchTodoListItemResponse/editSearchTodoListItemResponse.json';
import editSearchTodoListResponse from './editSearchTodoListItemResponse/editSearchTodoListResponse.json';
import deleteSearchTodoListResponse from './deleteSearchTodoListItemResponse/deleteSearchTodoListResponse.json';
import { AddTodoListItemReq, EditTodoListItemReq } from '../../src/reducks/todoList/types';
import { todoServiceInstance } from '../../src/reducks/axiosConfig';
import { date } from '../../src/lib/constant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ todoList: [], modal: [] });

const axiosMock = new MockAdapter(todoServiceInstance);

describe('async actions todoLists', () => {
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

  it('get expiredTodoList if fetch succeeds.', async () => {
    const url = `/todo-list/expired`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchExpiredTodoListResponse);

    const expectedAction = [
      {
        type: TodoListActions.START_FETCH_EXPIRED_TODO_LIST,
        payload: {
          expiredTodoListLoading: true,
        },
      },
      {
        type: TodoListActions.FETCH_EXPIRED_TODO_LIST,
        payload: {
          expiredTodoListLoading: false,
          expiredTodoList: fetchExpiredTodoListResponse.expired_todo_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    await fetchExpiredTodoList(signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get todayImplementationTodoList and todayDueTodoList if fetch succeeds.', async () => {
    const year = '2020';
    const month = '09';
    const date = '27';
    const url = `/todo-list/${year}-${month}-${date}`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchTodayTodoListResponse);

    const expectedAction = [
      {
        type: TodoListActions.START_FETCH_TODAY_TODO_LIST,
        payload: {
          todayTodoListLoading: true,
        },
      },
      {
        type: TodoListActions.FETCH_TODAY_TODO_LIST,
        payload: {
          todayTodoListLoading: false,
          todayImplementationTodoList: fetchTodayTodoListResponse.implementation_todo_list,
          todayDueTodoList: fetchTodayTodoListResponse.due_todo_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchTodayTodoList(year, month, date, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get monthlyImplementationTodoList and monthlyDueTodoList if fetch succeeds.', async () => {
    const year = '2020';
    const month = '09';
    const url = `/todo-list/${year}-${month}`;
    const signal = axios.CancelToken.source();

    const mockResponse = JSON.stringify(fetchMonthlyTodoListResponse);

    const expectedAction = [
      {
        type: TodoListActions.START_FETCH_MONTHLY_TODO_LIST,
        payload: {
          monthlyTodoListLoading: true,
        },
      },
      {
        type: TodoListActions.FETCH_MONTHLY_TODO_LIST,
        payload: {
          monthlyTodoListLoading: false,
          monthlyImplementationTodoList: fetchMonthlyTodoListResponse.implementation_todo_list,
          monthlyDueTodoList: fetchMonthlyTodoListResponse.due_todo_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchMonthlyTodoList(year, month, signal)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('get searchTodoList if fetch succeeds.', async () => {
    const url = `/todo-list/search`;

    const params = {
      date_type: 'implementation_date',
      start_date: new Date('2020-09-01T00:00:00'),
      end_date: new Date('2020-09-30T00:00:00'),
      sort: 'implementation_date',
      sort_type: 'desc',
    };

    const expectedAction = [
      {
        type: TodoListActions.START_FETCH_SEARCH_TODO_LIST,
        payload: {
          searchTodoListLoading: true,
        },
      },
      {
        type: TodoListActions.FETCH_SEARCH_TODO_LIST,
        payload: {
          searchTodoListLoading: false,
          searchTodoList: fetchSearchTodoListResponse.search_todo_list,
        },
      },
    ];

    axiosMock.onGet(url).reply(200, fetchSearchTodoListResponse);

    // @ts-ignore
    await fetchSearchTodoList(params)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('add todoList if fetch succeeds.', async () => {
    const implementationDate = new Date('2020-09-28T00:00:00Z');
    const dueDate = new Date('2020-09-29T00:00:00Z');
    const todoContent = '買い物へゆく';

    const requestData: AddTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
    };

    const url = `/todo-list`;

    const expectedAction = [
      {
        type: TodoListActions.START_ADD_TODO_LIST_ITEM,
        payload: {
          expiredTodoListLoading: true,
          todayTodoListLoading: true,
          monthlyTodoListLoading: true,
        },
      },
      {
        type: TodoListActions.ADD_TODO_LIST_ITEM,
        payload: {
          todoListItem: addTodoListItemResponse,
        },
      },
    ];

    axiosMock.onPost(url).reply(200, addTodoListItemResponse);

    await addTodoListItem(requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('edit todoList if fetch succeeds.', async () => {
    const todoListItemId = 2;

    const implementationDate = new Date('2020-09-27T00:00:00');
    const dueDate = new Date('2020-09-28T00:00:00');
    const todoContent = 'お掃除';
    const completeFlag = true;

    const requestData: EditTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
      complete_flag: completeFlag,
    };

    const url = `/todo-list/${todoListItemId}`;

    const expectedAction = [
      {
        type: TodoListActions.START_EDIT_TODO_LIST_ITEM,
        payload: {
          expiredTodoListLoading: true,
          todayTodoListLoading: true,
          monthlyTodoListLoading: true,
        },
      },
      {
        type: TodoListActions.EDIT_TODO_LIST_ITEM,
        payload: {
          todoListItem: editTodoListItemResponse,
        },
      },
    ];

    axiosMock.onPut(url).reply(200, editTodoListItemResponse);

    await editTodoListItem(todoListItemId, requestData)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete todoList if fetch succeeds.', async () => {
    const todoListItemId = 2;

    const url = `/todo-list/${todoListItemId}`;

    const expectedAction = [
      {
        type: TodoListActions.START_DELETE_TODO_LIST_ITEM,
        payload: {
          expiredTodoListLoading: true,
          todayTodoListLoading: true,
          monthlyTodoListLoading: true,
        },
      },
      {
        type: TodoListActions.DELETE_TODO_LIST_ITEM,
        payload: {
          todoListItem: {
            id: 0,
            posted_date: date,
            updated_date: date,
            implementation_date: '',
            due_date: '',
            todo_content: '',
            complete_flag: false,
          },
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: deleteTodoListItemResponse.message,
          open: true,
        },
      },
    ];

    axiosMock.onDelete(url).reply(200, deleteTodoListItemResponse);

    await deleteTodoListItem(todoListItemId)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('edit searchTodoList if fetch succeeds.', async () => {
    const todoListItemId = 1;
    const implementationDate = new Date('2020-09-25T00:00:00');
    const dueDate = new Date('2020-09-25T00:00:00');
    const todoContent = '携帯支払い';
    const completeFlag = true;

    const editRequestData: EditTodoListItemReq = {
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

    const editUrl = `/todo-list/${todoListItemId}`;
    const fetchSearchUrl = `/todo-list/search`;

    const expectedAction = [
      {
        type: TodoListActions.START_EDIT_SEARCH_TODO_LIST_ITEM,
        payload: {
          searchTodoListLoading: true,
        },
      },
      {
        type: TodoListActions.EDIT_SEARCH_TODO_LIST_ITEM,
        payload: {
          searchTodoListLoading: false,
          searchTodoList: editSearchTodoListResponse.search_todo_list,
        },
      },
    ];

    axiosMock.onPut(editUrl).reply(200, editSearchTodoListItemResponse);
    axiosMock.onGet(fetchSearchUrl).reply(200, editSearchTodoListResponse);

    // @ts-ignore
    await editSearchTodoListItem(todoListItemId, editRequestData, params)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete searchTodoList if fetch succeeds.', async () => {
    const todoListItemId = 1;
    const params = {
      date_type: 'implementation_date',
      start_date: new Date('2020-09-01T00:00:00'),
      end_date: new Date('2020-09-30T00:00:00'),
      sort: 'implementation_date',
      sort_type: 'desc',
    };

    const deleteUrl = `/todo-list/${todoListItemId}`;
    const fetchSearchUrl = `/todo-list/search`;

    const expectedAction = [
      {
        type: TodoListActions.START_DELETE_SEARCH_TODO_LIST_ITEM,
        payload: {
          searchTodoListLoading: true,
        },
      },
      {
        type: TodoListActions.DELETE_SEARCH_TODO_LIST_ITEM,
        payload: {
          searchTodoListLoading: false,
          searchTodoList: deleteSearchTodoListResponse.search_todo_list,
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: deleteTodoListItemResponse.message,
          open: true,
        },
      },
    ];

    axiosMock.onDelete(deleteUrl).reply(200, deleteTodoListItemResponse);
    axiosMock.onGet(fetchSearchUrl).reply(200, deleteSearchTodoListResponse);

    // @ts-ignore
    await deleteSearchTodoListItem(todoListItemId, params)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
