import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { getPathGroupId, getPathTemplateName } from '../../lib/path';
import '../../assets/todo/switch-date-button.scss';

const SwitchDateButton = () => {
  const dispatch = useDispatch();
  const groupId = getPathGroupId(window.location.pathname);
  const entityType: string = getPathTemplateName(window.location.pathname);
  const pathNames = window.location.pathname.split('/');
  const currentPage = pathNames[pathNames.length - 1];

  const switchDateTodoList = (path: string) => {
    if (entityType !== 'group') {
      dispatch(push(path));
    } else if (entityType === 'group') {
      dispatch(push(`/group/${groupId}${path}`));
    }
  };

  const test = (page: string) => {
    if (currentPage === page) {
      return {
        color: '#fff',
        backgroundColor: '#45697E',
      };
    } else {
      return;
    }
  };

  return (
    <div className="switch-date-button">
      <button
        onClick={() => switchDateTodoList(`/todo`)}
        style={test('todo')}
        disabled={currentPage === 'todo'}
      >
        今日
      </button>
      <button
        onClick={() => switchDateTodoList(`/todo/monthly`)}
        style={test('monthly')}
        disabled={currentPage === 'monthly'}
      >
        月間予定
      </button>
    </div>
  );
};

export default SwitchDateButton;
