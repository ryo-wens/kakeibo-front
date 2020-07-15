export interface bigCategory {
  type: string;
  id: number;
  name: string;
  associated_categories_list: Array<mediumCategory>;
}

export interface mediumCategory {
  type: string;
  id: number;
  name: string;
  big_category_id: number;
}
export interface bigCategories extends Array<bigCategory> {}

export interface UserState {
  isLogedIn: boolean;
  userId: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
