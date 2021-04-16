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

export interface createGroupReq {
  group_name: string;
}

export interface createGroupRes {
  group_id: number;
  group_name: string;
}

export interface updateGroupNameReq {
  group_name: string;
}

export interface updateGroupNameRes {
  group_id: number;
  group_name: string;
}

export interface fetchGroupsRes {
  approved_group_list: Groups;
  unapproved_group_list: Groups;
  // message: string;
}

export interface inviteGroupUsersReq {
  user_id: string;
}

export interface inviteGroupUsersRes {
  group_id: number;
  user_id: string;
  user_name: string;
}

export interface inviteGroupParticipateRes {
  group_id: number;
  user_id: string;
  user_name: string;
  color_code: string;
}

export interface groupWithdrawalRes {
  message: string;
}

export interface inviteGroupRejectRes {
  message: string;
}
