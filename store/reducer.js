import { LOG_IN_OUT } from "./actionTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case LOG_IN_OUT:
      console.log("action log in/out");
      return {
        ...state,
        isLogin: action.payload,
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
