import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Todo } from '../../../templates';

const TodoContainer = () => {
  const pathName = useLocation().pathname.split('/')[1];
  const [currentPage, setCurrentPage] = useState<number>(0);

  const switchPage = (value: number) => {
    setCurrentPage(value);
  };

  const currentPageButtonStyle = (value: number) => {
    if (currentPage === value) {
      return 'todo__current-page-button';
    }
    return 'todo__switch-page-button';
  };

  return (
    <Todo
      currentPage={currentPage}
      pathName={pathName}
      switchPage={switchPage}
      currentPageButtonStyle={currentPageButtonStyle}
    />
  );
};

export default TodoContainer;
