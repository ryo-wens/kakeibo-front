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

export interface createGroupTodoListItemReq {
  implementation_date: Date | null;
  due_date: Date | null;
  todo_content: string;
}

export interface createGroupTodoListItemRes {
  id: number;
  posted_date: Date | null;
  updated_date: Date | null;
  implementation_date: string;
  due_date: string;
  todo_content: string;
  complete_flag: boolean;
  user_id: string;
}

export interface editGroupTodoListItemReq {
  implementation_date: Date | null;
  due_date: Date | null;
  todo_content: string;
  complete_flag: boolean;
}

export interface editGroupTodoListItemRes {
  id: number;
  posted_date: Date | null;
  updated_date: Date | null;
  implementation_date: string;
  due_date: string;
  todo_content: string;
  complete_flag: boolean;
  user_id: string;
}

export interface fetchGroupDateTodoListsRes {
  implementation_todo_list: GroupTodoList;
  due_todo_list: GroupTodoList;
  message: string;
}

export interface fetchGroupMonthTodoListsRes {
  implementation_todo_list: GroupTodoList;
  due_todo_list: GroupTodoList;
  message: string;
}

export interface deleteGroupTodoListItemRes {
  message: string;
}