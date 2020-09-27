import { Categories } from '../categories/types';
import { Groups } from '../groups/types';
import { TransactionsList } from '../transactions/types';
import { StandardBudgetsList, FetchYearlyBudgetsList, CustomBudgetsList } from '../budgets/types';
import { TodoLists } from '../todoLists/types';

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
    yearly_budgets_list: FetchYearlyBudgetsList;
    custom_budgets_list: CustomBudgetsList;
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
  todoLists: {
    implementationTodoLists: TodoLists;
    dueTodoLists: TodoLists;
    message: string;
  };
  modal: {
    message: string;
    open: boolean;
  };
}
