import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as TodoListsActions from '../../src/reducks/todoLists/actions';
import * as ModalActions from '../../src/reducks/modal/actions';
import {
  createTodoListItem,
  deleteTodoListItem,
  editTodoListItem,
  fetchDateTodoLists,
  fetchMonthTodoLists,
} from '../../src/reducks/todoLists/operations';
import createTodoListItemResponse from './createTodoListItemResponse.json';
import editTodoListItemResponse from './editTodoListItemResponse.json';
import fetchDateTodoListsResponse from './fetchDateTodoListsResponse.json';
import fetchMonthTodoListsResponse from './fetchMonthTodoListsResponse.json';
import deleteTodoListItemResponse from './deleteTodoListItemResponse.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new MockAdapter(axios);

const store = mockStore({ todoLists: [], modal: [], router: [] });

const getState = () => {
  return {
    todoLists: {
      implementationTodoLists: [
        {
          id: 1,
          posted_date: '2020-09-27T19:54:46Z',
          implementation_date: '09/27(日)',
          due_date: '09/28(月)',
          todo_content: '食器用洗剤2つ購入',
          complete_flag: false,
        },
      ],
      dueTodoLists: [
        {
          id: 1,
          posted_date: '2020-09-27T19:54:46Z',
          implementation_date: '09/27(日)',
          due_date: '09/28(月)',
          todo_content: '食器用洗剤2つ購入',
          complete_flag: false,
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
        pathname: '/todo',
        search: '',
        state: undefined,
      },
    },
  };
};

describe('async actions todoLists', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Created todoListItem is added to implementationTodoLists and dueTodoLists when CREATE_TODO_LIST_ITEM succeeds.', async () => {
    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list`;
    const todoContent = '買い物へゆく';
    const implementationDate = new Date('2020-09-27T21:11:54');
    const dueDate = new Date('2020-09-29T21:11:54');

    const mockResponse = JSON.stringify(createTodoListItemResponse);

    const expectedAction = [
      {
        type: TodoListsActions.CREATE_TODO_LIST_ITEM,
        payload: {
          implementationTodoLists: [
            {
              id: 1,
              posted_date: '2020-09-27T19:54:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
            },
            {
              id: 2,
              posted_date: '2020-09-27T19:55:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/29(火)',
              todo_content: '買い物へゆく',
              complete_flag: false,
            },
          ],
          dueTodoLists: [
            {
              id: 1,
              posted_date: '2020-09-27T19:54:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
            },
            {
              id: 2,
              posted_date: '2020-09-27T19:55:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/29(火)',
              todo_content: '買い物へゆく',
              complete_flag: false,
            },
          ],
        },
      },
    ];

    axiosMock.onPost(url).reply(200, mockResponse);

    // @ts-ignore
    await createTodoListItem(implementationDate, dueDate, todoContent)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Updated todoListItem will be reflected in implementationTodoLists and dueTodoLists if EDIT_TODO_LIST_ITEM is successful.', async () => {
    const todoListItemId = 1;
    const implementationDate = new Date('2020-09-27T21:11:54');
    const dueDate = new Date('2020-09-28T21:11:54');
    const todoContent = '食器用洗剤2つ購入';
    const completeFlag = true;

    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${todoListItemId}`;

    const mockResponse = JSON.stringify(editTodoListItemResponse);

    const expectedAction = [
      {
        type: TodoListsActions.EDIT_TODO_LIST_ITEM,
        payload: {
          implementationTodoLists: [
            {
              id: 1,
              posted_date: '2020-09-27T19:54:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: true,
            },
          ],
          dueTodoLists: [
            {
              id: 1,
              posted_date: '2020-09-27T19:54:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: true,
            },
          ],
        },
      },
    ];

    axiosMock.onPut(url).reply(200, mockResponse);

    await editTodoListItem(
      todoListItemId,
      implementationDate,
      dueDate,
      todoContent,
      completeFlag
    )(
      store.dispatch,
      // @ts-ignore
      getState
    );
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Get implementationTodoLists and dueTodoLists when FETCH_DATE_TODO_LISTS succeeds.', async () => {
    const year = '2020';
    const month = '09';
    const date = '27';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}-${date}`;

    const mockResponse = JSON.stringify(fetchDateTodoListsResponse);

    const expectedAction = [
      {
        type: TodoListsActions.FETCH_DATE_TODO_LISTS,
        payload: {
          implementationTodoLists: [
            {
              id: 1,
              posted_date: '2020-09-27T19:54:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
            },
            {
              id: 2,
              posted_date: '2020-09-27T19:54:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/27(日)',
              todo_content: '買い物へ行く',
              complete_flag: false,
            },
          ],
          dueTodoLists: [
            {
              id: 2,
              posted_date: '2020-09-27T19:54:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/27(日)',
              todo_content: '買い物へ行く',
              complete_flag: false,
            },
          ],
          message: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchDateTodoLists(year, month, date)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Get implementationTodoLists and dueTodoLists when FETCH_MONTH_TODO_LISTS succeeds.', async () => {
    const year = '2020';
    const month = '09';
    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${year}-${month}`;

    const mockResponse = JSON.stringify(fetchMonthTodoListsResponse);

    const expectedAction = [
      {
        type: TodoListsActions.FETCH_MONTH_TODO_LISTS,
        payload: {
          implementationTodoLists: [
            {
              id: 1,
              posted_date: '2020-09-27T19:54:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
            },
            {
              id: 2,
              posted_date: '2020-09-27T19:54:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/27(日)',
              todo_content: '買い物へ行く',
              complete_flag: false,
            },
          ],
          dueTodoLists: [
            {
              id: 1,
              posted_date: '2020-09-27T19:54:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/28(月)',
              todo_content: '食器用洗剤2つ購入',
              complete_flag: false,
            },
            {
              id: 2,
              posted_date: '2020-09-27T19:54:46Z',
              implementation_date: '09/27(日)',
              due_date: '09/27(日)',
              todo_content: '買い物へ行く',
              complete_flag: false,
            },
          ],
          message: '',
        },
      },
    ];

    axiosMock.onGet(url).reply(200, mockResponse);

    // @ts-ignore
    await fetchMonthTodoLists(year, month)(store.dispatch);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('When DELETE_TODO_LIST_ITEM is successful, send the ImplementationTodoLists and dueTodoLists except the requested todoListItemId to deleteTodoListItemAction and send the response message to openTextModalAction.', async () => {
    const todoListItemId = 1;
    const url = `${process.env.REACT_APP_TODO_API_HOST}/todo-list/${todoListItemId}`;

    const mockResponse = JSON.stringify(deleteTodoListItemResponse);

    const expectedAction = [
      {
        type: TodoListsActions.DELETE_TODO_LIST_ITEM,
        payload: {
          implementationTodoLists: [],
          dueTodoLists: [],
        },
      },
      {
        type: ModalActions.OPEN_TEXT_MODAL,
        payload: {
          message: 'todoを削除しました。',
          open: true,
        },
      },
    ];

    axiosMock.onDelete(url).reply(200, mockResponse);

    // @ts-ignore
    await deleteTodoListItem(todoListItemId)(store.dispatch, getState);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
