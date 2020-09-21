const initialState = {
  categories: {
    incomeList: [],
    expenseList: [],
  },
  transactions: {
    transactionsList: [],
  },
  users: {
    user_id: '',
    user_name: '',
    email: '',
  },
  groups: {
    approvedGroups: [],
    unapprovedGroups: [],
  },
  modal: {
    message: '',
    open: false,
  },
};
export default initialState;
