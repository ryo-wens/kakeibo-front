import React, { useEffect, useRef, useState } from 'react';
import {
  EditTodoListItemReq,
  SearchTodoRequestData,
  TodoListItem,
} from '../../../../../../reducks/todoList/types';
import { useDispatch } from 'react-redux';
import {
  deleteSearchTodoListItem,
  editSearchTodoListItem,
} from '../../../../../../reducks/todoList/operations';
import {
  deleteGroupTodoListItem,
  editGroupTodoListItem,
} from '../../../../../../reducks/groupTodoList/operations';
import { dateStringToDate } from '../../../../../../lib/date';
import { date } from '../../../../../../lib/constant';
import { useLocation, useParams } from 'react-router';
import TodoListItemComponent from '../../../../../../components/todo/modules/listItem/todoListItemComponent/TodoListItemComponent';
interface SearchTodoListItemComponentContainerProps {
  listItem: TodoListItem;
  currentYear: string;
  currentMonth: string;
  inputTodoClassName: string;
  fetchSearchTodoListRequestData: SearchTodoRequestData;
}

const SearchTodoListItemComponentContainer = (props: SearchTodoListItemComponentContainerProps) => {
  const initialState = {
    initialImplementationDate: dateStringToDate(props.listItem.implementation_date),
    initialDueDate: dateStringToDate(props.listItem.due_date),
    initialTodoContent: props.listItem.todo_content,
  };

  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const { group_id } = useParams();
  const currentYearMonth = `${props.currentYear}/${props.currentMonth}`;

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

  const handleOpenEditTodoForm = () => {
    setOpenEditTodoForm(true);
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

    const requestData: EditTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
      complete_flag: event.target.checked,
    };

    if (pathName !== 'group') {
      dispatch(
        editSearchTodoListItem(props.listItem.id, requestData, props.fetchSearchTodoListRequestData)
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

  const editTodoListItemOperation = () => {
    const requestData: EditTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
      complete_flag: checked,
    };

    if (pathName === 'group') {
      dispatch(
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
      );
      setOpenEditTodoForm(false);
    }

    dispatch(
      editSearchTodoListItem(props.listItem.id, requestData, props.fetchSearchTodoListRequestData)
    );
    setOpenEditTodoForm(false);
  };

  const deleteTodoListItemOperation = () => {
    if (pathName === 'group') {
      dispatch(deleteGroupTodoListItem(Number(group_id), props.listItem.id));
    }

    dispatch(deleteSearchTodoListItem(props.listItem.id, props.fetchSearchTodoListRequestData));
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
      todoListItemOperation={() => editTodoListItemOperation()}
      deleteOperation={() => deleteTodoListItemOperation()}
      inputTodoClassName={props.inputTodoClassName}
      inputTodoRef={inputTodoRef}
    />
  );
};

export default SearchTodoListItemComponentContainer;
