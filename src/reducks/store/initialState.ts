const initialState = {
  categories: {
    incomeList: [],
    expenseList: [],
  },
  transactions: {
    transaction_type:'',
    transaction_date:'',
    shop:'',
    memo:'',
    amount:'',
    big_category_id:'',
    medium_category_id:'',
    custom_category_id:'',
  },
  users: {
    isLoggedIn: false,
    userId: '',
    userName: '',
    email: '',
    password: '',
  },
  groups: {
    approvedGroups: [],
    unapprovedGroups: [],
  },
};
export default initialState;
