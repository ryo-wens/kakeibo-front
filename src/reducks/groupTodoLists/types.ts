export interface GroupTodoListItem {
  id: number;
  posted_date: string;
  implementation_date: string;
  due_date: string;
  todo_content: string;
  complete_flag: boolean;
  user_id: number;
}

export interface GroupTodoLists extends Array<GroupTodoListItem> {}

export interface createGroupTodoListItemReq {
  implementation_date: Date | null;
  due_date: Date | null;
  todo_content: string;
}

export interface createGroupTodoListItemRes {
  id: number;
  posted_date: string;
  implementation_date: string;
  due_date: string;
  todo_content: string;
  complete_flag: boolean;
  user_id: number;
}
