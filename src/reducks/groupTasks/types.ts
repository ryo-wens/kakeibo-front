import { ApprovedGroupUsers } from '../groups/types';

export type TaskCycleType = 'every' | 'consecutive' | 'none';

export interface UserTaskListItem {
  id: number;
  user_id: string;
  group_id: number;
  tasks_list: TaskListForEachUser;
}

export interface TaskListItem {
  id: number;
  base_date: Date | null;
  cycle_type: TaskCycleType | null;
  cycle: number | null;
  task_name: string;
  group_id: number;
  group_tasks_users_id: number | null;
}

export interface GroupTaskListForEachUser extends Array<UserTaskListItem> {}
export interface TaskListForEachUser extends Array<TaskListItem> {}
export interface GroupTaskList extends Array<TaskListItem> {}

export interface FetchGroupTaskListForEachUserRes {
  group_tasks_list_for_each_user: GroupTaskListForEachUser;
}

export interface AddGroupTaskUsersReq {
  users_list: Array<string>;
}

export interface AddGroupTaskUsersRes {
  group_tasks_list_for_each_user: GroupTaskListForEachUser;
}

export interface DeleteGroupTaskUsersReq {
  users_list: Array<string>;
}

export interface DeleteGroupTaskUsersRes {
  message: string;
}

export interface FetchGroupTaskListRes {
  group_tasks_list: GroupTaskList;
}

export interface AddTaskItemReq {
  task_name: string;
}

export interface AddTaskItemRes {
  id: number;
  base_date: Date | null;
  cycle_type: TaskCycleType | null;
  cycle: number | null;
  task_name: string;
  group_id: number;
  group_tasks_users_id: number | null;
}

export interface EditTaskItemReq {
  base_date: Date | null;
  cycle_type: TaskCycleType | null;
  cycle: number | null;
  task_name: string;
  group_tasks_users_id: number | null;
}

export interface EditTaskItemRes {
  id: number;
  base_date: Date | null;
  cycle_type: TaskCycleType | null;
  cycle: number | null;
  task_name: string;
  group_id: number;
  group_tasks_users_id: number | null;
}

export interface DeleteTaskItemRes {
  message: string;
}

export interface TaskUser {
  id: number;
  user_id: string;
  user_name: string;
  color_code: string;
}

export interface TaskUsers extends Array<TaskUser> {}

export interface ParticipatingTaskUsers {
  users: ApprovedGroupUsers;
}

export interface AssignmentTaskModalInitialState {
  initialTaskItemId: number;
  initialTaskName: string;
  initialBaseDate: Date | null;
  initialCycleType: TaskCycleType;
  initialCycle: number;
  initialUserId: number;
}
