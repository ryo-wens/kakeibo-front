export interface UserTaskListItem {
  id: number;
  user_id: string;
  group_id: number;
  tasks_list: TaskList;
}

export interface TaskListItem {
  id: number;
  base_date: Date;
  cycle_type: 'every' | 'consecutive' | 'none' | null;
  cycle: number;
  task_name: string;
  group_id: number;
  group_tasks_users_id: number;
}

export interface GroupTaskList extends Array<TaskListItem> {}
export interface UserTaskList extends Array<UserTaskListItem> {}
export interface TaskList extends Array<TaskListItem> {}