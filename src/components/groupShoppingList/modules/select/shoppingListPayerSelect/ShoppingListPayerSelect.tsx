import React from 'react';
import { Group } from '../../../../../reducks/groups/types';

interface ShoppingListPayerSelectProps {
  value: string;
  approvedGroup: Group;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const ShoppingListPayerSelect = (props: ShoppingListPayerSelectProps) => {
  return (
    <form>
      <select className="selector__box" value={props.value} onChange={props.onChange}>
        <option value="">選択なし</option>
        {props.approvedGroup.approved_users_list.map((user) => {
          return (
            <option key={user.user_id} value={user.user_id}>
              {user.user_name}
            </option>
          );
        })}
      </select>
    </form>
  );
};
export default ShoppingListPayerSelect;
