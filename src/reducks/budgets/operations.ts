import { fetchStandardBudgets } from './actions';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { push } from 'connected-react-router';

interface fetchBudgetsRes {
  standard_budgets: [];
}

export const fetchBudgets = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await axios
      .get<fetchBudgetsRes>('http://127.0.0.1:8081/standard-budgets', {
        withCredentials: true,
      })
      .then((res) => {
        const standardBudgetsList = res.data.standard_budgets;
        dispatch(fetchStandardBudgets(standardBudgetsList));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.data.error.message);
          dispatch(push('/login'));
        }

        if (error.response.status === 500) {
          alert(error.response.data.error.message);
        }
      });
  };
};
