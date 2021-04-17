import React from 'react';
import { mount } from 'enzyme';
import GenericButton from '../GenericButton';

describe('Testing GenericButton', () => {
  test('Test that the onClick function of GenericButton is not executed when disabled', () => {
    const onClickMock = jest.fn();
    const wrapper = mount(
      <GenericButton disabled={true} label={'追加する'} onClick={onClickMock} />
    );

    wrapper.find('button').simulate('click');
    expect(onClickMock).not.toHaveBeenCalled();
  });

  test('Test that the onClick function of GenericButton is executed when enabled', () => {
    const onClickMock = jest.fn().mockImplementation((message: string) => {
      return message;
    });

    const wrapper = mount(
      <GenericButton
        disabled={false}
        label={'追加する'}
        onClick={() => onClickMock('click success')}
      />
    );

    wrapper.find('button').simulate('click');
    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith('click success');
  });

  test('Test that the labels of GenericButton received by props are displayed', () => {
    const onClickMock = jest.fn();
    const mockLabel = '追加する';

    const wrapper = mount(
      <GenericButton
        disabled={false}
        label={mockLabel}
        onClick={() => onClickMock('click success')}
      />
    );

    expect(wrapper.text()).toEqual('追加する');
  });
});
