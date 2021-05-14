import React from 'react';
import TodoListItemComponent, { TodoListItemComponentProps } from './TodoListItemComponent';
import { date } from '../../../../../lib/constant';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

const mockFunc = jest.fn();
const defaultProps: TodoListItemComponentProps = {
  openEditTodoForm: false,
  implementationDate: date,
  dueDate: date,
  todoContent: '買い物',
  checked: false,
  listItemTodoContent: '買い物',
  handleImplementationDate: mockFunc,
  handleDueDate: mockFunc,
  handleTodoContentChange: mockFunc,
  handleChangeChecked: mockFunc,
  handleOpenEditTodoForm: mockFunc,
  handleCloseEditTodoForm: mockFunc,
  onClickCloseInputTodoForm: mockFunc,
  disabledButton: false,
  handleEditTodoListItem: mockFunc,
  handleDeleteTodoListItem: mockFunc,
  currentPage: 'todo',
  inputTodoRef: { current: null },
};

jest.mock('./../../../../../containers/todo/modules/form/TodoListItemFormContainer', () => {
  return function DummyTodoListItemFormContainer() {
    return <div />;
  };
});

describe('Testing TodoListItemComponent', () => {
  let props: TodoListItemComponentProps;
  beforeEach(() => (props = { ...defaultProps }));

  test('Test that the list item is rendering when openEditTodoForm is true', () => {
    const tree = renderer.create(<TodoListItemComponent {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Test that the TodoListItemFormContainer is rendering when openEditTodoForm is false', () => {
    const tree = renderer
      .create(<TodoListItemComponent {...props} openEditTodoForm={true} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Test that clicking on the edit icon hides the list item and displays the form. ', () => {
    const handleOpenEditTodoFormMock = jest.fn().mockImplementation(() => {
      return wrapper.setProps({ openEditTodoForm: true });
    });

    const wrapper = mount(
      <TodoListItemComponent {...props} handleOpenEditTodoForm={handleOpenEditTodoFormMock} />
    );

    const labelChildren = wrapper.find('label').children();

    // listItem が表示
    expect(wrapper.find('#list-item').exists()).toBeTruthy();
    expect(wrapper.exists('label')).toBeTruthy();
    expect(labelChildren.exists({ type: 'checkbox' })).toBeTruthy();
    expect(labelChildren.exists('span')).toBeTruthy();
    expect(wrapper.find({ children: '買い物' }).exists()).toBeTruthy();
    expect(wrapper.find({ children: '買い物' }).text()).toEqual('買い物');
    expect(wrapper.exists('svg')).toBeTruthy();

    // 編集フォーム が非表示
    expect(wrapper.find('#form').exists()).toBeFalsy();
    expect(wrapper.exists('div')).toBeFalsy();

    // EditIcon をクリック
    wrapper.find('svg').simulate('click');
    expect(handleOpenEditTodoFormMock).toHaveBeenCalledTimes(1);

    // listItem が非表示
    expect(wrapper.find('#list-item').exists()).toBeFalsy();
    expect(wrapper.exists('label')).toBeFalsy();
    expect(wrapper.exists({ type: 'checkbox' })).toBeFalsy();
    expect(wrapper.find('label').children().exists('span')).toBeFalsy();
    expect(wrapper.find({ children: '買い物' }).exists()).toBeFalsy();
    expect(wrapper.exists('svg')).toBeFalsy();

    // 編集フォーム が表示
    expect(wrapper.find('#form').exists()).toBeTruthy();
    expect(wrapper.exists('div')).toBeTruthy();
  });

  test('Test that the checked/unchecked when clicking a checkbox', () => {
    const handleChangeCheckedMock = jest
      .fn()
      .mockImplementation((event: React.ChangeEvent<HTMLInputElement>) => {
        return wrapper.setProps({ checked: event.target.checked });
      });

    const wrapper = mount(
      <TodoListItemComponent {...props} handleChangeChecked={handleChangeCheckedMock} />
    );

    expect(wrapper.find({ type: 'checkbox' }).prop('checked')).toBeFalsy();

    // クリック後、チェックボックスが false -> true
    wrapper.find({ type: 'checkbox' }).simulate('change', { target: { checked: true } });
    expect(handleChangeCheckedMock).toHaveBeenCalledTimes(1);
    expect(wrapper.find({ type: 'checkbox' }).prop('checked')).toBeTruthy();

    // クリック後、チェックボックスが true -> false
    wrapper.find({ type: 'checkbox' }).simulate('change', { target: { checked: false } });
    expect(handleChangeCheckedMock).toHaveBeenCalledTimes(2);
    expect(wrapper.find({ type: 'checkbox' }).prop('checked')).toBeFalsy();
  });
});
