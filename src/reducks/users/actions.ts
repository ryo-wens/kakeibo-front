export type userActions = ReturnType<
  typeof signUpAction | typeof logInAction | typeof logOutAction
>;

export const SIGN_UP = 'SIGN_UP';
export const signUpAction = (user_id: string, user_name: string, email: string) => {
  return {
    type: SIGN_UP,
    payload: {
      user_id: user_id,
      user_name: user_name,
      email: email,
    },
  };
};

export const LOG_IN = 'LOG_IN';
export const logInAction = (email: string) => {
  return {
    type: LOG_IN,
    payload: {
      email: email,
    },
  };
};

export const LOG_OUT = 'LOG_OUT';
export const logOutAction = () => {
  return {
    type: LOG_OUT,
    payload: null,
  };
};
