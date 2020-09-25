import { Categories } from '../categories/types';
import { Groups } from '../groups/types';
import { TransactionsList } from '../transactions/types';
import { StandardBudgetsList } from '../budgets/types';

export interface State {
  categories: {
    incomeList: Categories;
    expenseList: Categories;
  };
  transactions: {
    transactionsList: TransactionsList;
  };
  budgets: {
    standard_budgets_list: StandardBudgetsList;
  };
  users: {
    user_id: string;
    user_name: string;
    email: string;
  };
  groups: {
    approvedGroups: Groups;
    unapprovedGroups: Groups;
    message: string;
  };
  modal: {
    message: string;
    open: boolean;
  };
}
