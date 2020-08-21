export interface Group {
  group_id: number;
  group_name: string;
  approved_users_list: GroupUsers;
  unapproved_users_list: GroupUsers;
}

export interface GroupUser {
  group_id: number;
  user_id: number;
  user_name: string;
}

export interface Groups extends Array<Group> {}
export interface GroupUsers extends Array<GroupUser> {}
