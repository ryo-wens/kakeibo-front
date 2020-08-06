import { createGroupAction } from './actions';
import { Dispatch, Action } from 'redux';
import axios from 'axios';

interface createGroupReq {
  group_name: string;
}

interface createGroupRes {
  id: string;
  group_name: string;
}

export const createGroup = (groupId: string, groupName: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const data: createGroupReq = {
      group_name: groupName,
    };

    await axios
      .post<createGroupRes>('http://127.0.0.1:8080/groups', JSON.stringify(data), {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(createGroupAction(groupId, groupName));
      });
  };
};
