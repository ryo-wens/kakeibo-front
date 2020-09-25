export interface TodoList {
  id: number;
  posted_date: Date;
  implementation_date: string;
  due_date: string;
  todo_content: string;
  complete_flag: boolean;
  user_id: string;
}

export interface TodoLists extends Array<TodoList> {}
