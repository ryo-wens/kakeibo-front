import React from 'react';
import { mount } from 'enzyme';
import SelectPayer from '../SelectPayer';
import groupList from '../../../../test/groups-test/fetchGroupsResponse.json';

describe('Testing SelectPayer', () => {
  test('Test if the onChange function is not executed when SelectPayer is enabled', () => {
    const onChangeMock = jest.fn().mockImplementation((message: string) => {
      return message;
    });

    const wrapper = mount(
      <SelectPayer
        disabled={false}
        approvedGroups={groupList.approved_group_list}
        groupId={1}
        notSpecified={false}
        onChange={() => onChangeMock('古澤')}
        pathName={'group'}
        required={false}
        value={'group_name'}
      />
    );

    wrapper.find('select').simulate('change');
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith('古澤');
  });

  test('Test that SelectPayer is able to display approvedGroups received in props', () => {
    const onChangeMock = jest.fn();

    const wrapper = mount(
      <SelectPayer
        approvedGroups={groupList.approved_group_list}
        disabled={false}
        groupId={1}
        notSpecified={false}
        onChange={onChangeMock}
        pathName={'group'}
        required={false}
        value={'group_name'}
      />
    );

    expect(wrapper.text()).toEqual('古澤');
  });

  test('Test if the option of not specified is displayed when notSpecified is true', () => {
    const onChangeMock = jest.fn();

    const wrapper = mount(
      <SelectPayer
        approvedGroups={groupList.approved_group_list}
        disabled={false}
        groupId={1}
        notSpecified={true}
        onChange={onChangeMock}
        pathName={'group'}
        required={false}
        value={'group_name'}
      />
    );

    expect(wrapper.text().includes('指定しない')).toBe(true);
  });
});
