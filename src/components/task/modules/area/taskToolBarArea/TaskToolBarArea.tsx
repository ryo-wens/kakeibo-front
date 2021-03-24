import React from 'react';
import { DatePicker } from '../../../../uikit';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import styles from './TaskToolBarArea.module.scss';
import { Group } from '../../../../../reducks/groups/types';
import { GroupTaskListForEachUser, TaskUsers } from '../../../../../reducks/groupTasks/types';
import EditTaskUserModalContainer from '../../../../../containers/task/page/taskToolBarArea/editTaskUserModalContainer/EditTaskUserModalContainer';

interface TaskToolBarAreaProps {
  selectedDate: Date | null;
  weekStartDate: Date;
  weekLastDate: Date;
  approvedGroup: Group;
  groupTasksListForEachUser: GroupTaskListForEachUser;
  participatingTaskUsers: TaskUsers;
  handleChangeDate: (selectDate: Date | null) => void;
  handleGetToday: () => void;
  handleGetPrevWeek: (selectDate: string) => void;
  handleGetNextWeek: (selectDate: string) => void;
}

const TaskToolBarArea = (props: TaskToolBarAreaProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.datePicker}>
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
      <div className={styles.displayWeek}>
        <button
          className={styles.prevBtn}
          onClick={() => props.handleGetPrevWeek(String(props.selectedDate))}
        >
          <ArrowLeftIcon />
        </button>
        <div className={styles.displayWeekItems}>
          <div className={styles.displayWeekItem}>
            <span className={styles.displayWeekItem__year}>
              {props.weekStartDate.getFullYear()}
            </span>
            <span className={styles.displayWeekItem__date}>
              {props.weekStartDate.getMonth() + 1}月{props.weekStartDate.getDate()}日
            </span>
          </div>
          <span className={styles.displayWeekItem__tilde}>〜</span>
          <div className={styles.displayWeekItem}>
            <span className={styles.displayWeekItem__year}>{props.weekLastDate.getFullYear()}</span>
            <span className={styles.displayWeekItem__date}>
              {props.weekLastDate.getMonth() + 1}月{props.weekLastDate.getDate()}日
            </span>
          </div>
        </div>
        <button
          className={styles.nextBtn}
          onClick={() => props.handleGetNextWeek(String(props.selectedDate))}
        >
          <ArrowRightIcon />
        </button>
      </div>
      <button className={styles.todayBtn} disabled={false} onClick={props.handleGetToday}>
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
