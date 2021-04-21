import React from 'react';
import { mount } from 'enzyme';
import TextArea from '../TextArea';

describe('Testing TextArea', () => {
  test('Test if the onChange function of TextArea is executed', () => {
    const onChangeMock = jest.fn().mockImplementation((message: string) => {
      return message;
    });
    const onBlurMock = jest.fn();

    const wrapper = mount(
      <TextArea
        id={'name'}
        onBlur={onBlurMock}
        onChange={() => onChangeMock('test user')}
        placeholder={'message'}
        type={'text'}
        value={''}
      />
    );

    wrapper.find('input').simulate('change', { target: { value: 'test user' } });
    expect(onChangeMock).toHaveBeenCalledWith('test user');
  });

  test('Testing if the onBlur function is executed when a TextArea loses focus', () => {
    const onBlurMock = jest.fn().mockImplementation((message: string) => {
      return message;
    });
    const onChangeMock = jest.fn();

    const wrapper = mount(
      <TextArea
        id={'name'}
        onBlur={() => onBlurMock('入力に誤りがあります')}
        onChange={() => onChangeMock('test user')}
        placeholder={'message'}
        type={'text'}
        value={''}
      />
    );

    wrapper.find('input').simulate('blur');
    expect(onBlurMock).toHaveBeenCalledWith('入力に誤りがあります');
  });

  test('Test whether the values received by props are displayed in the TextArea placeholder', () => {
    const message = '8文字以上で入力してください';
    const eventMock = jest.fn();

    const wrapper = mount(
      <TextArea
        id={'name'}
        onBlur={eventMock}
        onChange={eventMock}
        placeholder={message}
        type={'text'}
        value={''}
      />
    );

    const placeholder = wrapper.find('input').prop('placeholder');

    expect(placeholder).toEqual('8文字以上で入力してください');
  });
});
