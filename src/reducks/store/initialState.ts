const initialState = {
  categories: {
    incomeList: [],
    expenseList: [],
  },
  users: {
    isLogedIn: false,
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
