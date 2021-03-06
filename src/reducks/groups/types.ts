export interface Group {
  group_id: number;
  group_name: string;
  approved_users_list: ApprovedGroupUsers;
  unapproved_users_list: UnapprovedGroupUsers;
}

export interface ApprovedGroupUser {
  group_id: number;
  user_id: string;
  user_name: string;
  color_code: string;
}

export interface UnapprovedGroupUser {
  group_id: number;
  user_id: string;
  user_name: string;
}

export interface Groups extends Array<Group> {}
export interface ApprovedGroupUsers extends Array<ApprovedGroupUser> {}
export interface UnapprovedGroupUsers extends Array<UnapprovedGroupUser> {}

export interface AddGroupReq {
  group_name: string;
}

export interface AddGroupRes {
  group_id: number;
  group_name: string;
}

export interface EditGroupNameReq {
  group_name: string;
}

export interface EditGroupNameRes {
  group_id: number;
  group_name: string;
}

export interface FetchGroupsRes {
  approved_group_list: Groups;
  unapproved_group_list: Groups;
}

export interface InviteUsersToGroupReq {
  user_id: string;
}

export interface UnsubscribeGroupRes {
  message: string;
}

export interface inviteGroupRejectRes {
  message: string;
}
