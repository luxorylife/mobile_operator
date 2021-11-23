import { LOG_IN_OUT, SET_USER } from "./actionTypes";

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

    default:
      return state;
  }
};

// action:
// {
//   type: 'ADD_TASK',
//   payload: ??? - полезная нагрузка
// }
