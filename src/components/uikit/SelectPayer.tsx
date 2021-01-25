import React from 'react';
import { ApprovedGroupUsers, Groups } from '../../reducks/groups/types';
import '../../assets/modules/selector.scss';

interface SelectPayerProps {
  value: string;
  required: boolean;
  approvedGroups: Groups;
  groupId: number;
  pathName: string;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectPayer = (props: SelectPayerProps) => {
  const paymentUsers = (): ApprovedGroupUsers => {
    let users: ApprovedGroupUsers = [];

    for (const group of props.approvedGroups) {
      if (props.groupId === group.group_id) {
        users = group.approved_users_list;
      }
    }
    return users;
  };

  return (
    <select
      className="selector__box"
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
    >
      <option value={''}>指定しない</option>
      {paymentUsers() !== undefined
        ? paymentUsers().map((paymentUser) => {
            return (
              <option key={paymentUser.user_id} value={paymentUser.user_id}>
                {paymentUser.user_name}
              </option>
            );
          })
        : null}
    </select>
  );
};
export default SelectPayer;
