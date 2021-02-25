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
import addExpiredTodoListResponse from './addTodoListItemResponse/addExpiredTodoListResponse.json';
import addTodayTodoListResponse from './addTodoListItemResponse/addTodayTodoListResponse.json';
import addMonthlyTodoListResponse from './addTodoListItemResponse/addMonthlyTodoListResponse.json';
import editTodoListItemResponse from './editTodoListItemResponse/editTodoListItemResponse.json';
import editExpiredTodoListResponse from './editTodoListItemResponse/editExpiredTodoListResponse.json';
import editTodayTodoListResponse from './editTodoListItemResponse/editTodayTodoListResponse.json';
import editMonthlyTodoListResponse from './editTodoListItemResponse/editMonthlyTodoListResponse.json';
import deleteTodoListItemResponse from './deleteTodoListItemResponse/deleteTodoListItemResponse.json';
import deleteExpiredTodoListResponse from './deleteTodoListItemResponse/deleteExpiredTodoListResponse.json';
import deleteTodayTodoListResponse from './deleteTodoListItemResponse/deleteTodayTodoListResponse.json';
import deleteMonthlyTodoListResponse from './deleteTodoListItemResponse/deleteMonthlyTodoListResponse.json';
import editSearchTodoListItemResponse from './editSearchTodoListItemResponse/editSearchTodoListItemResponse.json';
import editSearchTodoListResponse from './editSearchTodoListItemResponse/editSearchTodoListResponse.json';
import deleteSearchTodoListResponse from './deleteSearchTodoListItemResponse/deleteSearchTodoListResponse.json';
import { AddTodoListItemReq, EditTodoListItemReq } from '../../src/reducks/todoList/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ todoList: [], modal: [] });

const axiosMock = new MockAdapter(axios);

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
    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/expired`;
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
    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}-${date}`;
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
    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}`;
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
    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/search`;

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
    const year = '2020';
    const month = '09';
    const date = '27';
    const currentYear = '2020';
    const currentMonth = '09';
    const signal = axios.CancelToken.source();

    const implementationDate = new Date('2020-09-28T00:00:00Z');
    const dueDate = new Date('2020-09-29T00:00:00Z');
    const todoContent = '買い物へゆく';

    const requestData: AddTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
    };

    const addUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list`;
    const fetchExpiredUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/expired`;
    const fetchTodayUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}-${date}`;
    const fetchMonthlyUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${currentYear}-${currentMonth}`;

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
          expiredTodoListLoading: false,
          expiredTodoList: addExpiredTodoListResponse.expired_todo_list,
          todayTodoListLoading: false,
          todayImplementationTodoList: addTodayTodoListResponse.implementation_todo_list,
          todayDueTodoList: addTodayTodoListResponse.due_todo_list,
          monthlyTodoListLoading: false,
          monthlyImplementationTodoList: addMonthlyTodoListResponse.implementation_todo_list,
          monthlyDueTodoList: addMonthlyTodoListResponse.due_todo_list,
        },
      },
    ];

    axiosMock.onPost(addUrl).reply(200, addTodoListItemResponse);
    axiosMock.onGet(fetchExpiredUrl).reply(200, addExpiredTodoListResponse);
    axiosMock.onGet(fetchTodayUrl).reply(200, addTodayTodoListResponse);
    axiosMock.onGet(fetchMonthlyUrl).reply(200, addMonthlyTodoListResponse);

    await addTodoListItem(
      year,
      month,
      date,
      currentYear,
      currentMonth,
      requestData,
      signal
      // @ts-ignore
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('edit todoList if fetch succeeds.', async () => {
    const todoListItemId = 2;

    const year = '2020';
    const month = '09';
    const date = '27';
    const currentYear = '2020';
    const currentMonth = '09';
    const signal = axios.CancelToken.source();

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

    const editUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${todoListItemId}`;
    const fetchExpiredUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/expired`;
    const fetchTodayUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}-${date}`;
    const fetchMonthlyUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${currentYear}-${currentMonth}`;

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
          expiredTodoListLoading: false,
          expiredTodoList: editExpiredTodoListResponse.expired_todo_list,
          todayTodoListLoading: false,
          todayImplementationTodoList: editTodayTodoListResponse.implementation_todo_list,
          todayDueTodoList: editTodayTodoListResponse.due_todo_list,
          monthlyTodoListLoading: false,
          monthlyImplementationTodoList: editMonthlyTodoListResponse.implementation_todo_list,
          monthlyDueTodoList: editMonthlyTodoListResponse.due_todo_list,
        },
      },
    ];

    axiosMock.onPut(editUrl).reply(200, editTodoListItemResponse);
    axiosMock.onGet(fetchExpiredUrl).reply(200, editExpiredTodoListResponse);
    axiosMock.onGet(fetchTodayUrl).reply(200, editTodayTodoListResponse);
    axiosMock.onGet(fetchMonthlyUrl).reply(200, editMonthlyTodoListResponse);

    await editTodoListItem(
      todoListItemId,
      year,
      month,
      date,
      currentYear,
      currentMonth,
      requestData,
      signal
    )(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('delete todoList if fetch succeeds.', async () => {
    const todoListItemId = 2;

    const year = '2020';
    const month = '09';
    const date = '27';
    const currentYear = '2020';
    const currentMonth = '09';
    const signal = axios.CancelToken.source();

    const deleteUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${todoListItemId}`;
    const fetchExpiredUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/expired`;
    const fetchTodayUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}-${date}`;
    const fetchMonthlyUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${currentYear}-${currentMonth}`;

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
          expiredTodoListLoading: false,
          expiredTodoList: deleteExpiredTodoListResponse.expired_todo_list,
          todayTodoListLoading: false,
          todayImplementationTodoList: deleteTodayTodoListResponse.implementation_todo_list,
          todayDueTodoList: deleteTodayTodoListResponse.due_todo_list,
          monthlyTodoListLoading: false,
          monthlyImplementationTodoList: deleteMonthlyTodoListResponse.implementation_todo_list,
          monthlyDueTodoList: deleteMonthlyTodoListResponse.due_todo_list,
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
    axiosMock.onGet(fetchExpiredUrl).reply(200, deleteExpiredTodoListResponse);
    axiosMock.onGet(fetchTodayUrl).reply(200, deleteTodayTodoListResponse);
    axiosMock.onGet(fetchMonthlyUrl).reply(200, deleteMonthlyTodoListResponse);

    // @ts-ignore
    await deleteTodoListItem(
      todoListItemId,
      year,
      month,
      date,
      currentYear,
      currentMonth,
      signal
    )(store.dispatch);
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

    const editUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${todoListItemId}`;
    const fetchSearchUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/search`;

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

    const deleteUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${todoListItemId}`;
    const fetchSearchUrl = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/search`;

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
