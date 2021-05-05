import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Todo } from '../../../templates';

const TodoContainer = () => {
  const pathName = useLocation().pathname.split('/')[1];
  const [currentPage, setCurrentPage] = useState<number>(0);

  const switchPage = (value: number) => {
    setCurrentPage(value);
  };

  return <Todo currentPage={currentPage} pathName={pathName} switchPage={switchPage} />;
};

export default TodoContainer;
