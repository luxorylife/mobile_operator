import { LOG_IN_OUT } from "./actionTypes";

export const logInOutAction = (data) => {
  return {
    type: LOG_IN_OUT,
    payload: data,
  };
};
