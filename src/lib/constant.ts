export const standardBudgetType = 'StandardBudget';

const date = new Date();
export const year = date.getFullYear();
export const month = date.getMonth() + 1;
export const customMonth = ('0' + month).slice(-2);
