export interface TodoListItem {
  id: number;
  posted_date: string;
  implementation_date: string;
  due_date: string;
  todo_content: string;
  complete_flag: boolean;
}

export interface TodoLists extends Array<TodoListItem> {}

export interface createTodoListItemReq {
  implementation_date: Date | null;
  due_date: Date | null;
  todo_content: string;
}

export interface createTodoListItemRes {
  id: number;
  posted_date: string;
  implementation_date: string;
  due_date: string;
  todo_content: string;
  complete_flag: boolean;
}

export interface fetchTodayTodoListsRes {
  implementation_todo_list: TodoLists;
  due_todo_list: TodoLists;
  message: string;
}

export interface fetchMonthTodoListsRes {
  implementation_todo_list: TodoLists;
  due_todo_list: TodoLists;
  message: string;
}
