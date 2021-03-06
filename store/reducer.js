import {
  LOG_IN_OUT,
  SET_USER,
  SET_CUSTOMER,
  SET_SIM,
  SET_REPORT,
} from "./actionTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case LOG_IN_OUT:
      console.log("action log in/out");
      return {
        ...state,
        isLogin: action.payload,
      };

    case SET_USER:
      console.log("setting user");
      return {
        ...state,
        user: action.payload,
      };

    case SET_CUSTOMER:
      console.log("setting customer");
      return {
        ...state,
        customer: action.payload,
      };

    case SET_SIM:
      console.log("setting sim");
      return {
        ...state,
        sim: action.payload,
      };

    case SET_REPORT:
      console.log("setting report");
      return {
        ...state,
        report: action.payload,
      };

    default:
      return state;
  }
};

// action:
// {
//   type: 'ADD_TASK',
//   payload: ??? - полезная нагрузка
// }
