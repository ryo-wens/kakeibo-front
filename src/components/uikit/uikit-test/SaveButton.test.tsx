import React from 'react';
import { mount } from 'enzyme';
import SaveButton from '../SaveButton';
import '../../../setupTests';

describe('Testing GenericButton', () => {
  test('Test that the onClick function is not executed when disabled', () => {
    const onClickMock = jest.fn();
    const wrapper = mount(<SaveButton disabled={true} label={'保存する'} onClick={onClickMock} />);

    wrapper.find('button').simulate('click');
    expect(onClickMock).not.toHaveBeenCalled();
  });

  test('Test that the onClick function is executed when enabled', () => {
    const onClickMock = jest.fn().mockImplementation((message: string) => {
      return message;
    });

    const wrapper = mount(
      <SaveButton
        disabled={false}
        label={'保存する'}
        onClick={() => onClickMock('click success')}
      />
    );

    wrapper.find('button').simulate('click');
    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith('click success');
  });

  test('Test that the labels received by props are displayed', () => {
    const onClickMock = jest.fn();
    const wrapper = mount(<SaveButton disabled={false} label={'保存する'} onClick={onClickMock} />);

    wrapper.find('button').simulate('click');
    expect(wrapper.text()).toEqual('保存する');
  });
});
