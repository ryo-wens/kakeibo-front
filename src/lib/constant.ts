import { AssociatedCategory } from '../reducks/categories/types';

export const standardBudgetType = 'StandardBudget';
export const customBudgetType = 'CustomBudget';
export const expenseTransactionType = 'expense';
export const incomeTransactionType = 'income';
export const customCategoryType = 'CustomCategory';
export const mediumCategoryType = 'MediumCategory';
export const date = new Date();
export const year = date.getFullYear();
export const month = date.getMonth() + 1;
export const todayDate = date.getDate();
export const todayOfWeek = date.getDay();
export const thisMonthStartDate = new Date(year, month - 1, 1).getDate();
export const thisMonthEndDate = new Date(year, month + 1, 0).getDate();
export const customMonth = ('0' + month).slice(-2);
export const currentWeekNumber = Math.floor((date.getDate() - date.getDay() + 12) / 7);
export const guidanceMessage = '「入力フォーム」から家計簿の追加を行ってください';
export const noTransactionMessage = 'この月には、まだ記録がありません。';
export const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const years = [year - 3, year - 2, year - 1, year, year + 1, year + 2, year + 3];

export const monthStatusColor = '#47a414';
export const weekStatusColor = '#ffba16';
export const dayStatusColor = '#f45e36';

export const colors = [
  '#ff6600',
  '#0088FE',
  '#029c4f',
  '#f9d423',
  '#2020f5',
  '#f573b4',
  '#00C49F',
  '#FFBEDA',
  '#a8e063',
  '#8426a6',
  '#00ced1',
  '#e9967a',
  '#5da1f5',
  '#ff416c',
  '#e8ff3d',
  '#bdc3c7',
];

export const defaultIncomeCategoryList: AssociatedCategory[] = [
  {
    category_type: 'MediumCategory',
    id: 5,
    name: 'その他収入',
    big_category_id: 1,
  },
];

export const defaultExpenseCategoryList: AssociatedCategory[] = [
  {
    category_type: 'MediumCategory',
    name: 'その他食費',
    id: 12,
    big_category_id: 2,
  },
  {
    category_type: 'MediumCategory',
    name: 'その他日用品',
    id: 18,
    big_category_id: 3,
  },
  {
    category_type: 'MediumCategory',
    name: 'その他趣味・娯楽',
    id: 28,
    big_category_id: 4,
  },
  {
    category_type: 'MediumCategory',
    name: 'その他交際費',
    id: 32,
    big_category_id: 5,
  },
  {
    category_type: 'MediumCategory',
    name: 'その他交通費',
    id: 38,
    big_category_id: 6,
  },
  {
    category_type: 'MediumCategory',
    name: 'その他衣服・美容',
    id: 45,
    big_category_id: 7,
  },
  {
    category_type: 'MediumCategory',
    name: 'その他健康・医療',
    id: 50,
    big_category_id: 8,
  },
  {
    category_type: 'MediumCategory',
    name: 'その他通信費',
    id: 58,
    big_category_id: 9,
  },
  {
    category_type: 'MediumCategory',
    name: 'その他教養・教育',
    id: 65,
    big_category_id: 10,
  },
  {
    category_type: 'MediumCategory',
    name: 'その他住宅',
    id: 69,
    big_category_id: 11,
  },
  {
    category_type: 'MediumCategory',
    name: 'その他水道・光熱費',
    id: 73,
    big_category_id: 12,
  },
  {
    category_type: 'MediumCategory',
    name: 'その他自動車',
    id: 79,
    big_category_id: 13,
  },
  {
    category_type: 'MediumCategory',
    name: 'その他保険',
    id: 85,
    big_category_id: 14,
  },
  {
    category_type: 'MediumCategory',
    name: 'その他税金・社会保険',
    id: 90,
    big_category_id: 15,
  },
  {
    category_type: 'MediumCategory',
    name: 'その他現金・カード',
    id: 95,
    big_category_id: 16,
  },
  {
    category_type: 'MediumCategory',
    name: '使途不明金',
    id: 98,
    big_category_id: 17,
  },
];
