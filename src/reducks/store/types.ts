import { Categories } from '../categories/types';

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
    groupId: string;
    groupName: string;
  };
}
