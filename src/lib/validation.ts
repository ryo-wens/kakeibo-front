export const isValidBudgetFormat = (budget: number) => {
  const regex = /^([1-9]\d*|0)$/;
  return regex.test(String(budget));
};
