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
