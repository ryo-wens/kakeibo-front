import React from 'react';
import SwitchItemTabs from '../../../../../components/uikit/tabs/switchItemTabs/SwitchItemTabs';
import TodayImplementationDateTodoListContainer from '../../../../../containers/todo/modules/area/todayTodoListArea/Items/TodayImplementationDateTodoListContainer';
import TodayDueDateTodoListContainer from '../../../../../containers/todo/modules/area/todayTodoListArea/Items/TodayDueDateTodoListContainer';
import AddTodoListItemFormContainer from '../../../../../containers/todo/modules/form/AddTodoListItemFormContainer';
import styles from './TodayTodoListArea.module.scss';

interface TodayTodoListAreaProps {
  selectedYearParam: string;
  selectedMonthParam: string;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayTodoListArea = (props: TodayTodoListAreaProps) => {
  return (
    <>
      <div className={styles.addButton}>
        <AddTodoListItemFormContainer
          selectedYearParam={props.selectedYearParam}
          selectedMonthParam={props.selectedMonthParam}
        />
      </div>
      <div className={styles.switchItem}>
        <div className={styles.switchItem__width}>
          <SwitchItemTabs
            leftButtonLabel={'実施予定のToDo'}
            rightButtonLabel={'締切予定のToDo'}
            leftItem={
              <TodayImplementationDateTodoListContainer
                selectedYearParam={props.selectedYearParam}
                selectedMonthParam={props.selectedMonthParam}
                setEditing={props.setEditing}
              />
            }
            rightItem={
              <TodayDueDateTodoListContainer
                selectedYearParam={props.selectedYearParam}
                selectedMonthParam={props.selectedMonthParam}
                setEditing={props.setEditing}
              />
            }
            tabsBtnClassName={styles.childTabsBtn}
          />
        </div>
      </div>
    </>
  );
};

export default TodayTodoListArea;
