import { Categories } from '../categories/types';
import { Groups } from '../groups/types';

export interface State {
  categories: {
    incomeList: Categories;
    expenseList: Categories;
  };
  transactions: {
    transaction_type:string,
    transaction_date:Date,
    shop?:string,
    memo?:string,
    amount:number,
    big_category_id:number,
    medium_category_id?:number,
    custom_category_id?:number
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
