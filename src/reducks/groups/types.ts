export interface Group {
  group_id: string;
  group_name: string;
  approved_users_list: GroupUsers;
  unapproved_users_list: GroupUsers;
}

export interface GroupUser {
  group_id: string;
  user_id: string;
  user_name: string;
}

export interface Groups extends Array<Group> {}
export interface GroupUsers extends Array<GroupUser> {}
