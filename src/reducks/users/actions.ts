export type userActions = ReturnType<
  typeof signUpAction | typeof logInAction | typeof logOutAction
>;

export const SIGN_UP = 'SIGN_UP';
export const signUpAction = (
  userId: string,
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  return {
    type: SIGN_UP,
    payload: {
      userId: userId,
      userName: userName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    },
  };
};

export const LOG_IN = 'LOG_IN';
export const logInAction = (email: string, password: string, isLoggedIn: boolean) => {
  return {
    type: LOG_IN,
    payload: {
      email: email,
      password: password,
      isLoggedIn: isLoggedIn
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
