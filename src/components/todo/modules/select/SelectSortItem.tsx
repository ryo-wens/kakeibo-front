import React from 'react';

interface SelectSortItemProps {
  id: string;
  value: string;
  selectChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectSortItem = (props: SelectSortItemProps) => {
  return (
    <form>
      <select
        className="selector__box"
        defaultValue="implementation_date"
        onChange={props.selectChange}
      >
        <option value={'implementation_date'}>実施日</option>
        <option value={'due_date'}>締切日</option>
        <option value={'posted_date'}>投稿日</option>
        <option value={'updated_date'}>更新日</option>
        <option value={'todo_content'}>Todo名</option>
      </select>
    </form>
  );
};
export default SelectSortItem;
