import { GroupTaskList } from './types';
export type groupTasksActions = ReturnType<typeof addTaskUserAction>;

export const ADD_TASK_USER = 'ADD_TASK_USER';
export const addTaskUserAction = (groupTaskList: GroupTaskList) => {
  return {
    type: ADD_TASK_USER,
    payload: {
      group_tasks_list: groupTaskList,
    },
  };
};
