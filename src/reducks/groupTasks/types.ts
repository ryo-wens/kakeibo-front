export interface UserTasksListItem {
  id: number;
  user_id: string;
  group_id: number;
  tasks_list: TasksListForEachUser;
}

export interface TasksListItem {
  id: number;
  base_date: Date | null;
  cycle_type: 'every' | 'consecutive' | 'none' | null;
  cycle: number | null;
  task_name: string;
  group_id: number;
  group_tasks_users_id: number | null;
}

export interface GroupTasksListForEachUser extends Array<UserTasksListItem> {}
export interface TasksListForEachUser extends Array<TasksListItem> {}
export interface GroupTasksList extends Array<TasksListItem> {}

export interface fetchGroupTasksListEachUserRes {
  group_tasks_list_for_each_user: GroupTasksListForEachUser;
}

export interface addGroupTasksUsersReq {
  users_list: Array<string>;
}

export interface addGroupTasksUsersRes {
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
  base_date: Date | null;
  cycle_type: 'every' | 'consecutive' | 'none' | null;
  cycle: number | null;
  task_name: string;
  group_id: number;
  group_tasks_users_id: number | null;
}

export interface editTaskItemReq {
  base_date: Date | null;
  cycle_type: 'every' | 'consecutive' | 'none' | null;
  cycle: number | null;
  task_name: string;
  group_tasks_users_id: number | null;
}

export interface editTaskItemRes {
  id: number;
  base_date: Date | null;
  cycle_type: 'every' | 'consecutive' | 'none' | null;
  cycle: number | null;
  task_name: string;
  group_id: number;
  group_tasks_users_id: number | null;
}

export interface deleteTaskItemRes {
  message: string;
}
