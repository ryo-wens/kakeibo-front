import { Categories } from '../categories/types';
import { Groups } from '../groups/types';
import { TransactionsList } from '../transactions/types';

export interface State {
  categories: {
    incomeList: Categories;
    expenseList: Categories;
  };
  transactions: {
    transactionsList: TransactionsList;
  };
  users: {
    user_id: string;
    user_name: string;
    email: string;
  };
  groups: {
    approvedGroups: Groups;
    unapprovedGroups: Groups;
  };
  modal: {
    message: string;
    open: boolean;
  };
}
