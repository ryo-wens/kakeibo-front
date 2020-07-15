const initialState = {
  categories: {},
  bigCategory: {
    type: '',
    id: '',
    name: '',
    associated_categories_list: '',
  },
  mediumCategory: {
    type: '',
    id: '',
    name: '',
    big_category_id: '',
  },
  users: {
    isLogedIn: false,
    userId: '',
    userName: '',
    emailAddress: '',
    password: '',
  },
};
export default initialState;
