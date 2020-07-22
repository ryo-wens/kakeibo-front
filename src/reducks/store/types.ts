import { Categories } from '../categories/types';

export interface State {
  categories: {
    income: Categories;
    expense: Categories;
  };
  users: {
    isLogedIn: boolean;
    userId: string;
    userName: string;
    email: string;
    password: string;
  };
}
