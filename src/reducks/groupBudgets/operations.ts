import {
  updateGroupStandardBudgetsActions,
  fetchGroupYearlyBudgetsActions,
  copyGroupStandardBudgetsActions,
  updateGroupCustomBudgetsActions,
  deleteGroupCustomBudgetsActions,
} from './actions';
import axios from 'axios';
import { Action, Dispatch } from 'redux';
import {
  GroupStandardBudgetsList,
  GroupCustomBudgetsList,
  GroupStandardBudgetsListRes,
  GroupCustomBudgetsListRes,
  GroupBudgetsReq,
  GroupYearlyBudgetsList,
  DeleteGroupCustomBudgetsRes,
} from './types';
import { errorHandling, isValidBudgetFormat } from '../../lib/validation';
import { State } from '../store/types';
import { standardBudgetType } from '../../lib/constant';

export const fetchGroupStandardBudgets = (groupId: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await axios
      .get<GroupStandardBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/standard-budgets`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const groupStandardBudgetsList = res.data.standard_budgets;
        dispatch(updateGroupStandardBudgetsActions(groupStandardBudgetsList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const editGroupStandardBudgets = (groupBudgets: GroupBudgetsReq) => {
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    const validBudgets = groupBudgets.every((groupBudget) =>
      isValidBudgetFormat(groupBudget.budget)
    );
    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    const data = { standard_budgets: groupBudgets };

    await axios
      .put<GroupStandardBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/standard-budgets`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const editedGroupStandardBudgetsList: GroupStandardBudgetsList = res.data.standard_budgets;
        const groupStandardBudgetsList: GroupStandardBudgetsList = getState().groupBudgets
          .groupStandardBudgetsList;

        const nextGroupStandardBudgetsList = groupStandardBudgetsList.map((GroupStandardBudget) => {
          const editGroupStandardBudget = editedGroupStandardBudgetsList.find(
            (item: { big_category_id: number }) =>
              item.big_category_id === GroupStandardBudget.big_category_id
          );
          if (editGroupStandardBudget) {
            return editGroupStandardBudget;
          }
          return GroupStandardBudget;
        });

        dispatch(updateGroupStandardBudgetsActions(nextGroupStandardBudgetsList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const fetchGroupYearlyBudgets = (groupId: number, year: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await axios
      .get<GroupYearlyBudgetsList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/budgets/${year}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const groupYearlyBudgetsList = res.data;
        dispatch(fetchGroupYearlyBudgetsActions(groupYearlyBudgetsList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const copyGroupStandardBudgets = () => {
  return (dispatch: Dispatch<Action>, getState: () => State) => {
    const groupStandardBudgets: GroupStandardBudgetsList = getState().groupBudgets
      .groupStandardBudgetsList;

    const groupCustomBudgets: GroupCustomBudgetsList = getState().groupBudgets
      .groupCustomBudgetsList;

    const nextGroupCustomBudgets = groupStandardBudgets.map((groupStandardBudget) => {
      groupCustomBudgets.map((groupCustomBudget) => {
        return (groupCustomBudget.budget = groupStandardBudget.budget);
      });

      return groupStandardBudget;
    });

    dispatch(copyGroupStandardBudgetsActions(nextGroupCustomBudgets));
  };
};

export const fetchGroupCustomBudgets = (selectYear: string, selectMonth: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await axios
      .get<GroupCustomBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/custom-budgets/${selectYear}-${selectMonth}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const groupCustomBudgets = res.data.custom_budgets;

        dispatch(updateGroupCustomBudgetsActions(groupCustomBudgets));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const addGroupCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  groupCustomBudgets: GroupBudgetsReq
) => {
  const data = { custom_budgets: groupCustomBudgets };
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const validBudgets = groupCustomBudgets.every((groupCustomBudget) =>
      isValidBudgetFormat(groupCustomBudget.budget)
    );

    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    await axios
      .post<GroupCustomBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const addedGroupCustomBudgetsList: GroupCustomBudgetsList = res.data.custom_budgets;

        dispatch(updateGroupCustomBudgetsActions(addedGroupCustomBudgetsList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const editGroupCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  groupCustomBudgets: GroupBudgetsReq
) => {
  const data = { custom_budgets: groupCustomBudgets };
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    const validBudgets = groupCustomBudgets.every((groupCustomBudget) =>
      isValidBudgetFormat(groupCustomBudget.budget)
    );

    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    await axios
      .put<GroupCustomBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const editedGroupCustomBudgetsList: GroupCustomBudgetsList = res.data.custom_budgets;

        const groupCustomBudgetsList: GroupCustomBudgetsList = getState().groupBudgets
          .groupCustomBudgetsList;

        const nextGroupCustomBudgetsList = groupCustomBudgetsList.map((groupCustomBudget) => {
          const editGroupCustomBudget = editedGroupCustomBudgetsList.find(
            (item: { big_category_id: number }) =>
              item.big_category_id === groupCustomBudget.big_category_id
          );
          if (editGroupCustomBudget) {
            return editGroupCustomBudget;
          }
          return groupCustomBudget;
        });

        dispatch(updateGroupCustomBudgetsActions(nextGroupCustomBudgetsList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const deleteGroupCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  groupId: number
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    await axios
      .delete<DeleteGroupCustomBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const message = res.data.message;

        const groupStandardBudgetsList: GroupStandardBudgetsList = getState().groupBudgets
          .groupStandardBudgetsList;

        const groupYearlyBudgetsList: GroupYearlyBudgetsList = getState().groupBudgets
          .groupYearlyBudgetsList;

        const groupStandardBudgets = groupStandardBudgetsList.map((groupStandardBudget) => {
          return groupStandardBudget.budget;
        });

        const totalGroupStandardBudget = () => {
          let total = 0;

          for (let i = 0, len = groupStandardBudgets.length; i < len; i++) {
            total += groupStandardBudgets[i];
          }
          return total;
        };

        const newTotalBudget = () => {
          const deleteBudget =
            groupYearlyBudgetsList.monthly_budgets[Number(selectMonth) - 1].monthly_total_budget;

          if (totalGroupStandardBudget() > deleteBudget) {
            return (
              groupYearlyBudgetsList.yearly_total_budget +
              (totalGroupStandardBudget() - deleteBudget)
            );
          } else {
            return (
              groupYearlyBudgetsList.yearly_total_budget -
              (deleteBudget - totalGroupStandardBudget())
            );
          }
        };

        groupYearlyBudgetsList.yearly_total_budget = newTotalBudget();

        groupYearlyBudgetsList.monthly_budgets[Number(selectMonth) - 1] = {
          month: `${selectYear}年${selectMonth}月`,
          budget_type: standardBudgetType,
          monthly_total_budget: totalGroupStandardBudget(),
        };

        dispatch(deleteGroupCustomBudgetsActions(groupYearlyBudgetsList));
        alert(message);
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};
