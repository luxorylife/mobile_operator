import { LOG_IN_OUT, SET_USER, SET_CUSTOMER } from "./actionTypes";

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

export const setCustomer = (data) => {
  return {
    type: SET_CUSTOMER,
    payload: data,
  };
};
