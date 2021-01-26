import React from 'react';
import { Header } from '../components/header';
import '../assets/todo/todo.scss';
import Task from './Task';
import GroupShoppingListPage from '../components/groupShoppingList/Page/GroupShoppingListPage';
import ShoppingListPageContainer from '../containers/shoppingList/Page/ShoppingListPageContainer';
import TodoPageContainer from '../containers/todo/page/TodoPageContainer';

interface TodoProps {
  currentPage: number;
  pathName: string;
  switchPage: (value: number) => void;
  currentPageButtonStyle: (value: number) => string;
}

const Todo = (props: TodoProps) => {
  return (
    <>
      <Header />
      <main className="section__container">
        <div className="todo">
          <div className="todo__switch-page">
            <button className={props.currentPageButtonStyle(0)} onClick={() => props.switchPage(0)}>
              <span>ToDo</span>
            </button>
            {props.pathName === 'group' && (
              <button
                className={props.currentPageButtonStyle(1)}
                onClick={() => props.switchPage(1)}
              >
                <span>タスク</span>
              </button>
            )}
            <button className={props.currentPageButtonStyle(2)} onClick={() => props.switchPage(2)}>
              <span>買い物リスト</span>
            </button>
          </div>
          {props.currentPage === 0 && <TodoPageContainer />}
          {props.currentPage === 1 && <Task />}
          {props.currentPage === 2 && props.pathName === 'group' ? (
            <GroupShoppingListPage />
          ) : (
            props.currentPage === 2 && props.pathName === 'todo' && <ShoppingListPageContainer />
          )}
        </div>
      </main>
    </>
  );
};

export default Todo;
