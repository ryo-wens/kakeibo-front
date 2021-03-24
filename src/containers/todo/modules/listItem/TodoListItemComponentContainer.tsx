import React, { useEffect, useRef, useState } from 'react';
import { EditTodoListItemReq, TodoListItem } from '../../../../reducks/todoList/types';
import { useDispatch } from 'react-redux';
import { deleteTodoListItem, editTodoListItem } from '../../../../reducks/todoList/operations';
import {
  deleteGroupTodoListItem,
  editGroupTodoListItem,
} from '../../../../reducks/groupTodoList/operations';
import { dateStringToDate } from '../../../../lib/date';
import { customDate, customMonth, year } from '../../../../lib/constant';
import { useLocation, useParams } from 'react-router';
import TodoListItemComponent from '../../../../components/todo/modules/listItem/todoListItemComponent/TodoListItemComponent';
import axios from 'axios';
import { executeAfterAsyncProcess } from '../../../../lib/function';
interface TodoListItemComponentContainerProps {
  listItem: TodoListItem;
  currentYear: string;
  currentMonth: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  formClassName?: string;
}

const TodoListItemComponentContainer = (props: TodoListItemComponentContainerProps) => {
  const initialState = {
    initialImplementationDate: dateStringToDate(props.listItem.implementation_date),
    initialDueDate: dateStringToDate(props.listItem.due_date),
    initialTodoContent: props.listItem.todo_content,
  };

  const dispatch = useDispatch();
  const pathNames = useLocation().pathname.split('/');
  const pathName = pathNames[1];
  const currentPage = pathNames.slice(-1)[0];
  const { group_id } = useParams<{ group_id: string }>();
  const signal = axios.CancelToken.source();

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
    if (!openEditTodoForm) {
      props.setEditing(false);
    }
  }, [openEditTodoForm]);

  const handleOpenEditTodoForm = () => {
    setOpenEditTodoForm(true);
    props.setEditing(true);
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

  const handleImplementationDate = (date: Date | null) => {
    setImplementationDate(date);
    setDueDate(date);
  };

  const handleDueDate = (date: Date | null) => {
    setDueDate(date);
  };

  const onClickCloseInputTodoForm = (event: Event) => {
    if (inputTodoRef.current && !inputTodoRef.current.contains(event.target as Node)) {
      return handleCloseEditTodoForm();
    }
  };

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    const signal = axios.CancelToken.source();
    const requestData: EditTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
      complete_flag: event.target.checked,
    };

    if (pathName === 'group') {
      dispatch(
        editGroupTodoListItem(
          Number(group_id),
          props.listItem.id,
          String(year),
          customMonth,
          customDate,
          props.currentYear,
          props.currentMonth,
          requestData,
          signal
        )
      );
    } else if (pathName !== 'group') {
      dispatch(
        editTodoListItem(
          props.listItem.id,
          String(year),
          customMonth,
          customDate,
          props.currentYear,
          props.currentMonth,
          requestData,
          signal
        )
      );
    }
  };

  const handleEditTodoListItem = () => {
    const requestData: EditTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
      complete_flag: checked,
    };

    if (pathName === 'group') {
      return executeAfterAsyncProcess(
        dispatch(
          editGroupTodoListItem(
            Number(group_id),
            props.listItem.id,
            String(year),
            customMonth,
            customDate,
            props.currentYear,
            props.currentMonth,
            requestData,
            signal
          )
        ),
        () => setOpenEditTodoForm(false)
      );
    }

    return executeAfterAsyncProcess(
      dispatch(
        editTodoListItem(
          props.listItem.id,
          String(year),
          customMonth,
          customDate,
          props.currentYear,
          props.currentMonth,
          requestData,
          signal
        )
      ),
      () => setOpenEditTodoForm(false)
    );
  };

  const handleDeleteTodoListItem = () => {
    if (pathName === 'group') {
      return executeAfterAsyncProcess(
        dispatch(
          deleteGroupTodoListItem(
            Number(group_id),
            props.listItem.id,
            String(year),
            customMonth,
            customDate,
            props.currentYear,
            props.currentMonth,
            signal
          )
        )
      );
    }

    return executeAfterAsyncProcess(
      dispatch(
        deleteTodoListItem(
          props.listItem.id,
          String(year),
          customMonth,
          customDate,
          props.currentYear,
          props.currentMonth,
          signal
        )
      )
    );
  };

  return (
    <TodoListItemComponent
      openEditTodoForm={openEditTodoForm}
      implementationDate={implementationDate}
      dueDate={dueDate}
      todoContent={todoContent}
      checked={checked}
      handleImplementationDate={handleImplementationDate}
      handleDueDate={handleDueDate}
      handleTodoContentChange={handleTodoContentChange}
      handleChangeChecked={handleChangeChecked}
      listItem={props.listItem}
      handleOpenEditTodoForm={handleOpenEditTodoForm}
      handleCloseEditTodoForm={handleCloseEditTodoForm}
      onClickCloseInputTodoForm={onClickCloseInputTodoForm}
      disabledButton={disabledButton()}
      handleEditTodoListItem={handleEditTodoListItem}
      handleDeleteTodoListItem={handleDeleteTodoListItem}
      currentPage={currentPage}
      formClassName={props.formClassName}
      inputTodoRef={inputTodoRef}
    />
  );
};

export default TodoListItemComponentContainer;
