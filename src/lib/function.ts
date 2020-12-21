import { colors } from './constant';

export const bigCategoryColor = (bigCategoryName: string) => {
  if (bigCategoryName === '食費') {
    return { backgroundColor: colors[0] };
  }

  if (bigCategoryName === '日用品') {
    return { backgroundColor: colors[1] };
  }

  if (bigCategoryName === '趣味・娯楽') {
    return { backgroundColor: colors[2] };
  }

  if (bigCategoryName === '交際費') {
    return { backgroundColor: colors[3] };
  }

  if (bigCategoryName === '交通費') {
    return { backgroundColor: colors[4] };
  }

  if (bigCategoryName === '衣服・美容') {
    return { backgroundColor: colors[5] };
  }

  if (bigCategoryName === '健康・医療') {
    return { backgroundColor: colors[6] };
  }

  if (bigCategoryName === '通信費') {
    return { backgroundColor: colors[7] };
  }

  if (bigCategoryName === '教養・教育') {
    return { backgroundColor: colors[8] };
  }

  if (bigCategoryName === '住宅') {
    return { backgroundColor: colors[9] };
  }

  if (bigCategoryName === '水道・光熱費') {
    return { backgroundColor: colors[10] };
  }

  if (bigCategoryName === '自動車') {
    return { backgroundColor: colors[11] };
  }

  if (bigCategoryName === '保険') {
    return { backgroundColor: colors[12] };
  }

  if (bigCategoryName === '税金・社会保険') {
    return { backgroundColor: colors[13] };
  }

  if (bigCategoryName === '現金・カード') {
    return { backgroundColor: colors[14] };
  }

  if (bigCategoryName === 'その他') {
    return { backgroundColor: colors[15] };
  }
};
