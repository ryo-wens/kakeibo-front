import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoListItem } from '../../../../reducks/todoList/operations';
import { addGroupTodoListItem } from '../../../../reducks/groupTodoList/operations';
import { customDate, customMonth, date, year } from '../../../../lib/constant';
import { useLocation, useParams } from 'react-router';
import AddTodoListItemForm from '../../../../components/todo/modules/form/addTodoListItemForm/AddTodoListItemForm';
import { AddTodoListItemReq } from '../../../../reducks/todoList/types';
import axios from 'axios';
import { executeAfterAsyncProcess } from '../../../../lib/function';

interface AddTodoListItemFormContainerProps {
  currentYear: string;
  currentMonth: string;
}

const initialState = {
  initialImplementationDate: date,
  initialDueDate: date,
  initialTodoContent: '',
};

const AddTodoListItemFormContainer = (props: AddTodoListItemFormContainerProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const { group_id } = useParams<{ group_id: string }>();
  const signal = axios.CancelToken.source();
  const inputTodoRef = useRef<HTMLDivElement>(null);

  const [openAddTodoForm, setOpenAddTodoForm] = useState(false);
  const [implementationDate, setImplementationDate] = useState<Date | null>(
    initialState.initialImplementationDate
  );
  const [dueDate, setDueDate] = useState<Date | null>(initialState.initialDueDate);
  const [todoContent, setTodoContent] = useState<string>(initialState.initialTodoContent);

  const handleOpenAddTodoForm = () => {
    setOpenAddTodoForm(true);
    setImplementationDate(initialState.initialImplementationDate);
    setDueDate(initialState.initialDueDate);
    setTodoContent(initialState.initialTodoContent);
  };

  const handleCloseAddTodoForm = () => {
    setOpenAddTodoForm(false);
  };

  const handleImplementationDate = (date: Date | null) => {
    setImplementationDate(date);
    setDueDate(date);
  };

  const handleDueDate = (date: Date | null) => {
    setDueDate(date);
  };

  const handleTodoContentChange = (event: React.ChangeEvent<{ value: string }>) => {
    setTodoContent(event.target.value);
  };

  const onClickCloseInputTodoForm = (event: Event) => {
    if (inputTodoRef.current && !inputTodoRef.current.contains(event.target as Node)) {
      handleCloseAddTodoForm();
    }
  };

  const disabledButton =
    implementationDate === null ||
    dueDate === null ||
    todoContent === initialState.initialTodoContent;

  const handleAddTodoListItem = () => {
    const addRequestData: AddTodoListItemReq = {
      implementation_date: implementationDate,
      due_date: dueDate,
      todo_content: todoContent,
    };

    if (pathName === 'group') {
      return executeAfterAsyncProcess(
        dispatch(
          addGroupTodoListItem(
            Number(group_id),
            String(year),
            customMonth,
            customDate,
            props.currentYear,
            props.currentMonth,
            addRequestData,
            signal
          )
        ),
        () => setOpenAddTodoForm(false)
      );
    }

    return executeAfterAsyncProcess(
      dispatch(
        addTodoListItem(
          String(year),
          customMonth,
          customDate,
          props.currentYear,
          props.currentMonth,
          addRequestData,
          signal
        )
      ),
      () => setOpenAddTodoForm(false)
    );
  };

  return (
    <AddTodoListItemForm
      implementationDate={implementationDate}
      dueDate={dueDate}
      todoContent={todoContent}
      handleImplementationDate={handleImplementationDate}
      handleDueDate={handleDueDate}
      handleTodoContentChange={handleTodoContentChange}
      openAddTodoForm={openAddTodoForm}
      handleOpenAddTodoForm={handleOpenAddTodoForm}
      handleCloseAddTodoForm={handleCloseAddTodoForm}
      disabledButton={disabledButton}
      handleAddTodoListItem={() => handleAddTodoListItem()}
      onClickCloseInputTodoForm={onClickCloseInputTodoForm}
      inputTodoRef={inputTodoRef}
      date={date}
    />
  );
};

export default AddTodoListItemFormContainer;
