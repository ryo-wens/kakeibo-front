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
