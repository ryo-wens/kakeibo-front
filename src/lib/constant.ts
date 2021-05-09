import { AssociatedCategory } from '../reducks/categories/types';
import dayjs from 'dayjs';

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
export const thisMonthEndDate = new Date(year, month, 0).getDate();
export const customMonth = dayjs().format('MM');
export const customDate = dayjs().format('DD');
export const currentWeekNumber = Math.floor((date.getDate() - date.getDay() + 12) / 7);
export const guidanceMessage = '「入力フォーム」から家計簿の追加を行ってください';
export const noTransactionMessage = 'この月には、まだ記録がありません。';
export const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const years = [year - 3, year - 2, year - 1, year, year + 1, year + 2, year + 3];

export const selectSearchPayerList = ['指定しない', {}];

export const selectCompleteFlagList = [
  {
    value: 'all',
    label: 'すべて',
  },
  {
    value: 'true',
    label: '実施済',
  },
  {
    value: 'false',
    label: '未実施',
  },
];

export const selectTransactionsType = [
  {
    value: 'expense',
    label: '支出',
  },
  {
    value: 'income',
    label: '収入',
  },
];

export const selectSearchTransactionType = [
  {
    value: '',
    label: 'すべて',
  },
  {
    value: 'expense',
    label: '支出',
  },
  {
    value: 'income',
    label: '収入',
  },
];

export const selectSortItemList = [
  {
    value: 'implementation_date',
    label: '実施日',
  },
  {
    value: 'due_date',
    label: '締切日',
  },
  {
    value: 'posted_date',
    label: '投稿日',
  },
  {
    value: 'updated_date',
    label: '更新日',
  },
  {
    value: 'todo_content',
    label: 'Todo名',
  },
];

export const selectDateType = [
  {
    value: 'implementation_date',
    label: '実施日',
  },
  {
    value: 'due_date',
    label: '締切日',
  },
];

export const selectLimitList = [
  {
    value: '',
    label: '全件取得',
  },
  {
    value: '10',
    label: '10件',
  },
  {
    value: '30',
    label: '30件',
  },
  {
    value: '50',
    label: '50件',
  },
  {
    value: '100',
    label: '100件',
  },
];

export const selectSortList = [
  {
    value: 'transaction_date',
    label: '取引日',
  },
  {
    value: 'updated_date',
    label: '編集日',
  },
  {
    value: 'amount',
    label: '金額',
  },
  {
    value: 'shop',
    label: '店名',
  },
  {
    value: 'memo',
    label: 'メモ',
  },
];

export const selectSortTypeList = [
  {
    value: 'desc',
    label: '降順',
  },
  {
    value: 'asc',
    label: '昇順',
  },
];

export const selectBigCategoryList = [
  {
    value: 0,
    label: 'すべて',
  },
  {
    value: 1,
    label: '収入',
  },
  {
    value: 2,
    label: '食費',
  },
  {
    value: 3,
    label: '日用品',
  },
  {
    value: 4,
    label: '趣味・娯楽',
  },
  {
    value: 5,
    label: '交際費',
  },
  {
    value: 6,
    label: '交通費',
  },
  {
    value: 7,
    label: '衣服・美容',
  },
  {
    value: 8,
    label: '健康・医療',
  },
  {
    value: 9,
    label: '通信費',
  },
  {
    value: 10,
    label: '教養・教育',
  },
  {
    value: 11,
    label: '住宅',
  },
  {
    value: 12,
    label: '水道・光熱費',
  },
  {
    value: 13,
    label: '自動車',
  },
  {
    value: 14,
    label: '保険',
  },
  {
    value: 15,
    label: '税金・社会保険',
  },
  {
    value: 16,
    label: '現金・カード',
  },
  {
    value: 17,
    label: 'その他',
  },
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
