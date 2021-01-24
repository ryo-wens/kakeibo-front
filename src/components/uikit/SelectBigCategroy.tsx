import React from 'react';
import '../../assets/modules/selector.scss';

interface SelectBigCategoryProps {
  category: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectBigCategory = (props: SelectBigCategoryProps) => {
  return (
    <>
      <form>
        <select className="selector__box" value={props.category} onChange={props.onChange}>
          <option value={0}>すべて</option>
          <option value={1}>収入</option>
          <option value={2}>食費</option>
          <option value={3}>日用品</option>
          <option value={4}>趣味・娯楽</option>
          <option value={5}> 交際費</option>
          <option value={6}>交通費</option>
          <option value={7}>衣服・美容</option>
          <option value={8}>健康・医療</option>
          <option value={9}>通信費</option>
          <option value={10}>教養・教育</option>
          <option value={11}> 住宅</option>
          <option value={12}>水道・光熱費</option>
          <option value={13}>自動車</option>
          <option value={14}>保険</option>
          <option value={15}>税金・社会保険</option>
          <option value={16}>現金・カード</option>
          <option value={17}>その他</option>
        </select>
      </form>
    </>
  );
};
export default SelectBigCategory;
