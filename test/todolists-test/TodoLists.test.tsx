import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as TodoListsActions from '../../src/reducks/todoLists/actions';
import { createTodoListItem, fetchDateTodoLists } from '../../src/reducks/todoLists/operations';
import createTodoListItemResponse from './createTodoListItemResponse.json';
import fetchDateTodoListsResponse from './fetchDateTodoListsResponse.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new MockAdapter(axios);

const store = mockStore({ todoLists: [], router: [] });

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

  const implementationDate = new Date('2020-09-27T21:11:54');
  const dueDate = new Date('2020-09-29T21:11:54');

  it('Created todoListItem is added to implementationTodoLists and dueTodoLists when CREATE_TODO_LIST_ITEM succeeds.', async () => {
    const url = `http://127.0.0.1:8082/todo-list`;
    const todoContent = '買い物へゆく';

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

  it('Get implementationTodoLists and dueTodoLists when FETCH_DATE_TODO_LISTS succeeds.', async () => {
    const year = '2020';
    const month = '09';
    const date = '27';
    const url = `http://127.0.0.1:8082/todo-list/${year}-${month}-${date}`;

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
});
