import React from 'react';
import * as actionTypes from '../../src/reducks/categories/actions';
import * as actions from '../../src/reducks/categories/actions';
import axios, { AxiosAdapter } from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Category } from '../../src/reducks/categories/types';
import { addCustomCategories } from '../../src/reducks/categories/operations';
import {
  updateExpenseCategoriesAction,
  updateIncomeCategoriesAction,
} from '../../src/reducks/categories/actions';
import MockAdapter from 'axios-mock-adapter';
const axiosMock = new axiosMockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
process.on('unhandledRejection', console.dir);

describe('async actions getCategories', () => {
  const store = mockStore({ categories: { incomeList: [], expenseList: [] } });
  const url = 'http://127.0.0.1:8081/categories';

  beforeEach(() => {
    store.clearActions();
  });

  it('Get categories if fetch succeeds', async () => {
    const expectedActions = [
      {
        type: actionTypes.UPDATE_INCOME_CATEGORIES,
      },
      {
        type: actionTypes.UPDATE_EXPENSE_CATEGORIES,
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

    axiosMock.onGet(url).reply(200, { mockResponse });

    await axios.get(url).then((res) => {
      const income = res.data.income_categories_list; // undefined
      const expense = res.data.expense_categories_list; // undefined
      console.log(income);
      store.dispatch(actions.updateIncomeCategoriesAction(income));
      store.dispatch(actions.updateExpenseCategoriesAction(expense));
      expect(store.getActions()).toEqual(expectedActions);
      console.log('result');
    });
  });

  it('Display an error message if the fetch fails', async () => {
    const mockResponse = {
      error: {
        message: 'このページを表示するにはログインが必要です',
      },
    };

    const expectedActions = {
      type: 'GET_CATEGORIES_FAIL',
      payload: { error: { message: 'このページを表示するにはログインが必要です' } },
    };

    axiosMock.onGet(url).reply(401, { mockResponse });

    await axios.get(url).catch((error) => {
      const errorMessage = error.data.message;
      console.log(errorMessage);
      expect(errorMessage).toEqual(expectedActions);
      console.log('result');
    });
  });
});

describe('async actions addCustomCategories', () => {
  const store = mockStore({
    categories: {
      incomeList: {
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
            ],
          },
        ],
      },
      expenseList: {
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
            ],
          },
        ],
      },
    },
  });
  const url = 'http://127.0.0.1:8081/categories/custom-categories';

  it('Add customCategory if fetch succeeds', async () => {
    const reqIncomeCategory = {
      name: '失業手当',
      big_category_id: 1,
    };

    const reqExpenseCategory = {
      name: '調味料',
      big_category_id: 2,
    };

    const mockIncomeResponse = {
      category_type: 'CustomCategory',
      id: 16,
      name: '失業手当',
      big_category_id: 1,
    };

    const mockExpenseResponse = {
      category_type: 'CustomCategory',
      id: 16,
      name: '調味料',
      big_category_id: 2,
    };

    const mockIncomeList = {
      income_categories_list: [
        {
          category_type: 'IncomeBigCategory',
          transaction_type: 'income',
          id: 1,
          name: '収入',
          associated_categories_list: [
            {
              category_type: 'CustomCategory',
              id: 16,
              name: '失業手当',
              big_category_id: 1,
            },
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
          ],
        },
      ],
    };

    const mockExpenseList = {
      expense_categories_list: [
        {
          category_type: 'ExpenseBigCategory',
          transaction_type: 'expense',
          id: 2,
          name: '食費',
          associated_categories_list: [
            {
              category_type: 'CustomCategory',
              id: 16,
              name: '調味料',
              big_category_id: 2,
            },
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
          ],
        },
      ],
    };

    const expectedPostIncomeActions = {
      type: actionTypes.UPDATE_INCOME_CATEGORIES,
      payload: mockIncomeList,
    };

    const expectedPostExpenseActions = {
      type: actionTypes.UPDATE_EXPENSE_CATEGORIES,
      payload: mockExpenseList,
    };

    axiosMock.onPost(url, reqIncomeCategory).reply(201, mockIncomeResponse);
    axiosMock.onPost(url, reqExpenseCategory).reply(201, mockExpenseResponse);

    await axios.post(url, reqIncomeCategory).then((res) => {
      const addIncomeCategory = res.data;
      const bigCategoryId = res.data.big_category_id;
      if (bigCategoryId === 1) {
        // @ts-ignore
        const incomeCategories = store.getState().categories.incomeList;
        console.log('nubm'); // この先はテスト走っていない
        const nextCategories = incomeCategories.map((incomeCategory: Category) => {
          if (incomeCategory.id === bigCategoryId) {
            const prevAssociatedCategories = incomeCategory.associated_categories_list;
            incomeCategory.associated_categories_list = [
              addIncomeCategory,
              ...prevAssociatedCategories,
            ];
          }
          return incomeCategory;
        });
        expect(store.dispatch(updateIncomeCategoriesAction(nextCategories))).toEqual(
          expectedPostIncomeActions
        );
      }
    });
    await axios.post(url, reqExpenseCategory).then((res) => {
      const addExpenseCategory = res.data;
      const bigCategoryId = res.data.big_category_id;
      console.log(addExpenseCategory);
      // @ts-ignore
      const expenseCategories = store.categories.expenseList;
      console.log(expenseCategories); // この先はconsole.log()は表示されない
      const nextCategories = expenseCategories.map((expenseCategory: Category) => {
        if (expenseCategory.id === bigCategoryId) {
          const prevAssociatedCategories = expenseCategory.associated_categories_list;
          expenseCategory.associated_categories_list = [
            addExpenseCategory,
            ...prevAssociatedCategories,
          ];
        }
        return expenseCategory;
      });

      expect(store.dispatch(updateExpenseCategoriesAction(nextCategories))).toEqual(
        expectedPostExpenseActions
      );
    });
  });
  it('Display an error message if  the string starts with a blank', async () => {
    expect.assertions(1);
    const reqIncomeCategory = {
      name: ' 失業手当',
      big_category_id: 1,
    };

    const reqExpenseCategory = {
      name: ' 調味料',
      big_category_id: 2,
    };

    const mockResponse = {
      message: '中カテゴリーの登録に失敗しました。 文字列先頭に空白がないか確認してください',
    };

    const expectedActions = {
      message: '中カテゴリーの登録に失敗しました。 文字列先頭に空白がないか確認してください',
    };

    axiosMock.onPost(url, reqIncomeCategory).reply(409, mockResponse);
    axiosMock.onPost(url, reqExpenseCategory).reply(409, mockResponse);

    await axios.post(url, reqIncomeCategory).catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      expect(errorMessage).toEqual(expectedActions.message);
    });
    await axios.post(url, reqExpenseCategory).catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      expect(errorMessage).toEqual(expectedActions.message);
    });
  });
});
