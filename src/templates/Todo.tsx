import React, { useState } from 'react';
import { Header } from '../components/header';
import TodoPage from '../components/todo/Page/TodoPage';
import '../assets/todo/todo.scss';

const Todo = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const switchPage = (value: number) => {
    setCurrentPage(value);
  };

  const currentPageButton = (value: number, label: string) => {
    if (currentPage === value) {
      return (
        <button className="todo__current-page-button" onClick={() => switchPage(value)}>
          <span>{label}</span>
        </button>
      );
    } else {
      return (
        <button className="todo__switch-page-button" onClick={() => switchPage(value)}>
          {label}
        </button>
      );
    }
  };

  return (
    <>
      <Header />
      <main className="section__container">
        <div className="todo">
          <div className="todo__switch-page">
            {currentPageButton(0, 'To Do')}
            {currentPageButton(1, '買い物リスト')}
          </div>
          {currentPage === 0 && <TodoPage />}
        </div>
      </main>
    </>
  );
};

export default Todo;
