import React, { useEffect, useRef, useState } from 'react';
import {
  EditTodoListItemReq,
  FetchSearchTodoListReq,
  TodoListItem,
} from '../../../../reducks/todoList/types';
import { useDispatch } from 'react-redux';
import {
  deleteTodoListItem,
  editTodoListItem,
  fetchSearchTodoList,
} from '../../../../reducks/todoList/operations';
import {
  deleteGroupTodoListItem,
  editGroupTodoListItem,
  fetchGroupSearchTodoList,
} from '../../../../reducks/groupTodoList/operations';
import { dateStringToDate } from '../../../../lib/date';
import { useLocation, useParams } from 'react-router';
import TodoListItemComponent from '../../../../components/todo/modules/listItem/todoListItemComponent/TodoListItemComponent';
import dayjs from 'dayjs';

interface SearchTodoListItemComponentContainerProps {
  listItem: TodoListItem;
  currentYear: string;
  currentMonth: string;
  fetchSearchTodoListRequestData: FetchSearchTodoListReq;
  formClassName: string;
}

const SearchTodoListItemComponentContainer = (props: SearchTodoListItemComponentContainerProps) => {
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
  const groupId = Number(group_id);
  const unmountRef = useRef(false);
  const inputTodoRef = useRef<HTMLDivElement>(null);

  const [openEditTodoForm, setOpenEditTodoForm] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [implementationDate, setImplementationDate] = useState<Date | null>(
    initialState.initialImplementationDate
  );
  const [dueDate, setDueDate] = useState<Date | null>(initialState.initialDueDate);
  const [todoContent, setTodoContent] = useState<string>(initialState.initialTodoContent);

  useEffect(() => {
    return () => {
      unmountRef.current = true;
    };
  }, []);

  const disabledButton = () => {
    if (
      implementationDate !== null &&
      dueDate !== null &&
      dayjs(implementationDate).isSame(initialState.initialImplementationDate) &&
      dayjs(dueDate).isSame(initialState.initialDueDate) &&
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

  const handleChangeChecked = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const requestData: EditTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
      complete_flag: event.target.checked,
    };

    if (pathName === 'group') {
      try {
        await dispatch(editGroupTodoListItem(groupId, props.listItem.id, requestData));
        await dispatch(fetchGroupSearchTodoList(groupId, props.fetchSearchTodoListRequestData));

        setChecked(event.target.checked);
      } catch (error) {
        alert(error.response.data.error.message.toString());
      }
    } else {
      try {
        await dispatch(editTodoListItem(props.listItem.id, requestData));
        await dispatch(fetchSearchTodoList(props.fetchSearchTodoListRequestData));

        setChecked(event.target.checked);
      } catch (error) {
        alert(error.response.data.error.message.toString());
      }
    }
  };

  const handleEditTodoListItem = async () => {
    const requestData: EditTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
      complete_flag: checked,
    };

    if (pathName === 'group') {
      try {
        await dispatch(editGroupTodoListItem(groupId, props.listItem.id, requestData));
        await dispatch(fetchGroupSearchTodoList(groupId, props.fetchSearchTodoListRequestData));

        setOpenEditTodoForm(false);
      } catch (error) {
        alert(error.response.data.error.message.toString());
      }
    } else {
      try {
        await dispatch(editTodoListItem(props.listItem.id, requestData));
        await dispatch(fetchSearchTodoList(props.fetchSearchTodoListRequestData));

        setOpenEditTodoForm(false);
      } catch (error) {
        alert(error.response.data.error.message.toString());
      }
    }
  };

  const handleDeleteTodoListItem = async () => {
    if (pathName === 'group') {
      try {
        await dispatch(deleteGroupTodoListItem(groupId, props.listItem.id));

        dispatch(fetchGroupSearchTodoList(groupId, props.fetchSearchTodoListRequestData));
      } catch (error) {
        alert(error.response.data.error.message.toString());
      }
    } else {
      try {
        await dispatch(deleteTodoListItem(props.listItem.id));

        dispatch(fetchSearchTodoList(props.fetchSearchTodoListRequestData));
      } catch (error) {
        alert(error.response.data.error.message.toString());
      }
    }
  };

  return (
    <TodoListItemComponent
      openEditTodoForm={openEditTodoForm}
      implementationDate={implementationDate}
      dueDate={dueDate}
      todoContent={todoContent}
      checked={checked}
      listItemTodoContent={props.listItem.todo_content}
      handleImplementationDate={handleImplementationDate}
      handleDueDate={handleDueDate}
      handleTodoContentChange={handleTodoContentChange}
      handleChangeChecked={handleChangeChecked}
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

export default SearchTodoListItemComponentContainer;
