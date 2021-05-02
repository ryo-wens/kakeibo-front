import { useDispatch } from 'react-redux';
import {
  fetchGroupTaskList,
  fetchGroupTaskListForEachUser,
} from '../../reducks/groupTasks/operations';

export const useFetchTaskToRelatedAll = () => {
  const dispatch = useDispatch();

  const fetchTaskToRelatedAll = (groupId: number) => {
    dispatch(fetchGroupTaskList(groupId));
    dispatch(fetchGroupTaskListForEachUser(groupId));
  };

  return { fetchTaskToRelatedAll };
};
