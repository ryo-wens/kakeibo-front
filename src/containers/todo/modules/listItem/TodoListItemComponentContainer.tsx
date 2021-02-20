import React, { useEffect, useRef, useState } from 'react';
import { EditTodoListItemReq, TodoListItem } from '../../../../reducks/todoList/types';
import { useDispatch } from 'react-redux';
import { deleteTodoListItem, editTodoListItem } from '../../../../reducks/todoList/operations';
import {
  deleteGroupTodoListItem,
  editGroupTodoListItem,
} from '../../../../reducks/groupTodoList/operations';
import { dateStringToDate } from '../../../../lib/date';
import { customMonth, date, todayDate, year } from '../../../../lib/constant';
import { useLocation, useParams } from 'react-router';
import TodoListItemComponent from '../../../../components/todo/modules/listItem/todoListItemComponent/TodoListItemComponent';
import axios from 'axios';
interface TodoListItemComponentContainerProps {
  listItem: TodoListItem;
  currentYear: string;
  currentMonth: string;
  inputTodoClassName: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
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
  const currentYearMonth = `${props.currentYear}/${props.currentMonth}`;
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

    const signal = axios.CancelToken.source();
    const requestData: EditTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
      complete_flag: event.target.checked,
    };

    if (pathName !== 'group') {
      dispatch(
        editTodoListItem(
          props.listItem.id,
          String(year),
          customMonth,
          String(todayDate),
          props.currentYear,
          props.currentMonth,
          requestData,
          signal
        )
      );
    } else if (pathName === 'group') {
      dispatch(
        editGroupTodoListItem(
          date,
          currentYearMonth,
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

  const requestData: EditTodoListItemReq = {
    implementation_date: implementationDate,
    due_date: dueDate,
    todo_content: todoContent,
    complete_flag: checked,
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
                  currentYearMonth,
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
                  props.listItem.id,
                  String(year),
                  customMonth,
                  String(date.getDate()),
                  props.currentYear,
                  props.currentMonth,
                  requestData,
                  signal
                )
              );
        }
        setOpenEditTodoForm(false);
      }}
      deleteOperation={() => {
        pathName === 'group'
          ? dispatch(deleteGroupTodoListItem(Number(group_id), props.listItem.id))
          : dispatch(
              deleteTodoListItem(
                props.listItem.id,
                String(year),
                customMonth,
                String(date.getDate()),
                props.currentYear,
                props.currentMonth,
                signal
              )
            );
      }}
      inputTodoClassName={props.inputTodoClassName}
      inputTodoRef={inputTodoRef}
    />
  );
};

export default TodoListItemComponentContainer;
