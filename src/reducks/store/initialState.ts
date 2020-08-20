const initialState = {
  categories: {
    incomeList: [],
    expenseList: [],
  },
  transactions: {
    transactionsList:[]
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
