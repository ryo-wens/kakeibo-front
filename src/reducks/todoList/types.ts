export interface TodoListItem {
  id: number;
  posted_date: Date | null;
  updated_date: Date | null;
  implementation_date: string;
  due_date: string;
  todo_content: string;
  complete_flag: boolean;
}

export interface TodoList extends Array<TodoListItem> {}

export interface createTodoListItemReq {
  implementation_date: Date | null;
  due_date: Date | null;
  todo_content: string;
}

export interface createTodoListItemRes {
  id: number;
  posted_date: Date | null;
  updated_date: Date | null;
  implementation_date: string;
  due_date: string;
  todo_content: string;
  complete_flag: boolean;
}

export interface editTodoListItemReq {
  implementation_date: Date | null;
  due_date: Date | null;
  todo_content: string;
  complete_flag: boolean;
}

export interface editTodoListItemRes {
  id: number;
  posted_date: Date | null;
  updated_date: Date | null;
  implementation_date: string;
  due_date: string;
  todo_content: string;
  complete_flag: boolean;
}

export interface fetchTodayTodoListsRes {
  implementation_todo_list: TodoList;
  due_todo_list: TodoList;
  message: string;
}

export interface fetchMonthTodoListsRes {
  implementation_todo_list: TodoList;
  due_todo_list: TodoList;
  message: string;
}

export interface fetchExpiredTodoListRes {
  expired_todo_list: TodoList;
}

export interface deleteTodoListItemRes {
  message: string;
}
