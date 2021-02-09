import React from 'react';
import HeaderContainer from '../../containers/header/HeaderContainer';
import './todo.scss';
import ShoppingListPageContainer from '../../containers/shoppingList/page/ShoppingListPageContainer';
import TodoPageContainer from '../../containers/todo/page/TodoPageContainer';
import TaskPageContainer from '../../containers/task/page/TaskPageContainer';
import GroupShoppingListPageContainer from '../../containers/groupShoppingList/page/GroupShoppingListPageContainer';

interface TodoProps {
  currentPage: number;
  pathName: string;
  switchPage: (value: number) => void;
  currentPageButtonStyle: (value: number) => string;
}

const Todo = (props: TodoProps) => {
  return (
    <>
      <HeaderContainer />
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
          {props.currentPage === 1 && <TaskPageContainer />}
          {props.currentPage === 2 && props.pathName === 'group' ? (
            <GroupShoppingListPageContainer />
          ) : (
            props.currentPage === 2 && props.pathName === 'todo' && <ShoppingListPageContainer />
          )}
        </div>
      </main>
    </>
  );
};

export default Todo;
