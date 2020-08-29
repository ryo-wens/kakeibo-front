import { Categories } from '../categories/types';
import { Groups } from '../groups/types';
import {TransactionsList} from '../transactions/types'

export interface State {
  categories: {
    incomeList: Categories;
    expenseList: Categories;
  };
  transactions: {
    transactionsList:TransactionsList
  },
  users: {
    isLoggedIn: boolean;
    userId: string;
    userName: string;
    email: string;
    password: string;
  };
  groups: {
    approvedGroups: Groups;
    unapprovedGroups: Groups;
  };
}
