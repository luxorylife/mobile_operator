import { LOG_IN_OUT, SET_USER } from "./actionTypes";

export const logInOutAction = (data) => {
  return {
    type: LOG_IN_OUT,
    payload: data,
  };
};

export const setUser = (data) => {
  return {
    type: SET_USER,
    payload: data,
  };
};
