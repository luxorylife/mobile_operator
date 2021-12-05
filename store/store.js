import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./reducer";

const initialStore = {
  isLogin: false,
  user: {},
  customer: {},
  sim: {},
  report: {},
};

export const store = createStore(reducer, initialStore, composeWithDevTools());
