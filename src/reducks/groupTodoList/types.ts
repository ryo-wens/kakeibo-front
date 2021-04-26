export interface GroupTodoListItem {
  id: number;
  posted_date: Date | null;
  updated_date: Date | null;
  implementation_date: string;
  due_date: string;
  todo_content: string;
  complete_flag: boolean;
  user_id: string;
}

export interface GroupTodoList extends Array<GroupTodoListItem> {}

export interface FetchGroupExpiredTodoListRes {
  expired_group_todo_list: GroupTodoList;
}

export interface FetchGroupTodayTodoListRes {
  implementation_todo_list: GroupTodoList;
  due_todo_list: GroupTodoList;
  message: string;
}

export interface FetchGroupMonthlyTodoListRes {
  implementation_todo_list: GroupTodoList;
  due_todo_list: GroupTodoList;
  message: string;
}

export interface AddGroupTodoListItemReq {
  implementation_date: Date | null;
  due_date: Date | null;
  todo_content: string;
}

export interface EditGroupTodoListItemReq {
  implementation_date: Date | null;
  due_date: Date | null;
  todo_content: string;
  complete_flag: boolean;
}

export interface DeleteGroupTodoListItemRes {
  message: string;
}

export interface FetchGroupSearchTodoListRes {
  search_todo_list: GroupTodoList;
  message: string;
}

export interface FetchGroupTodoListParams {
  groupId: number;
  currentYear: string;
  currentMonth: string;
  currentDate: string;
  selectedYear: string;
  selectedMonth: string;
}
