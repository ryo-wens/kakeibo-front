import { Categories } from '../categories/types';
import { Groups } from '../groups/types';

export interface State {
  categories: {
    incomeList: Categories;
    expenseList: Categories;
  };
  users: {
    isLogedIn: boolean;
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
