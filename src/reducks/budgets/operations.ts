import {
  copyStandardBudgetsActions,
  updateCustomBudgetsActions,
  updateStandardBudgetsActions,
  updateYearlyBudgetsActions,
} from './actions';
import axios, { CancelTokenSource } from 'axios';
import { Action, Dispatch } from 'redux';
import { State } from '../store/types';
import { standardBudgetType, customBudgetType } from '../../lib/constant';
import {
  errorHandling,
  isValidBudgetFormat,
  totalStandardBudget,
  totalCustomBudgets,
} from '../../lib/validation';
import {
  BudgetsReq,
  CustomBudgetsList,
  CustomBudgetsRes,
  DeleteCustomBudgetsRes,
  fetchCustomBudgetsRes,
  fetchStandardBudgetsRes,
  StandardBudgetsList,
  StandardBudgetsListRes,
  YearlyBudgetsList,
} from './types';

export const fetchStandardBudgets = (signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const result = await axios.get<fetchStandardBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/standard-budgets`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const standardBudgetsList = result.data.standard_budgets;

      dispatch(updateStandardBudgetsActions(standardBudgetsList));
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        errorHandling(dispatch, error);
      }
    }
  };
};

export const editStandardBudgets = (budgets: BudgetsReq) => {
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    const validBudgets = budgets.every((budget) => isValidBudgetFormat(budget.budget));
    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    const data = { standard_budgets: budgets };
    try {
      const result = await axios.put<StandardBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/standard-budgets`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );
      const editStandardBudgetsList: StandardBudgetsList = result.data.standard_budgets;
      const standardBudgetsList: StandardBudgetsList = getState().budgets.standard_budgets_list;

      const nextStandardBudgetsList = standardBudgetsList.map((standardBudget) => {
        const editStandardBudget = editStandardBudgetsList.find(
          (item: { big_category_id: number }) =>
            item.big_category_id === standardBudget.big_category_id
        );
        if (editStandardBudget) {
          return editStandardBudget;
        }

        return standardBudget;
      });

      dispatch(updateStandardBudgetsActions(nextStandardBudgetsList));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const fetchYearlyBudgets = (year: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const result = await axios.get<YearlyBudgetsList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/budgets/${year}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const yearlyBudgetsList = result.data;

      dispatch(updateYearlyBudgetsActions(yearlyBudgetsList));
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        errorHandling(dispatch, error);
      }
    }
  };
};

export const fetchCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const result = await axios.get<fetchCustomBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const customBudgets = result.data.custom_budgets;

      dispatch(updateCustomBudgetsActions(customBudgets));
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        errorHandling(dispatch, error);
      }
    }
  };
};

