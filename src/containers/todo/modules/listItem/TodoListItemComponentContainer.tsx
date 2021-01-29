import React, { useEffect, useRef, useState } from 'react';
import { TodoListItem } from '../../../../reducks/todoList/types';
import { useDispatch } from 'react-redux';
import { deleteTodoListItem, editTodoListItem } from '../../../../reducks/todoList/operations';
import { GroupTodoListItem } from '../../../../reducks/groupTodoList/types';
import {
  deleteGroupTodoListItem,
  editGroupTodoListItem,
} from '../../../../reducks/groupTodoList/operations';
import { dateStringToDate } from '../../../../lib/date';
import { date } from '../../../../lib/constant';
import { useLocation, useParams } from 'react-router';
import TodoListItemComponent from '../../../../components/todo/modules/listItem/todoListItemComponent/TodoListItemComponent';
interface TodoListItemComponentContainerProps {
  listItem: TodoListItem | GroupTodoListItem;
  currentYearMonth: string;
  setEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoListItemComponentContainer = (props: TodoListItemComponentContainerProps) => {
  const initialState = {
    initialImplementationDate: dateStringToDate(props.listItem.implementation_date),
    initialDueDate: dateStringToDate(props.listItem.due_date),
    initialTodoContent: props.listItem.todo_content,
  };

  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const { group_id } = useParams();
  const inputTodoRef = useRef<HTMLDivElement>(null);

  const [openEditTodoForm, setOpenEditTodoForm] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [implementationDate, setImplementationDate] = useState<Date | null>(
    initialState.initialImplementationDate
  );
  const [dueDate, setDueDate] = useState<Date | null>(initialState.initialDueDate);
  const [todoContent, setTodoContent] = useState<string>(initialState.initialTodoContent);

  const disabledButton = () => {
    if (
      implementationDate !== null &&
      dueDate !== null &&
      implementationDate.getTime() === initialState.initialImplementationDate.getTime() &&
      dueDate.getTime() === initialState.initialDueDate.getTime() &&
      todoContent === initialState.initialTodoContent
    ) {
      return true;
    } else if (todoContent === '') {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setChecked(props.listItem.complete_flag);
    setTodoContent(initialState.initialTodoContent);
  }, [props.listItem.complete_flag]);

  useEffect(() => {
    if (props.setEditing && !openEditTodoForm) {
      props.setEditing(false);
    }
  }, [openEditTodoForm]);

  const handleOpenEditTodoForm = () => {
    setOpenEditTodoForm(true);

    if (props.setEditing) {
      props.setEditing(true);
    }
  };

  const handleCloseEditTodoForm = () => {
    setOpenEditTodoForm(false);
    setImplementationDate(initialState.initialImplementationDate);
    setDueDate(initialState.initialDueDate);
    setTodoContent(initialState.initialTodoContent);
  };

  const handleTodoContentChange = (event: React.ChangeEvent<{ value: string }>) => {
    setTodoContent(event.target.value);
  };

  const inputImplementationDate = (date: Date | null) => {
    setImplementationDate(date);
    setDueDate(date);
  };

  const inputDueDate = (date: Date | null) => {
    setDueDate(date);
  };

  const onClickCloseInputTodoForm = (event: Event) => {
    if (inputTodoRef.current && !inputTodoRef.current.contains(event.target as Node)) {
      return handleCloseEditTodoForm();
    }
  };

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (pathName !== 'group') {
      dispatch(
        editTodoListItem(
          date,
          props.currentYearMonth,
          props.listItem.id,
          implementationDate,
          dueDate,
          todoContent,
          event.target.checked
        )
      );
    } else if (pathName === 'group') {
      dispatch(
        editGroupTodoListItem(
          date,
          props.currentYearMonth,
          Number(group_id),
          props.listItem.id,
          implementationDate,
          dueDate,
          todoContent,
          event.target.checked
        )
      );
    }
  };

  const currentTextStyle = (completeFlag: boolean) => {
    if (completeFlag) {
      return { opacity: 0.3 };
    }
    return { opacity: 1.0 };
  };

  return (
    <TodoListItemComponent
      openEditTodoForm={openEditTodoForm}
      implementationDate={implementationDate}
      dueDate={dueDate}
      todoContent={todoContent}
      checked={checked}
      inputImplementationDate={inputImplementationDate}
      inputDueDate={inputDueDate}
      handleTodoContentChange={handleTodoContentChange}
      handleChangeChecked={handleChangeChecked}
      listItem={props.listItem}
      handleOpenEditTodoForm={handleOpenEditTodoForm}
      handleCloseEditTodoForm={handleCloseEditTodoForm}
      onClickCloseInputTodoForm={onClickCloseInputTodoForm}
      disabledButton={disabledButton()}
      todoListItemOperation={() => {
        {
          pathName === 'group'
            ? dispatch(
                editGroupTodoListItem(
                  date,
                  props.currentYearMonth,
                  Number(group_id),
                  props.listItem.id,
                  implementationDate,
                  dueDate,
                  todoContent,
                  checked
                )
              )
            : dispatch(
                editTodoListItem(
                  date,
                  props.currentYearMonth,
                  props.listItem.id,
                  implementationDate,
                  dueDate,
                  todoContent,
                  checked
                )
              );
        }
        setOpenEditTodoForm(false);
      }}
      deleteOperation={() => {
        pathName === 'group'
          ? dispatch(deleteGroupTodoListItem(Number(group_id), props.listItem.id))
          : dispatch(deleteTodoListItem(props.listItem.id));
      }}
      inputTodoClassName={
        pathName === 'home'
          ? 'todo-list-item-component__input-todo--home-page'
          : 'todo-list-item-component__input-todo'
      }
      currentTextStyle={currentTextStyle}
      inputTodoRef={inputTodoRef}
    />
  );
};

export default TodoListItemComponentContainer;
