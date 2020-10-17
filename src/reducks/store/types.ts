import { Categories } from '../categories/types';
import { Groups } from '../groups/types';
import { TransactionsList } from '../transactions/types';
import { StandardBudgetsList, YearlyBudgetsList, CustomBudgetsList } from '../budgets/types';
import { TodoLists } from '../todoLists/types';
import { GroupTodoLists } from '../groupTodoLists/types';
import { UserTaskList } from '../groupTasks/types';

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
    yearly_budgets_list: YearlyBudgetsList;
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
  groupTasks: {
    group_tasks_list_for_each_user: UserTaskList;
  };
  todoLists: {
    implementationTodoLists: TodoLists;
    dueTodoLists: TodoLists;
    message: string;
  };
  groupTodoLists: {
    groupImplementationTodoLists: GroupTodoLists;
    groupDueTodoLists: GroupTodoLists;
    message: string;
  };
  modal: {
    message: string;
    open: boolean;
  };
}
