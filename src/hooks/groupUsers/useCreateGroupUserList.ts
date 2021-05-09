import { useSelector } from 'react-redux';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { SelectItemList } from '../../lib/types';
import { ApprovedGroupUsers } from '../../reducks/groups/types';

export const useCreateGroupUserList = () => {
  const approvedGroups = useSelector(getApprovedGroups);

  const createUsersList = (groupId: number) => {
    let users: ApprovedGroupUsers = [];
    const userItemList: SelectItemList = [];

    for (const group of approvedGroups) {
      if (groupId === group.group_id) {
        users = group.approved_users_list;
      }
    }

    users.forEach((user) => {
      const userItem = { value: '', label: '' };
      userItem.value = user.user_id;
      userItem.label = user.user_name;
      userItemList.push(userItem);
    });

    return userItemList;
  };

  return { createUsersList };
};
