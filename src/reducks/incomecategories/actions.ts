export type incomeCategoriesActions = ReturnType<
  | typeof getCategoriesAction
  | typeof addCustomCategoriesAction
  | typeof editCustomCategoriesAction
  | typeof deleteCustomCategories
>;

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const getCategoriesAction = () => {
  return {
    type: GET_CATEGORIES,
    payload: null,
  };
};

export const ADD_CUSTOM_CATEGORIES = 'ADD_CUSTOM_CATEGORIES';
export const addCustomCategoriesAction = (
  name: string,
  bigCategoryId: number
) => {
  return {
    type: ADD_CUSTOM_CATEGORIES,
    payload: {
      name: name,
      bigCategoryId: bigCategoryId,
    },
  };
};
export const EDIT_CUSTOM_CATEGORIES = 'EDIT_CUSTOM_CATEGORIES';
export const editCustomCategoriesAction = (
  id: number,
  name: string,
  bigCategoryId: number
) => {
  return {
    type: EDIT_CUSTOM_CATEGORIES,
    payload: {
      id: id,
      name: name,
      bigCategoryId: bigCategoryId,
    },
  };
};
export const DELETE_CUSTOM_CATEGORIES = 'DELETE_CUSTOM_CATEGORIES';
export const deleteCustomCategories = (id: number) => {
  return {
    type: DELETE_CUSTOM_CATEGORIES,
    payload: {
      id: id,
    },
  };
};