export const addCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  customBudgets: BudgetsReq
) => {
  const data = { custom_budgets: customBudgets };
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    const validBudgets = customBudgets.every((budget) => isValidBudgetFormat(budget.budget));
    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    try {
      const result = await axios.post<CustomBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );
      const addedCustomBudgetsList: CustomBudgetsList = result.data.custom_budgets;
      const yearlyBudgetsList: YearlyBudgetsList = getState().budgets.yearly_budgets_list;
      const prevCustomBudgetTotal =
        yearlyBudgetsList.monthly_budgets[Number(selectMonth) - 1].monthly_total_budget;

      const customBudgets: number[] = addedCustomBudgetsList.map((budget) => {
        return budget.budget;
      });

      const newTotalBudget = (): number => {
        if (totalCustomBudgets(customBudgets) < prevCustomBudgetTotal) {
          return (
            yearlyBudgetsList.yearly_total_budget -
            (prevCustomBudgetTotal - totalCustomBudgets(customBudgets))
          );
        } else {
          return (
            yearlyBudgetsList.yearly_total_budget +
            (totalCustomBudgets(customBudgets) - prevCustomBudgetTotal)
          );
        }
      };

      yearlyBudgetsList.yearly_total_budget = newTotalBudget();

      yearlyBudgetsList.monthly_budgets[Number(selectMonth) - 1] = {
        month: `${selectYear}年${selectMonth}月`,
        budget_type: customBudgetType,
        monthly_total_budget: totalCustomBudgets(customBudgets),
      };

      dispatch(updateYearlyBudgetsActions(yearlyBudgetsList));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const editCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  customBudgets: BudgetsReq
) => {
  const data = { custom_budgets: customBudgets };
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    const validBudgets = customBudgets.every((budget) => isValidBudgetFormat(budget.budget));
    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    try {
      const result = await axios.put<CustomBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );
      const editedCustomBudgetsList: CustomBudgetsList = result.data.custom_budgets;
      const yearlyBudgetsList: YearlyBudgetsList = getState().budgets.yearly_budgets_list;
      const prevCustomBudgetTotal =
        yearlyBudgetsList.monthly_budgets[Number(selectMonth) - 1].monthly_total_budget;

      const budgets: number[] = editedCustomBudgetsList.map((editedBudget) => {
        return editedBudget.budget;
      });

      const newTotalBudget = (): number => {
        if (totalCustomBudgets(budgets) < prevCustomBudgetTotal) {
          return (
            yearlyBudgetsList.yearly_total_budget -
            (prevCustomBudgetTotal - totalCustomBudgets(budgets))
          );
        } else {
          return (
            yearlyBudgetsList.yearly_total_budget +
            (totalCustomBudgets(budgets) - prevCustomBudgetTotal)
          );
        }
      };

      yearlyBudgetsList.yearly_total_budget = newTotalBudget();

      yearlyBudgetsList.monthly_budgets[Number(selectMonth) - 1] = {
        month: `${selectYear}年${selectMonth}月`,
        budget_type: customBudgetType,
        monthly_total_budget: totalCustomBudgets(budgets),
      };

      dispatch(updateYearlyBudgetsActions(yearlyBudgetsList));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const copyStandardBudgets = () => {
  return (dispatch: Dispatch<Action>, getState: () => State) => {
    const standardBudgets = getState().budgets.standard_budgets_list;
    const customBudgets = getState().budgets.custom_budgets_list;

    const nextBudgets = standardBudgets.map((standardBudget) => {
      customBudgets.map((customBudget) => {
        return (customBudget.budget = standardBudget.budget);
      });
      return standardBudget;
    });

    dispatch(copyStandardBudgetsActions(nextBudgets));
  };
};

export const deleteCustomBudgets = (selectYear: string, selectMonth: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    try {
      await axios.delete<DeleteCustomBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`,
        {
          withCredentials: true,
        }
      );
      const standardBudgetsList: StandardBudgetsList = getState().budgets.standard_budgets_list;
      const yearlyBudgetsList: YearlyBudgetsList = getState().budgets.yearly_budgets_list;

      const standardBudget = standardBudgetsList.map((budget) => {
        return budget.budget;
      });

      const newTotalBudget = (): number => {
        const deleteBudget =
          yearlyBudgetsList.monthly_budgets[Number(selectMonth) - 1].monthly_total_budget;

        if (totalStandardBudget(standardBudget) > deleteBudget) {
          return (
            yearlyBudgetsList.yearly_total_budget +
            (totalStandardBudget(standardBudget) - deleteBudget)
          );
        } else {
          return (
            yearlyBudgetsList.yearly_total_budget -
            (deleteBudget - totalStandardBudget(standardBudget))
          );
        }
      };

      yearlyBudgetsList.yearly_total_budget = newTotalBudget();

      yearlyBudgetsList.monthly_budgets[Number(selectMonth) - 1] = {
        month: `${selectYear}年${selectMonth}月`,
        budget_type: standardBudgetType,
        monthly_total_budget: totalStandardBudget(standardBudget),
      };

      dispatch(updateYearlyBudgetsActions(yearlyBudgetsList));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};
