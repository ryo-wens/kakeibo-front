import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import GenericButton from '../GenericButton';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing GenericButton', () => {
  it('Test that the onClick function is not executed when disabled', () => {
    const onClickMock = jest.fn();
    const wrapper = mount(
      <GenericButton disabled={true} label={'追加する'} onClick={onClickMock} />
    );

    wrapper.find('button').simulate('click');
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('Test that the onClick function is executed when enabled', () => {
    const onClickMock = jest.fn();
    const wrapper = mount(
      <GenericButton disabled={false} label={'追加する'} onClick={onClickMock} />
    );

    wrapper.find('button').simulate('click');
    expect(onClickMock).toHaveBeenCalled();
  });
});
