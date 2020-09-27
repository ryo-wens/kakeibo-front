export interface TodoListItem {
  id: number;
  posted_date: string;
  implementation_date: string;
  due_date: string;
  todo_content: string;
  complete_flag: boolean;
}

export interface TodoLists extends Array<TodoListItem> {}

export interface createTodoReq {
  implementation_date: Date | null;
  due_date: Date | null;
  todo_content: string;
}

export interface createTodoRes {
  id: number;
  posted_date: string;
  implementation_date: string;
  due_date: string;
  todo_content: string;
  complete_flag: boolean;
}
