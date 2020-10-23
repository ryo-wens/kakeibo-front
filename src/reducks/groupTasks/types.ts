export interface UserTasksListItem {
  id: number;
  user_id: string;
  group_id: number;
  tasks_list: TasksListForEachUser;
}

export interface TasksListItem {
  id: number;
  base_date: Date;
  cycle_type: 'every' | 'consecutive' | 'none' | null;
  cycle: number;
  task_name: string;
  group_id: number;
  group_tasks_users_id: number;
}

export interface GroupTasksListForEachUser extends Array<UserTasksListItem> {}
export interface TasksListForEachUser extends Array<TasksListItem> {}
export interface GroupTasksList extends Array<TasksListItem> {}

export interface fetchGroupTasksListEachUserRes {
  group_tasks_list_for_each_user: GroupTasksListForEachUser;
}

export interface fetchGroupTasksListRes {
  group_tasks_list: GroupTasksList;
}

export interface addTaskItemReq {
  task_name: string;
}

export interface addTaskItemRes {
  id: number;
  base_date: Date;
  cycle_type: 'every' | 'consecutive' | 'none' | null;
  cycle: number;
  task_name: string;
  group_id: number;
  group_tasks_users_id: number;
}

export interface deleteTaskItemRes {
  message: string;
}
