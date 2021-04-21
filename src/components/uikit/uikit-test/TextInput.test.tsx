import React from 'react';
import { mount } from 'enzyme';
import TextInput from '../TextInput';

describe('Testing TextInput', () => {
  test('Test if onChange is not executed when TextInput is disabled', () => {
    const onChangeMock = jest.fn();

    const wrapper = mount(
      <TextInput
        disabled={true}
        fullWidth={false}
        id={'amount'}
        label={'金額'}
        onChange={onChangeMock}
        required={false}
        type={'text'}
      />
    );

    wrapper.find(TextInput).simulate('change');
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  test('Test if onChange is executed when TextInput is enabled', () => {
    const onChangeMock = jest.fn().mockImplementation((message: string) => {
      return message;
    });

    const wrapper = mount(
      <TextInput
        disabled={false}
        fullWidth={false}
        id={'amount'}
        label={'金額'}
        onChange={() => onChangeMock('1500')}
        required={false}
        type={'text'}
      />
    );

    wrapper.find('input').simulate('change');
    expect(onChangeMock).toHaveBeenCalledWith('1500');
  });
});
