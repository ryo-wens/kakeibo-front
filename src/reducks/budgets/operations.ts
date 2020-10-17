import {
  copyStandardBudgetsActions,
  deleteCustomBudgetsActions,
  fetchYearlyBudgetsActions,
  updateCustomBudgetsActions,
  updateStandardBudgetsActions,
} from './actions';
import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { State } from '../store/types';
import { standardBudgetType } from '../../lib/constant';
import { errorHandling, isValidBudgetFormat } from '../../lib/validation';
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

export const fetchStandardBudgets = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await axios
      .get<fetchStandardBudgetsRes>('http://127.0.0.1:8081/standard-budgets', {
        withCredentials: true,
      })
      .then((res) => {
        const standardBudgetsList = res.data.standard_budgets;
        dispatch(updateStandardBudgetsActions(standardBudgetsList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
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
    await axios
      .put<StandardBudgetsListRes>('http://127.0.0.1:8081/standard-budgets', JSON.stringify(data), {
        withCredentials: true,
      })
      .then((res) => {
        const editStandardBudgetsList: StandardBudgetsList = res.data.standard_budgets;
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
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const fetchYearlyBudgets = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await axios
      .get<YearlyBudgetsList>('http://127.0.0.1:8081/budgets/2020', {
        withCredentials: true,
      })
      .then((res) => {
        const yearlyBudgetsList = res.data;
        dispatch(fetchYearlyBudgetsActions(yearlyBudgetsList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const fetchCustomBudgets = (selectYear: string, selectMonth: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await axios
      .get<fetchCustomBudgetsRes>(
        `http://127.0.0.1:8081/custom-budgets/${selectYear}-${selectMonth}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const customBudgets = res.data.custom_budgets;
        dispatch(updateCustomBudgetsActions(customBudgets));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const addCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  customBudgets: BudgetsReq
) => {
  const data = { custom_budgets: customBudgets };
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const validBudgets = customBudgets.every((budget) => isValidBudgetFormat(budget.budget));
    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    await axios
      .post<CustomBudgetsRes>(
        `http://127.0.0.1:8081/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const addedCustomBudgetsList: CustomBudgetsList = res.data.custom_budgets;

        const nextCustomBudgetsList = [...addedCustomBudgetsList];

        dispatch(updateCustomBudgetsActions(nextCustomBudgetsList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
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

    await axios
      .put<CustomBudgetsRes>(
        `http://127.0.0.1:8081/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const editCustomBudgetsList: CustomBudgetsList = res.data.custom_budgets;
        const customBudgetsList: CustomBudgetsList = getState().budgets.custom_budgets_list;

        const nextCustomBudgetsList = customBudgetsList.map((customBudget) => {
          const editCustomBudget = editCustomBudgetsList.find(
            (item: { big_category_id: number }) =>
              item.big_category_id === customBudget.big_category_id
          );
          if (editCustomBudget) {
            return editCustomBudget;
          }
          return customBudget;
        });
        dispatch(updateCustomBudgetsActions(nextCustomBudgetsList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
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
    await axios
      .delete<DeleteCustomBudgetsRes>(
        `http://127.0.0.1:8081/custom-budgets/${selectYear}-${selectMonth}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const message = res.data.message;
        const standardBudgetsList: StandardBudgetsList = getState().budgets.standard_budgets_list;
        const yearlyBudgetsList: YearlyBudgetsList = getState().budgets.yearly_budgets_list;

        const standardBudget = standardBudgetsList.map((budget) => {
          return budget.budget;
        });
        const totalStandardBudget = () => {
          let total = 0;
          for (let i = 0, len = standardBudget.length; i < len; i++) {
            total += standardBudget[i];
          }
          return total;
        };

        yearlyBudgetsList.monthly_budgets[Number(selectMonth) - 1] = {
          month: `${selectYear}年${selectMonth}月`,
          budget_type: standardBudgetType,
          monthly_total_budget: totalStandardBudget(),
        };

        dispatch(deleteCustomBudgetsActions(yearlyBudgetsList));
        alert(message);
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};
