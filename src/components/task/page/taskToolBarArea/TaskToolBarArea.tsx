import React from 'react';
import { DatePicker } from '../../../uikit';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import './task-tool-bar-area.scss';
import { Group } from '../../../../reducks/groups/types';
import { GroupTaskListForEachUser, TaskUsers } from '../../../../reducks/groupTasks/types';
import EditTaskUserModalContainer from '../../../../containers/task/page/taskToolBarArea/editTaskUserModalContainer/EditTaskUserModalContainer';

interface TaskToolBarAreaProps {
  selectedDate: Date | null;
  weekStartDate: Date;
  weekLastDate: Date;
  approvedGroup: Group;
  groupTasksListForEachUser: GroupTaskListForEachUser;
  participatingTaskUsers: TaskUsers;
  handleChangeDate: (selectDate: Date | null) => void;
  handleGetToday: () => void;
  handleGetPrevWeek: (selectDate: Date | null) => void;
  handleGetNextWeek: (selectDate: Date | null) => void;
}

const TaskToolBarArea = (props: TaskToolBarAreaProps) => {
  return (
    <div className="task-tool-bar-area">
      <div className="task-tool-bar-area__date-picker">
        <DatePicker
          value={props.selectedDate}
          onChange={props.handleChangeDate}
          id={'date-picker-dialog'}
          label={''}
          required={false}
          disabled={false}
          minDate={new Date('1900-01-01')}
        />
      </div>
      <div className="task-tool-bar-area__display-week">
        <button
          className="task-tool-bar-area__prev-btn"
          onClick={() => props.handleGetPrevWeek(props.selectedDate)}
        >
          <ArrowLeftIcon />
        </button>
        <div className="task-tool-bar-area__display-week-items">
          <div className="task-tool-bar-area__display-week-item">
            <span className="task-tool-bar-area__display-week-item--year">
              {props.weekStartDate.getFullYear()}
            </span>
            <span className="task-tool-bar-area__display-week-item--date">
              {props.weekStartDate.getMonth() + 1}月{props.weekStartDate.getDate()}日
            </span>
          </div>
          <span className="task-tool-bar-area__display-week-item--tilde">〜</span>
          <div className="task-tool-bar-area__display-week-item">
            <span className="task-tool-bar-area__display-week-item--year">
              {props.weekLastDate.getFullYear()}
            </span>
            <span className="task-tool-bar-area__display-week-item--date">
              {props.weekLastDate.getMonth() + 1}月{props.weekLastDate.getDate()}日
            </span>
          </div>
        </div>
        <button
          className="task-tool-bar-area__next-btn"
          onClick={() => props.handleGetNextWeek(props.selectedDate)}
        >
          <ArrowRightIcon />
        </button>
      </div>
      <button
        className="task-tool-bar-area__today-btn"
        disabled={false}
        onClick={props.handleGetToday}
      >
        今日
      </button>
      <EditTaskUserModalContainer
        approvedGroup={props.approvedGroup}
        groupTasksListForEachUser={props.groupTasksListForEachUser}
        participatingTaskUsers={props.participatingTaskUsers}
      />
    </div>
  );
};

export default TaskToolBarArea;
