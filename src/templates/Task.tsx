import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../reducks/store/types';
import { getApprovedGroups } from '../reducks/groups/selectors';
import { fetchGroups } from '../reducks/groups/operations';
import { Group } from '../reducks/groups/types';
import { getPathGroupId } from '../lib/path';
import { fetchGroupTasksList, fetchGroupTasksListEachUser } from '../reducks/groupTasks/operations';
import {
  EditTaskUser,
  OperateTaskListForUser,
  SkipDate,
  TaskList,
  TaskListForUser,
  WeekTables,
} from '../components/task';
import { getGroupTasksList, getGroupTasksListForEachUser } from '../reducks/groupTasks/selectors';
import '../assets/task/task.scss';
import { TasksListItem } from '../reducks/groupTasks/types';
import { Header } from '../components/header';

const Task = () => {
  const dispatch = useDispatch();
  const groupId = getPathGroupId(window.location.pathname);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const selector = useSelector((state: State) => state);
  const approvedGroups = getApprovedGroups(selector);
  const groupTasksListForEachUser = getGroupTasksListForEachUser(selector);
  const groupTasksList = getGroupTasksList(selector);
  const groupIdx = approvedGroups.findIndex((approvedGroup) => approvedGroup.group_id === groupId);
  const approvedGroup: Group = approvedGroups[groupIdx];

  const fetchGroupTasks = () => {
    dispatch(fetchGroups());
    dispatch(fetchGroupTasksList(groupId));
    dispatch(fetchGroupTasksListEachUser(groupId));
  };

  useEffect(() => {
    fetchGroupTasks();
    const interval = setInterval(() => {
      fetchGroupTasks();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <main className="section__container">
        <div className="task">
          <div className="task__menu">
            <SkipDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <EditTaskUser
              approvedGroup={approvedGroup}
              groupTasksListForEachUser={groupTasksListForEachUser}
            />
          </div>
          <TaskList
            groupId={groupId}
            groupTasksListForEachUser={groupTasksListForEachUser}
            groupTasksList={groupTasksList}
          />
          <table className="task__table">
            <thead>
              <WeekTables selectedDate={selectedDate} />
            </thead>
            <tbody>
              {groupTasksList.map((tasksListItem: TasksListItem) => {
                if (tasksListItem.cycle_type !== null && groupTasksListForEachUser.length) {
                  return (
                    <tr className="task__list-for-user" key={tasksListItem.id}>
                      <TaskListForUser
                        groupId={groupId}
                        approvedGroups={approvedGroups}
                        selectedDate={selectedDate}
                        groupTaskList={groupTasksList}
                        groupTasksListForEachUser={groupTasksListForEachUser}
                        tasksListItem={tasksListItem}
                      />
                    </tr>
                  );
                }
              })}
            </tbody>
            <tfoot>
              <tr className="task__assign-task">
                <OperateTaskListForUser
                  approvedGroups={approvedGroups}
                  approvedGroup={approvedGroup}
                  groupId={groupId}
                  label={'追加'}
                />
              </tr>
            </tfoot>
          </table>
        </div>
      </main>
    </>
  );
};

export default Task;
