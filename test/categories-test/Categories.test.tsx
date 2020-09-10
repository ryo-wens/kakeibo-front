import React from 'react';
import * as actionTypes from '../../src/reducks/categories/actions';
import * as actions from '../../src/reducks/categories/actions';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

describe('async actions getCategories', () => {
  const axiosMock = new axiosMockAdapter(axios);
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore({ categories: { incomeList: [], expenseList: [] } });
  const url = 'http://127.0.0.1:8081/categories';

  it('Get categories if fetch succeeds', () => {
    const expectedActions = [
      {
        type: actionTypes.UPDATE_INCOME_CATEGORIES,
        // payload:incomeCategories
      },
      {
        type: actionTypes.UPDATE_EXPENSE_CATEGORIES,
        // payload:expenseCategories
      },
    ];

    const mockResponse = {
      income_categories_list: [
        {
          category_type: 'IncomeBigCategory',
          transaction_type: 'income',
          id: 1,
          name: '収入',
          associated_categories_list: [
            {
              category_type: 'CustomCategory',
              id: 14,
              name: '株配当金',
              big_category_id: 1,
            },
            {
              category_type: 'MediumCategory',
              id: 1,
              name: '給与',
              big_category_id: 1,
            },
            {
              category_type: 'MediumCategory',
              id: 2,
              name: '賞与',
              big_category_id: 1,
            },
            {
              category_type: 'MediumCategory',
              id: 3,
              name: '一時所得',
              big_category_id: 1,
            },
            {
              category_type: 'MediumCategory',
              id: 4,
              name: '事業所得',
              big_category_id: 1,
            },
            {
              category_type: 'MediumCategory',
              id: 5,
              name: 'その他収入',
              big_category_id: 1,
            },
          ],
        },
      ],
      expense_categories_list: [
        {
          category_type: 'ExpenseBigCategory',
          transaction_type: 'expense',
          id: 2,
          name: '食費',
          associated_categories_list: [
            {
              category_type: 'CustomCategory',
              id: 3,
              name: '米',
              big_category_id: 2,
            },
            {
              category_type: 'CustomCategory',
              id: 2,
              name: 'パン',
              big_category_id: 2,
            },
            {
              category_type: 'CustomCategory',
              id: 1,
              name: '調味料',
              big_category_id: 2,
            },
            {
              category_type: 'MediumCategory',
              id: 6,
              name: '食料品',
              big_category_id: 2,
            },
            {
              category_type: 'MediumCategory',
              id: 7,
              name: '朝食',
              big_category_id: 2,
            },
            {
              category_type: 'MediumCategory',
              id: 8,
              name: '昼食',
              big_category_id: 2,
            },
            {
              category_type: 'MediumCategory',
              id: 9,
              name: '夕食',
              big_category_id: 2,
            },
            {
              category_type: 'MediumCategory',
              id: 10,
              name: '外食',
              big_category_id: 2,
            },
            {
              category_type: 'MediumCategory',
              id: 11,
              name: 'カフェ',
              big_category_id: 2,
            },
            {
              category_type: 'MediumCategory',
              id: 12,
              name: 'その他食費',
              big_category_id: 2,
            },
          ],
        },
      ],
    };

    axiosMock.onGet(url).reply(200, mockResponse);

    axios.get(url).then((res) => {
      const income = res.data.income_categories_list;
      const expense = res.data.expense_categories_list;

      store.dispatch(actions.updateIncomeCategoriesAction(income));
      store.dispatch(actions.updateExpenseCategoriesAction(expense));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Display an error message if the fetch fails', () => {
    const errorMessage = {
      error: {
        message: 'このページを表示するにはログインが必要です',
      },
    };

    const expectedActions = {
      type: 'GET_CATEGORIES_FAIL',
      payload: { error: { message: 'このページを表示するにはログインが必要です' } },
    };

    axiosMock.onGet(url).reply(401, errorMessage);

    axios.get(url).then((error) => {
      const message = error.data.message;

      console.log(message);
      expect(message).toEqual(expectedActions);
    });
  });
});
