import { Categories } from '../categories/types';
import { Groups } from '../groups/types';
import {Transactions} from '../transactions/types'

export interface State {
  categories: {
    incomeList: Categories;
    expenseList: Categories;
  };
  transactions: {
    transactionsList:Transactions
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
