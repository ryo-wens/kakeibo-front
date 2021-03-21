import React from 'react';
import HeaderContainer from '../../containers/header/HeaderContainer';
import styles from './Todo.module.scss';
import ShoppingListPageContainer from '../../containers/shoppingList/page/ShoppingListPageContainer';
import TodoPageContainer from '../../containers/todo/page/TodoPageContainer';
import TaskPageContainer from '../../containers/task/page/TaskPageContainer';
import GroupShoppingListPageContainer from '../../containers/groupShoppingList/page/GroupShoppingListPageContainer';
import cn from 'classnames';

interface TodoProps {
  currentPage: number;
  pathName: string;
  switchPage: (value: number) => void;
}

const Todo = (props: TodoProps) => {
  const btnClassName = (value: number) => {
    return cn(
      { [styles.switchPageBtn]: props.currentPage !== value },
      { [styles.crPageBtn]: props.currentPage === value }
    );
  };

  return (
    <>
      <HeaderContainer />
      <main className="section__container">
        <div className={styles.wrapper}>
          <div className={styles.switchPage}>
            <button className={btnClassName(0)} onClick={() => props.switchPage(0)}>
              <span>ToDo</span>
            </button>
            {props.pathName === 'group' && (
              <button className={btnClassName(1)} onClick={() => props.switchPage(1)}>
                <span>タスク</span>
              </button>
            )}
            <button className={btnClassName(2)} onClick={() => props.switchPage(2)}>
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
