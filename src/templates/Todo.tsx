import React, { useState } from 'react';
import { Header } from '../components/header';
import TodoPage from '../components/todo/Page/TodoPage';
import '../assets/todo/todo.scss';
import ShoppingListPage from '../components/shoppingList/Page/ShoppingListPage';
import Task from './Task';
import { useLocation } from 'react-router';
import GroupShoppingListPage from '../components/groupShoppingList/Page/GroupShoppingListPage';

const Todo = () => {
  const pathName = useLocation().pathname.split('/')[1];
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
            {currentPageButton(0, 'ToDo')}
            {pathName === 'group' && currentPageButton(1, 'タスク')}
            {currentPageButton(2, '買い物リスト')}
          </div>
          {currentPage === 0 && <TodoPage />}
          {currentPage === 1 && <Task />}
          {currentPage === 2 && pathName === 'group' ? (
            <GroupShoppingListPage />
          ) : (
            currentPage === 2 && pathName !== 'group' && <ShoppingListPage />
          )}
        </div>
      </main>
    </>
  );
};

export default Todo;
