export type modalAction = ReturnType<typeof openTextModalAction>;

export const OPEN_TEXT_MODAL = 'OPEN_TEXT_MODAL';
export const openTextModalAction = (message: string) => {
  return {
    type: OPEN_TEXT_MODAL,
    payload: {
      message: message,
      open: true,
    },
  };
};

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModalAction = () => {
  return {
    type: CLOSE_MODAL,
    payload: {
      message: '',
      open: false,
    },
  };
};
